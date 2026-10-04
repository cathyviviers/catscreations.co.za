// Serves concept and client pages on their own subdomains while keeping the
// address bar clean (fleetcam.catscreations.co.za/, not /clients/fleetcam/).
// Routing Middleware runs before Vercel looks for files, so the root
// index.html (the studio homepage) can't answer for a subdomain first.
//
// - mochachos.catscreations.co.za  -> /concepts/mochachos/
// - <name>.catscreations.co.za     -> /clients/<name>/
// Every other host (catscreations.co.za, www, previews) passes straight through.
const CONCEPT_HOST = 'mochachos.catscreations.co.za';
const CONCEPT_DIR = '/concepts/mochachos';
const CLIENT_HOST = /^(?!www\.)([a-z0-9-]+)\.catscreations\.co\.za$/;

function rewrite(url, dir) {
  const target = new URL(dir + (url.pathname === '/' ? '/index.html' : url.pathname) + url.search, url);
  return new Response(null, { headers: { 'x-middleware-rewrite': target.toString() } });
}

export default function middleware(request) {
  const url = new URL(request.url);

  if (url.hostname === CONCEPT_HOST) {
    if (url.pathname.startsWith('/concepts/')) return;
    return rewrite(url, CONCEPT_DIR);
  }

  const client = CLIENT_HOST.exec(url.hostname);
  // Paths already inside /clients/ (older shared links) are served as they are.
  if (!client || url.pathname.startsWith('/clients/')) return;
  return rewrite(url, '/clients/' + client[1]);
}
