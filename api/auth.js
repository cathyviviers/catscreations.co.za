// GitHub OAuth handshake for the Sveltia/Decap CMS "github" backend.
// Step 1: redirect the CMS's popup window to GitHub's OAuth authorize screen.
export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${proto}://${host}/api/callback`;

  const params = new URLSearchParams({
    // TODO(owner): replace with the Client ID from the GitHub OAuth App
    // registered for this site. See the PR description for setup steps.
    client_id: 'REPLACE_WITH_NEW_OAUTH_CLIENT_ID',
    redirect_uri: redirectUri,
    scope: 'repo,user',
  });

  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
