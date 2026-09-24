<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  exclude-result-prefixes="atom dc">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><xsl:value-of select="/rss/channel/title" /> — RSS Feed</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; }
          :root {
            --pink: #d0177a;
            --pink-tint: #fff0f6;
            --pink-tint-border: #ffd0e8;
            --text: #1a1a1a;
            --text-muted: #666;
            --border: #e5e5e5;
            --bg: #fff;
            --bg-alt: #f9f9f9;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --text: #f0f0f0;
              --text-muted: #aaa;
              --border: #333;
              --bg: #121212;
              --bg-alt: #1e1e1e;
              --pink-tint: rgba(208,23,122,0.12);
              --pink-tint-border: rgba(208,23,122,0.3);
            }
          }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }
          .feed-header {
            background: var(--pink-tint);
            border-bottom: 1px solid var(--pink-tint-border);
            padding: 2.5rem 1rem;
            text-align: center;
          }
          .feed-logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text);
            text-decoration: none;
            margin-bottom: 0.25rem;
            display: block;
          }
          .feed-logo em {
            color: var(--pink);
            font-style: normal;
          }
          .feed-notice {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            margin-top: 1rem;
            padding: 0.4rem 0.9rem;
            background: var(--bg);
            border: 1px solid var(--pink-tint-border);
            border-radius: 20px;
            font-size: 0.8rem;
            color: var(--text-muted);
          }
          .feed-notice strong { color: var(--pink); }
          .feed-desc {
            max-width: 560px;
            margin: 0.75rem auto 0;
            font-size: 0.9rem;
            color: var(--text-muted);
          }
          .feed-main {
            max-width: 720px;
            margin: 0 auto;
            padding: 2.5rem 1rem;
          }
          .feed-meta {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .feed-meta a {
            color: var(--pink);
            text-decoration: none;
          }
          .feed-item {
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.25rem;
            background: var(--bg);
            transition: border-color 0.2s, transform 0.2s;
          }
          .feed-item:hover { border-color: var(--pink); transform: translateY(-2px); }
          .feed-item-meta {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
            margin-bottom: 0.6rem;
          }
          .feed-item-cat {
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            color: var(--pink);
            background: var(--pink-tint);
            border: 1px solid var(--pink-tint-border);
            border-radius: 4px;
            padding: 0.15rem 0.5rem;
          }
          .feed-item-date {
            font-size: 0.8rem;
            color: var(--text-muted);
          }
          .feed-item-author {
            font-size: 0.8rem;
            color: var(--text-muted);
          }
          .feed-item h2 {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
            line-height: 1.4;
          }
          .feed-item h2 a {
            color: var(--text);
            text-decoration: none;
          }
          .feed-item h2 a:hover { color: var(--pink); }
          .feed-item-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin: 0 0 0.75rem;
            line-height: 1.6;
          }
          .feed-item-read {
            font-size: 0.85rem;
            color: var(--pink);
            text-decoration: none;
            font-weight: 500;
          }
          .feed-footer {
            text-align: center;
            padding: 2rem 1rem;
            border-top: 1px solid var(--border);
            font-size: 0.85rem;
            color: var(--text-muted);
          }
          .feed-footer a { color: var(--pink); text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="feed-header">
          <a class="feed-logo" href="https://catscreations.co.za">Cat's <em>Creations</em></a>
          <p class="feed-desc"><xsl:value-of select="/rss/channel/description" /></p>
          <span class="feed-notice">
            <strong>RSS Feed</strong> — subscribe in your reader app
          </span>
        </div>

        <div class="feed-main">
          <div class="feed-meta">
            <span>
              <xsl:value-of select="count(/rss/channel/item)" /> articles
            </span>
            <a href="https://catscreations.co.za/blog/">← Back to the blog</a>
            <a href="https://catscreations.co.za/feed.xml">Copy feed URL</a>
          </div>

          <xsl:for-each select="/rss/channel/item">
            <div class="feed-item">
              <div class="feed-item-meta">
                <xsl:if test="category">
                  <span class="feed-item-cat"><xsl:value-of select="category" /></span>
                </xsl:if>
                <span class="feed-item-date"><xsl:value-of select="substring(pubDate,1,16)" /></span>
                <xsl:if test="dc:creator">
                  <span class="feed-item-author">by <xsl:value-of select="dc:creator" /></span>
                </xsl:if>
              </div>
              <h2><a href="{link}"><xsl:value-of select="title" /></a></h2>
              <p class="feed-item-desc"><xsl:value-of select="description" /></p>
              <a class="feed-item-read" href="{link}">Read article →</a>
            </div>
          </xsl:for-each>
        </div>

        <div class="feed-footer">
          <p>© 2026 <a href="https://catscreations.co.za">Cat's Creations</a> · Brand Identity &amp; Graphic Design · Pretoria, South Africa</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
