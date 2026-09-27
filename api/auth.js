// GitHub OAuth handshake for the Sveltia/Decap CMS "github" backend.
// Step 1: redirect the CMS's popup window to GitHub's OAuth authorize screen.
// Requires OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET set as Vercel environment variables.
import crypto from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('CMS login is not configured yet (OAUTH_CLIENT_ID is missing).');
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${proto}://${host}/api/callback`;

  // Random state ties the callback to this browser session (CSRF protection).
  const state = crypto.randomBytes(16).toString('hex');
  res.setHeader(
    'Set-Cookie',
    `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    // public_repo is enough for this public site repo and avoids granting
    // access to any private repositories on the account.
    scope: 'public_repo,read:user',
    state,
  });

  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
