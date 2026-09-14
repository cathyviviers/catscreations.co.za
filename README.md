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

## Notes

- Images and video live in `images/` and are committed to the repo. Keep large video out of git where you can, it bloats clone size for everyone.
- `vercel.json` carries the Content Security Policy. If a third-party script (analytics, embeds, fonts) silently stops working, check there first.
