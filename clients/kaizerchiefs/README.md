# Kaizer Chiefs homepage concept

A homepage redesign concept for Kaizer Chiefs, built as a pitch. Live at **kaizerchiefs.catscreations.co.za**, served from this `clients/kaizerchiefs/` folder by the shared client-subdomain rules in `vercel.json`. Marked `noindex` with a disallow-all `robots.txt`, and skipped by `generate-sitemap.js`.

Add `?present` to the URL to hide the floating concept notice (visitors can also dismiss it with its close button).

## Direction

- **Matchday first.** The hero and match centre (countdown, last result, form, log) sit above the fold, because fixtures and tickets are why most fans visit.
- **Black and gold, loud type.** Anton display type and Barlow Condensed labels for a stadium-signage feel.
- **Mobile first.** Every section collapses cleanly to a phone screen, with a full-screen menu.
- **Content hubs:** News, Amakhosi TV, Squad (filter by position), Shop, Heritage, Khosi Nation membership, Partners.

## Motion and interaction

- Hero: letter-by-letter headline, slow photo zoom, gold confetti that dodges the pointer, mouse parallax on the photo and chief's head.
- Ticker that speeds up and reverses with scroll, scroll progress bar, header that hides on scroll down.
- Stats section with Season / Home / Away filter: count-up tiles with sparklines, ring gauges against the league average, comparison bars, goals-per-match columns with result tooltips and a table view, and a hoverable shot map.
- Cards tilt in 3D with a light glare, buttons are magnetic, a gold cursor ring follows the mouse on desktop.
- Squad cards reveal player stat bars on hover; position filter animates.
- Drag-to-scroll Amakhosi TV row, partner logo marquee, gold burst on newsletter signup.
- Everything respects reduced-motion settings; cursor and tilt effects only run on mouse/trackpad devices.

## Extras

- Share card (`img/og.jpg`) for WhatsApp, Facebook and X link previews; home screen icon and `manifest.webmanifest` so it saves to a phone like an app.
- Crest intro that plays once per visit (skipped for reduced motion), back-to-top button with a scroll-progress ring, and "Add to calendar" for the next fixture (.ics download).
- Easter egg: type KHOSI on a keyboard, or tap the header crest five times on a phone.

## Club assets

`img/` holds the club's crest, partner logos and photography, resized for the web (about 1.5 MB in total). The hero uses the 2026 Toyota Cup champions team photo.

## Still placeholder

- Fixtures, scores, the log, form guide and every number in the stats section.
- Player names, positions and numbers in the squad grid (photos are real, names are not).
- News headlines and copy, video titles and durations.
- The signup form does not send anything.
