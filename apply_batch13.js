const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'c:/Users/asxsi/.gemini/antigravity-ide/brain/222e179d-feae-4edb-98d9-40fb431255fa';
const publicBlogDir = 'c:/Users/asxsi/OneDrive/Desktop/fav/opere gx icons/creative-agency-portfolio-astrelks/public/blog';
const libDir = 'c:/Users/asxsi/OneDrive/Desktop/fav/opere gx icons/creative-agency-portfolio-astrelks/lib';

const updates = [
  { slug: 'the-master-guide-to-enterprise-brand-identity-and-strategy', file: 'batch-01-posts.ts', imgName: 'astrell_enterprise_brand_guide_hero', srcMatch: /astrell_enterprise_brand_guide_hero_\d+\.png$/ },
  { slug: 'brand-identity-vs-brand-strategy-differences', file: 'batch-01-posts.ts', imgName: 'astrell_identity_vs_strategy_hero', srcMatch: /astrell_identity_vs_strategy_hero_\d+\.png$/ },
  { slug: 'roi-of-brand-redesign-financial-impact', file: 'batch-01-posts.ts', imgName: 'astrell_brand_redesign_roi_hero', srcMatch: /astrell_brand_redesign_roi_hero_\d+\.png$/ },
  { slug: 'signs-your-brand-identity-is-holding-back-growth', file: 'batch-01-posts.ts', imgName: 'astrell_rebrand_signs_hero', srcMatch: /astrell_rebrand_signs_hero_\d+\.png$/ },
  { slug: 'brand-guidelines-design-systems-scalable-standards', file: 'batch-01-posts.ts', imgName: 'astrell_design_systems_hero', srcMatch: /astrell_design_systems_hero_\d+\.png$/ },
  { slug: 'rebranding-risk-management-navigating-transitions', file: 'batch-01-posts.ts', imgName: 'astrell_rebrand_risk_management_hero', srcMatch: /astrell_rebrand_risk_management_hero_\d+\.png$/ },
  { slug: 'color-psychology-typography-consumer-perception', file: 'batch-01-posts.ts', imgName: 'astrell_color_typography_psychology_hero', srcMatch: /astrell_color_typography_psychology_hero_\d+\.png$/ },
  { slug: 'b2b-brand-identity-strategy-converting-technical-complexity', file: 'batch-02-posts.ts', imgName: 'astrell_b2b_brand_strategy_hero', srcMatch: /astrell_b2b_brand_strategy_hero_\d+\.png$/ },
  { slug: 'common-rebranding-mistakes-enterprise-companies-make', file: 'batch-02-posts.ts', imgName: 'astrell_rebranding_mistakes_hero', srcMatch: /astrell_rebranding_mistakes_hero_\d+\.png$/ },
  { slug: 'modern-web-engineering-building-enterprise-custom-web-platforms', file: 'batch-02-posts.ts', imgName: 'astrell_enterprise_web_engineering_hero', srcMatch: /astrell_enterprise_web_engineering_hero_\d+\.png$/ },
  { slug: 'headless-cms-vs-monolithic-platforms-executive-guide', file: 'batch-02-posts.ts', imgName: 'astrell_headless_vs_monolithic_hero', srcMatch: /astrell_headless_vs_monolithic_hero_\d+\.png$/ },
  { slug: 'web-performance-optimization-achieving-sub-second-load-times', file: 'batch-02-posts.ts', imgName: 'astrell_web_performance_optimization_hero', srcMatch: /astrell_web_performance_optimization_hero_\d+\.png$/ },
  { slug: 'dark-mode-design-systems-guide', file: 'batch-03-posts.ts', imgName: 'blog_cover_dark_mode_new', srcMatch: /blog_cover_dark_mode_new_\d+\.png$/ }
];

async function run() {
  const generatedFiles = fs.readdirSync(brainDir);
  for (const update of updates) {
    const srcFile = generatedFiles.find(f => update.srcMatch.test(f));
    if (!srcFile) {
      console.log('Skipping ' + update.slug + ' - Image not generated.');
      continue;
    }
    
    const srcPath = path.join(brainDir, srcFile);
    const destName = update.imgName + '.webp';
    const destPath = path.join(publicBlogDir, destName);
    
    await sharp(srcPath).webp({ quality: 90 }).toFile(destPath);
    
    let content = fs.readFileSync(path.join(libDir, update.file), 'utf8');
    const regex = new RegExp(`(slug:\\s*'${update.slug}'[\\s\\S]{1,2000}?coverImage:\\s*')[^']+(')`);
    content = content.replace(regex, `$1/blog/${destName}$2`);
    fs.writeFileSync(path.join(libDir, update.file), content);
    console.log('Updated ' + update.slug);
  }
}

run();
