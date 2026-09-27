// GitHub OAuth handshake for the Sveltia/Decap CMS "github" backend.
// Step 2: exchange the authorization code for an access token, then
// postMessage it back to the CMS window that opened this popup.
// Requires OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET set as Vercel environment variables.
export default async function handler(req, res) {
  const { code, state } = req.query;
  if (!code) return res.status(400).send('Missing code parameter');

  // Check the state value set by /api/auth so a login can't be forged from another site.
  const cookies = Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .map((c) => c.trim().split('='))
      .filter((p) => p.length === 2)
  );
  if (!state || state !== cookies.cms_oauth_state) {
    return res.status(403).send('Login session expired or invalid. Close this window and try again.');
  }
  res.setHeader('Set-Cookie', 'cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0');

  let payload;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });
    const data = await tokenRes.json();
    payload = data.access_token
      ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`
      : `authorization:github:error:${JSON.stringify({ message: data.error_description || 'Authentication failed' })}`;
  } catch (err) {
    payload = `authorization:github:error:${JSON.stringify({ message: 'Server error' })}`;
  }

  // Escape "<" so nothing in the payload can break out of the script tag.
  const safePayload = JSON.stringify(payload).replace(/</g, '\\u003c');

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store');
  res.send(`<!DOCTYPE html><html><body><script>
(function () {
  function onMessage(e) {
    // Only hand the token to this site (catscreations.co.za or its own preview URL).
    if (e.origin !== window.location.origin) return;
    window.removeEventListener('message', onMessage);
    window.opener.postMessage(${safePayload}, e.origin);
  }
  window.addEventListener('message', onMessage);
  window.opener && window.opener.postMessage('authorizing:github', window.location.origin);
})();
</script></body></html>`);
}
