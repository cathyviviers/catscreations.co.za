const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://catscreations.co.za';
const ROOT = __dirname;
const BLOG_INDEX = path.join(ROOT, 'blog', 'index.html');
const POSTS_DIR = path.join(ROOT, 'blog', 'posts');
const FEED_PATH = path.join(ROOT, 'feed.xml');

// Posts carry a date only. Pin a stable time of day in South African
// Standard Time (+02:00) so item ordering and pubDate stay deterministic.
const PUB_TIME = '09:00:00';

const CHANNEL = {
  title: "Cat's Creations Blog",
  link: `${BASE_URL}/blog/`,
  description:
    'Design, branding, and digital content tips from Cat’s Creations — a Pretoria-based graphic design studio. Practical insights for South African small businesses and entrepreneurs.',
  image: `${BASE_URL}/images/social-card.png`,
};

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function firstMatch(html, re) {
  const m = html.match(re);
  return m ? decodeEntities(m[1].trim()) : null;
}

// RFC 822 date (e.g. "Sat, 01 Aug 2026 09:00:00 +0200") in the fixed +0200
// zone, without relying on the host machine's timezone.
function rfc822(isoDate) {
  const [y, mo, da] = isoDate.split('-').map(Number);
  // Day-of-week via UTC midnight of the date (offset doesn't cross a day here).
  const dow = new Date(Date.UTC(y, mo - 1, da)).getUTCDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n) => String(n).padStart(2, '0');
  return `${days[dow]}, ${pad(da)} ${months[mo - 1]} ${y} ${PUB_TIME} +0200`;
}

// Pull the ordered post list (href + category tag) from the blog index so the
// feed mirrors the curated ordering shown on the site.
function readPostList() {
  const html = read(BLOG_INDEX);
  const cardRe = /<a\s+href="(posts\/[^"]+\.html)"[^>]*class="blog-card"[\s\S]*?<span class="blog-tag">([^<]+)<\/span>/g;
  const list = [];
  let m;
  while ((m = cardRe.exec(html)) !== null) {
    list.push({ href: m[1], category: decodeEntities(m[2].trim()) });
  }
  return list;
}

function readPost(href, category) {
  const file = path.join(ROOT, 'blog', href);
  const html = read(file);

  const headline =
    firstMatch(html, /"headline":\s*"([^"]+)"/) ||
    firstMatch(html, /<meta property="og:title" content="([^"]+)"/)?.replace(/\s*\|\s*Cat's Creations\s*$/i, '') ||
    firstMatch(html, /<title>([^<]+)<\/title>/).replace(/\s*\|[\s\S]*$/, '');

  const description = firstMatch(html, /<meta name="description" content="([^"]+)"/);
  const published = firstMatch(html, /<meta property="article:published_time" content="([^"]+)"/);
  const author = firstMatch(html, /<meta property="article:author" content="([^"]+)"/) || "Cat's Creations";
  const image = firstMatch(html, /<meta property="og:image" content="([^"]+)"/);

  if (!published) {
    throw new Error(`Missing article:published_time in ${href}`);
  }

  return {
    url: `${BASE_URL}/blog/${href}`,
    title: headline,
    description,
    published,
    author,
    category,
    image,
  };
}

const posts = readPostList()
  .map(({ href, category }) => readPost(href, category))
  .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${p.url}</link>
      <guid isPermaLink="true">${p.url}</guid>
      <pubDate>${rfc822(p.published)}</pubDate>
      <dc:creator>${escapeXml(p.author)}</dc:creator>
      <category>${escapeXml(p.category)}</category>
      <description>${escapeXml(p.description)}</description>${
        p.image ? `\n      <enclosure url="${escapeXml(p.image)}" type="image/jpeg" />` : ''
      }
    </item>`
  )
  .join('\n\n');

const lastBuildDate = posts.length ? rfc822(posts[0].published) : rfc822(new Date().toISOString().split('T')[0]);

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(CHANNEL.title)}</title>
    <link>${CHANNEL.link}</link>
    <description>${escapeXml(CHANNEL.description)}</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <image>
      <url>${CHANNEL.image}</url>
      <title>${escapeXml(CHANNEL.title)}</title>
      <link>${CHANNEL.link}</link>
    </image>

${items}

  </channel>
</rss>
`;

fs.writeFileSync(FEED_PATH, feed);
console.log(`Feed updated — ${posts.length} items written to feed.xml.`);
