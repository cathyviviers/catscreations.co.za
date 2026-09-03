const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://catscreations.co.za';
const POSTS_DIR = path.join(__dirname, 'blog', 'posts');
const OUTPUT_FILE = path.join(__dirname, 'blog', 'rss.xml');

function extractMeta(html, attr, value) {
  const re = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]+content=(["'])(.*?)\\1`, 'i');
  const match = html.match(re);
  return match ? match[2] : null;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=(["'])(.*?)\1/i);
  return match ? match[2] : null;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

const posts = files.map(file => {
  const html = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const rawTitle = extractMeta(html, 'property', 'og:title') || '';
  const title = rawTitle.replace(/\s*\|\s*Cat's Creations\s*$/, '').trim();
  const description = extractMeta(html, 'property', 'og:description') || extractMeta(html, 'name', 'description') || '';
  const publishedTime = extractMeta(html, 'property', 'article:published_time');
  const author = extractMeta(html, 'property', 'article:author');
  const link = extractCanonical(html) || `${BASE_URL}/blog/posts/${file}`;
  const pubDate = publishedTime ? new Date(publishedTime + 'T09:00:00Z') : new Date();
  return { title, description, link, author, pubDate };
}).sort((a, b) => b.pubDate - a.pubDate);

const items = posts.map(post => `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(post.link)}</link>
    <guid isPermaLink="true">${escapeXml(post.link)}</guid>
    <pubDate>${post.pubDate.toUTCString()}</pubDate>
    <description>${escapeXml(post.description)}</description>${post.author ? `\n    <author>${escapeXml(post.author)}</author>` : ''}
  </item>`).join('\n\n');

const lastBuildDate = posts.length ? posts[0].pubDate.toUTCString() : new Date().toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Cat's Creations Blog</title>
  <link>${BASE_URL}/blog/</link>
  <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
  <description>Design, branding, and digital content tips from Cat's Creations — a Pretoria-based graphic design studio.</description>
  <language>en-za</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>

${items}

</channel>
</rss>
`;

fs.writeFileSync(OUTPUT_FILE, rss);
console.log(`RSS feed updated — ${posts.length} posts written to blog/rss.xml`);
