const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://catscreations.co.za';
const ROOT = __dirname;
const TODAY = new Date().toISOString().split('T')[0];

const PRIORITY = {
  'index.html': { priority: '1.0', changefreq: 'monthly' },
  'services/': { priority: '0.9', changefreq: 'monthly' },
  'blog/index.html': { priority: '0.8', changefreq: 'weekly' },
  'blog/posts/': { priority: '0.7', changefreq: 'yearly' },
};

function getPriorityConfig(relPath) {
  if (relPath === 'index.html') return PRIORITY['index.html'];
  if (relPath.startsWith('services/')) return PRIORITY['services/'];
  if (relPath === 'blog/index.html') return PRIORITY['blog/index.html'];
  if (relPath.startsWith('blog/posts/')) return PRIORITY['blog/posts/'];
  return { priority: '0.5', changefreq: 'monthly' };
}

function findHtmlFiles(dir, base = ROOT) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.claude'].includes(entry.name)) continue;
      results.push(...findHtmlFiles(fullPath, base));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findHtmlFiles(ROOT);

const urls = files.map(file => {
  let relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  const urlPath = relPath === 'index.html' ? '/' : '/' + relPath;
  const { priority, changefreq } = getPriorityConfig(relPath);
  return `  <url>\n    <loc>${BASE_URL}${urlPath}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join('\n\n')}

</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log(`Sitemap updated — ${urls.length} URLs written.`);
