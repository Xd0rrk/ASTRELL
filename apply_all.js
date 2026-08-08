const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'c:/Users/asxsi/.gemini/antigravity-ide/brain/222e179d-feae-4edb-98d9-40fb431255fa';
const publicBlogDir = 'c:/Users/asxsi/OneDrive/Desktop/fav/opere gx icons/creative-agency-portfolio-astrelks/public/blog';
const libDir = 'c:/Users/asxsi/OneDrive/Desktop/fav/opere gx icons/creative-agency-portfolio-astrelks/lib';

const updates = [
  // BATCH 1
  { slug: 'graphic-designer-guide-custom-ai-instructions-prompt-system', file: 'batch-02-posts.ts', imgName: 'graphic_designer_custom_ai', srcMatch: /graphic_designer_custom_ai_\d+\.png$/ },
  { slug: 'ai-copy-editing-workflows-for-marketing-teams-prompts-tools', file: 'batch-03-posts.ts', imgName: 'ai_copy_editing_workflow', srcMatch: /ai_copy_editing_workflow_\d+\.png$/ },
  { slug: 'website-redesign-process-from-discovery-to-global-launch', file: 'batch-03-posts.ts', imgName: 'website_redesign_process', srcMatch: /website_redesign_process_\d+\.png$/ },
  { slug: 'web-accessibility-wcag-2-2-aa-compliance-digital-products', file: 'batch-04-posts.ts', imgName: 'web_accessibility_compliance', srcMatch: /web_accessibility_compliance_\d+\.png$/ },
  { slug: 'e-commerce-web-engineering-for-luxury-brands', file: 'batch-04-posts.ts', imgName: 'ecommerce_luxury_brands', srcMatch: /ecommerce_luxury_brands_\d+\.png$/ },
  // BATCH 2
  { slug: 'ui-ux-architecture-engineering-high-converting-product-experiences', file: 'batch-04-posts.ts', imgName: 'ui_ux_architecture_engineering', srcMatch: /ui_ux_architecture_engineering_\d+\.png$/ },
  { slug: 'ux-audit-framework-identifying-friction-in-digital-conversion', file: 'batch-04-posts.ts', imgName: 'ux_audit_framework', srcMatch: /ux_audit_framework_\d+\.png$/ },
  { slug: 'design-system-roi-scaling-ui-components-across-teams', file: 'batch-05-posts.ts', imgName: 'design_system_roi', srcMatch: /design_system_roi_\d+\.png$/ },
  { slug: 'mobile-first-ux-architecture-designing-for-touch-dynamics', file: 'batch-05-posts.ts', imgName: 'mobile_first_ux_architecture', srcMatch: /mobile_first_ux_architecture_\d+\.png$/ },
  { slug: 'micro-interactions-and-motion-ux-enhancing-user-engagement', file: 'batch-05-posts.ts', imgName: 'micro_interactions_motion_ux', srcMatch: /micro_interactions_motion_ux_\d+\.png$/ },
  { slug: 'information-architecture-principles-for-complex-web-saas', file: 'batch-05-posts.ts', imgName: 'information_architecture_saas', srcMatch: /information_architecture_saas_\d+\.png$/ },
  { slug: 'enterprise-dashboard-ux-design-simplifying-complex-analytics', file: 'batch-05-posts.ts', imgName: 'enterprise_dashboard_ux', srcMatch: /enterprise_dashboard_ux_\d+\.png$/ },
  { slug: 'ux-prototyping-best-practices-from-wireframes-to-high-fidelity', file: 'batch-06-posts.ts', imgName: 'ux_prototyping_best_practices', srcMatch: /ux_prototyping_best_practices_\d+\.png$/ },
  // 13 CANDIDATES
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
    if (!srcFile) continue;
    
    const srcPath = path.join(brainDir, srcFile);
    const destName = update.imgName + '.webp';
    const destPath = path.join(publicBlogDir, destName);
    
    let content = fs.readFileSync(path.join(libDir, update.file), 'utf8');
    const idx = content.indexOf(`slug: '${update.slug}'`);
    if (idx === -1) continue;
    
    const objStart = content.lastIndexOf('{', idx);
    let objEnd = content.indexOf('paragraphs', idx);
    if (objEnd === -1) objEnd = content.indexOf('}', idx);
    
    const block = content.substring(objStart, objEnd);
    const originalLineMatch = block.match(/coverImage:\s*'([^']+)'/);
    if (originalLineMatch) {
      if (originalLineMatch[1] === `/blog/${destName}`) {
        // Already updated
        continue;
      }
      const newLine = `coverImage: '/blog/${destName}'`;
      const newBlock = block.replace(originalLineMatch[0], newLine);
      content = content.substring(0, objStart) + newBlock + content.substring(objEnd);
      fs.writeFileSync(path.join(libDir, update.file), content);
      console.log('Updated ' + update.slug);
    }
  }
}

run();
