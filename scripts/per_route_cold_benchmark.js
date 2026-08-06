/**
 * per_route_cold_benchmark.ps1
 *
 * For each route:
 *   1. Kill any existing process on port 3002
 *   2. Start `npx next start -p 3002` fresh
 *   3. Wait for "Ready" confirmation via HTTP polling
 *   4. Issue ONE cold request to the target route (this is the first-touch MISS)
 *   5. Record latency + response headers
 *   6. Repeat from step 1 for the next route
 *
 * Node.js script — run with: node scripts/per_route_cold_benchmark.js
 */

const { spawn, execSync } = require('child_process');
const http = require('http');

const BASE_URL = 'http://localhost:3002';
const START_TIMEOUT_MS = 12000; // max time to wait for server ready

const routes = [
  { name: 'Home Page', path: '/' },
  { name: 'Blog Listing (/blog)', path: '/blog' },
  { name: 'Article 1 (Enterprise Brand Guide)', path: '/blog/the-master-guide-to-enterprise-brand-identity-and-strategy' },
  { name: 'Article 2 (Brand Identity vs Strategy)', path: '/blog/brand-identity-vs-brand-strategy-differences' },
  { name: 'API (blog-previews page=1)', path: '/api/blog-previews?page=1' },
];

function killPort3002() {
  try {
    const result = execSync(
      `powershell -Command "Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess" 2>nul`,
      { encoding: 'utf8', timeout: 5000 }
    ).trim();
    if (result) {
      const pids = [...new Set(result.split(/\r?\n/).filter(Boolean))];
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F 2>nul`, { timeout: 3000 });
          console.log(`  [kill] Killed PID ${pid} on port 3002`);
        } catch {}
      }
    }
  } catch {}
  // Give OS time to release the port
  return new Promise(r => setTimeout(r, 800));
}

function startServer() {
  const proc = spawn('npx', ['next', 'start', '-p', '3002'], {
    cwd: 'c:\\Users\\asxsi\\OneDrive\\Desktop\\fav\\opere gx icons\\creative-agency-portfolio-astrelks',
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return proc;
}

function waitForReady(timeoutMs = START_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeoutMs;
    function poll() {
      if (Date.now() > deadline) return reject(new Error('Server did not become ready in time'));
      const req = http.get(`${BASE_URL}/`, { timeout: 1000 }, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => setTimeout(poll, 300));
    }
    setTimeout(poll, 400); // Small initial delay
  });
}

function fetchRoute(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${BASE_URL}${urlPath}`;
    const start = performance.now();
    const req = http.get(fullUrl, { headers: { 'User-Agent': 'ColdBenchmark/1.0' } }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const latency = performance.now() - start;
        resolve({
          statusCode: res.statusCode,
          latencyMs: latency.toFixed(2),
          sizeBytes: Buffer.byteLength(body, 'utf8'),
          sizeKB: (Buffer.byteLength(body, 'utf8') / 1024).toFixed(2),
          headers: {
            'cache-control': res.headers['cache-control'] || '(none)',
            'x-nextjs-cache': res.headers['x-nextjs-cache'] || '(none)',
            'etag': res.headers['etag'] || '(none)',
          }
        });
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  console.log('\n==================================================================');
  console.log(' PER-ROUTE COLD BENCHMARK — full server restart before each route');
  console.log('==================================================================\n');

  const results = [];

  for (const route of routes) {
    console.log(`\n--- Route: ${route.name} (${route.path}) ---`);

    // 1. Kill any existing server on 3002
    console.log('  [1] Killing process on port 3002...');
    await killPort3002();

    // 2. Start fresh server
    console.log('  [2] Starting fresh production server...');
    const proc = startServer();

    // 3. Wait for server to become ready
    console.log('  [3] Waiting for server ready...');
    try {
      await waitForReady();
    } catch (err) {
      console.error('  [!] Server failed to start:', err.message);
      proc.kill();
      continue;
    }
    console.log('  [4] Server ready. Issuing cold request...');

    // 4. One cold request
    try {
      const result = await fetchRoute(route.path);
      console.log(`  [COLD] Status: ${result.statusCode} | Latency: ${result.latencyMs}ms | Size: ${result.sizeKB} KB | Cache: ${result.headers['cache-control']} | x-nextjs-cache: ${result.headers['x-nextjs-cache']}`);
      results.push({ name: route.name, path: route.path, ...result });
    } catch (err) {
      console.error('  [!] Request failed:', err.message);
    }

    // 5. Kill server before next route
    proc.kill();
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n==================================================================');
  console.log(' FINAL COLD-REQUEST RESULTS (one fresh server boot per route)');
  console.log('==================================================================');
  console.table(results.map(r => ({
    Name: r.name,
    Status: r.statusCode,
    'Cold Latency (ms)': r.latencyMs,
    'HTML/JSON Size (KB)': r.sizeKB,
    'cache-control': r.headers['cache-control'],
    'x-nextjs-cache': r.headers['x-nextjs-cache'],
  })));
}

run().catch(console.error);
