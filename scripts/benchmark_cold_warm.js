const http = require('http');

const routes = [
  { name: 'Home Page', path: '/' },
  { name: 'Blog Listing (/blog)', path: '/blog' },
  { name: 'Article 1 (Enterprise Brand Guide)', path: '/blog/the-master-guide-to-enterprise-brand-identity-and-strategy' },
  { name: 'Article 2 (Brand Identity vs Strategy)', path: '/blog/brand-identity-vs-brand-strategy-differences' }
];

const BASE_URL = process.env.BENCHMARK_BASE_URL || 'http://localhost:3002';

async function fetchRoute(urlPath) {
  const fullUrl = new URL(urlPath, BASE_URL);
  const start = performance.now();
  
  return new Promise((resolve, reject) => {
    const req = http.get(fullUrl.toString(), { headers: { 'User-Agent': 'BenchmarkScript/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const end = performance.now();
        const duration = end - start;
        const sizeBytes = Buffer.byteLength(data, 'utf8');
        resolve({ duration, sizeBytes, statusCode: res.statusCode, headers: res.headers });
      });
    });
    req.on('error', (err) => reject(err));
  });
}

function calculateStats(latencies) {
  const sorted = [...latencies].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const avg = sum / sorted.length;
  
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  
  const p95Index = Math.ceil(0.95 * sorted.length) - 1;
  const p95 = sorted[Math.min(p95Index, sorted.length - 1)];

  return {
    min: min.toFixed(2),
    avg: avg.toFixed(2),
    median: median.toFixed(2),
    max: max.toFixed(2),
    p95: p95.toFixed(2)
  };
}

async function runBenchmark() {
  console.log(`\n======================================================`);
  console.log(`Running Cold vs Warm Benchmark against ${BASE_URL}`);
  console.log(`======================================================\n`);

  const results = [];

  for (const route of routes) {
    // 1. Cold Request (First Touch on Server Boot)
    const coldRes = await fetchRoute(route.path);
    const coldLatency = coldRes.duration.toFixed(2);
    const cacheHeader = coldRes.headers['cache-control'] || 'none';
    const nextCacheHeader = coldRes.headers['x-nextjs-cache'] || 'none';
    const htmlSizeBytes = coldRes.sizeBytes;
    const sizeKB = (htmlSizeBytes / 1024).toFixed(2);

    // 2. Warm Requests (10 subsequent Hits)
    const warmLatencies = [];
    for (let i = 1; i <= 10; i++) {
      const res = await fetchRoute(route.path);
      warmLatencies.push(res.duration);
    }
    const warmStats = calculateStats(warmLatencies);

    results.push({
      name: route.name,
      path: route.path,
      statusCode: coldRes.statusCode,
      htmlSizeBytes,
      sizeKB,
      coldLatencyMs: coldLatency + ' ms',
      warmAvgMs: warmStats.avg + ' ms',
      warmMinMs: warmStats.min + ' ms',
      warmMedianMs: warmStats.median + ' ms',
      warmMaxMs: warmStats.max + ' ms',
      warmP95Ms: warmStats.p95 + ' ms',
      cacheControl: cacheHeader,
      xNextjsCache: nextCacheHeader
    });
  }

  console.table(results);
}

runBenchmark().catch((err) => console.error(err));
