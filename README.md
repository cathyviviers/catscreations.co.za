# catscreations.co.za

The website for [Cat's Creations](https://catscreations.co.za), a graphic design studio in Pretoria, South Africa.

Live at **[catscreations.co.za](https://catscreations.co.za)**.

## Stack

No framework. Hand-written HTML, CSS and vanilla JavaScript, deployed on Vercel. Content can be edited through a Git-backed CMS, so every content change lands as a commit on this repo.

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `services/` | One page per service |
| `blog/` | Blog index and posts |
| `admin/`, `admin-index/` | Sveltia CMS, the browser-based content editor |
| `api/auth.js`, `api/callback.js` | GitHub OAuth handlers that let the CMS commit on your behalf |
| `css/style.css` | All site styles |
| `images/` | Photography, illustration and video assets |
| `generate-sitemap.js` | Builds `sitemap.xml` |
| `generate-feed.js` | Builds `feed.xml` |
| `generate-rss.js` | Builds `blog/rss.xml` |
| `llms.txt`, `robots.txt`, `manifest.json` | Crawler, AI-crawler and PWA metadata |
| `clients/` | Client landing pages, one folder per client, each served on its own subdomain |
| `vercel.json` | Routing, redirects and security headers |

## Running it locally

There is no build step for the pages themselves. Clone and serve the folder.

```bash
git clone https://github.com/cathyviviers/catscreations.co.za.git
cd catscreations.co.za
npx serve .
```

Regenerate the sitemap and feeds after adding or renaming pages:

```bash
npm run build   # sitemap + feed
npm run rss     # blog RSS
```

## Editing content without touching code

Go to [catscreations.co.za/admin](https://catscreations.co.za/admin) and sign in with GitHub. The CMS commits to `main`, which triggers a deploy.

## Deploying

Vercel builds and deploys every push to `main` automatically. Pull requests get their own preview URL.

## Client landing pages

Each folder in `clients/` is a landing page served on a subdomain: `clients/oumasenes/` shows up at `oumasenes.catscreations.co.za`. One rewrite rule in `vercel.json` maps any subdomain to the folder with the same name, so there is no config to touch per client. Visiting `catscreations.co.za/clients/<name>/` redirects to the subdomain, and `clients/` is left out of the main sitemap.

To add a client:

1. Copy an existing client folder to `clients/<name>/` (lowercase letters, numbers and hyphens only) and replace the content, canonical URL, `robots.txt` and `sitemap.xml`.
2. In Vercel, add `<name>.catscreations.co.za` to this project under Settings, Domains. If the domain's DNS is on Vercel, a single `*.catscreations.co.za` wildcard covers every client; otherwise add a CNAME for `<name>` pointing at `cname.vercel-dns.com`.

`clients/nikonschool/` is a clickable pitch rather than a live client site: a redesign concept for Nikon School South Africa with a demo booking flow and admin dashboard (no real payments). Its workshop and creator pages are generated from `js/data.js` with `node clients/nikonschool/build.js`, and it is set to `noindex`.

The site-wide Content Security Policy applies to client pages too, so embeds like Google Maps iframes or booking widgets need adding to `vercel.json` first.

## Notes

- Images and video live in `images/` and are committed to the repo. Keep large video out of git where you can, it bloats clone size for everyone.
- `vercel.json` carries the Content Security Policy. If a third-party script (analytics, embeds, fonts) silently stops working, check there first.
