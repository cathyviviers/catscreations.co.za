// Serves the Mochachos concept at mochachos.catscreations.co.za.
// Every other host (catscreations.co.za, previews) passes straight through.
const CONCEPT_HOST = 'mochachos.catscreations.co.za';
const CONCEPT_DIR = '/concepts/mochachos';

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.hostname !== CONCEPT_HOST || url.pathname.startsWith('/concepts/')) return;

  const target = new URL(CONCEPT_DIR + (url.pathname === '/' ? '/index.html' : url.pathname) + url.search, url);
  return new Response(null, { headers: { 'x-middleware-rewrite': target.toString() } });
}
