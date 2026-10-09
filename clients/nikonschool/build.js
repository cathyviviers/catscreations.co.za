/*
  Generates the workshop and creator pages from js/data.js so every person and
  workshop has its own shareable URL, e.g. /creators/saudiq-davids/.
  Run after editing data.js:  node clients/nikonschool/build.js
*/
const fs = require("fs");
const path = require("path");
const data = require("./js/data.js");

const here = __dirname;

function page({ root, title, description, pageKey, slug, main }) {
  return `<!DOCTYPE html>
<html lang="en-ZA" data-root="${root}">
<head>
  <meta charset="UTF-8" />
  <script>try{var t=localStorage.getItem("ns-theme");document.documentElement.setAttribute("data-theme",t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}</script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Nikon School South Africa (design concept)" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://nikonschool.catscreations.co.za/clients/nikonschool/images/og.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="theme-color" content="#0b0b0c" />
  <link rel="icon" type="image/png" href="${root}images/favicon.png" />
  <link rel="apple-touch-icon" href="${root}images/apple-touch-icon.png" />
  <link rel="stylesheet" href="${root}css/site.css" />
</head>
<body data-page="${pageKey}"${slug ? ` data-slug="${slug}"` : ""}>
  <div id="site-header"></div>
  <main id="main">${main}</main>
  <div id="site-footer"></div>
  <script src="${root}js/data.js"></script>
  <script src="${root}js/art.js"></script>
  <script src="${root}js/app.js"></script>
  <script src="${root}js/extras.js"></script>
</body>
</html>
`;
}

function write(rel, html) {
  const file = path.join(here, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("wrote", rel);
}

const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

write("workshops/index.html", page({
  root: "../",
  title: "Workshops | Nikon School South Africa",
  description: "Free and paid photography and video workshops from Nikon School South Africa.",
  pageKey: "workshops",
  main: `
    <section class="page-hero cream">
      <div class="wrap">
        <div class="crumbs"><a href="../">Home</a> / Workshops</div>
        <h1>Workshops</h1>
        <p class="lede">Start free with the fundamentals, then specialise with Nikon's ambassadors and creators. Small groups, real feedback, your own camera.</p>
      </div>
    </section>
    <section style="padding-top:40px">
      <div class="wrap">
        <div class="filters">
          <div class="chips" id="f-type" role="group" aria-label="Price">
            <button class="chip" data-f="all" aria-pressed="true">All workshops</button>
            <button class="chip" data-f="free" aria-pressed="false">Free</button>
            <button class="chip" data-f="paid" aria-pressed="false">Paid</button>
          </div>
          <div class="group">
            <label class="sr-only" for="f-city">City</label><select class="select" id="f-city"></select>
            <label class="sr-only" for="f-level">Level</label><select class="select" id="f-level"></select>
            <label class="sr-only" for="f-sort">Sort</label>
            <select class="select" id="f-sort"><option value="date">Soonest first</option><option value="price">Price, low to high</option></select>
          </div>
        </div>
        <p id="count" style="color:var(--muted);font-weight:600;margin-bottom:18px"></p>
        <div class="grid" id="ws-grid"></div>
      </div>
    </section>`
}));

data.workshops.forEach((w) => {
  write(`workshops/${w.slug}/index.html`, page({
    root: "../../",
    title: `${attr(w.short)} | Nikon School South Africa`,
    description: attr(w.summary),
    pageKey: "workshop",
    slug: w.slug,
    main: ""
  }));
});

write("creators/index.html", page({
  root: "../",
  title: "Ambassadors & Creators | Nikon School South Africa",
  description: "Meet the Nikon South Africa ambassadors, workshop hosts and creators.",
  pageKey: "creators",
  main: `
    <section class="page-hero dark">
      <div class="wrap">
        <div class="crumbs"><a href="../">Home</a> / Ambassadors &amp; Creators</div>
        <h1 style="color:#fff">Ambassadors, collaborators<br>&amp; creators</h1>
        <p class="lede">The photographers and filmmakers who teach at Nikon School and shoot for Nikon South Africa. Each one has a page of their own, with a link that tracks the bookings it brings in.</p>
      </div>
    </section>
    <section style="padding-top:48px">
      <div class="wrap">
        <div class="chips role-tabs" id="role-tabs" role="group" aria-label="Filter by role">
          <button class="chip" data-r="all" aria-pressed="true">Everyone</button>
          <button class="chip" data-r="ambassador" aria-pressed="false">Ambassadors</button>
          <button class="chip" data-r="collaborator" aria-pressed="false">Collaborators</button>
          <button class="chip" data-r="creator" aria-pressed="false">Creators</button>
          <button class="chip" data-r="host" aria-pressed="false">Workshop hosts</button>
          <button class="chip" data-r="team" aria-pressed="false">Nikon School team</button>
        </div>
        <div class="people" id="people-grid"></div>
      </div>
    </section>`
}));

data.people.forEach((p) => {
  write(`creators/${p.slug}/index.html`, page({
    root: "../../",
    title: `${attr(p.name)} | Nikon School South Africa`,
    description: attr(`${p.name}: ${p.specialty}. Nikon School South Africa.`),
    pageKey: "creator",
    slug: p.slug,
    main: ""
  }));
});
