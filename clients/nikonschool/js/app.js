/* Nikon School SA concept: shared layout, page rendering and the demo booking flow */
(function () {
  var D = window.NS_DATA;
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var PAGE = document.body.getAttribute("data-page");
  var SLUG = document.body.getAttribute("data-slug");
  var LIVE_DOMAIN = "nikonschool.co.za";

  /* ---------- helpers ---------- */
  var I = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/></svg>',
    level: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 20v-5M12 20V9M19 20V4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/></svg>',
    bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-5 9 5M5 9v9M10 9v9M14 9v9M19 9v9M3 20h18"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15V9l5.2 3z"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.3v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.5a6 6 0 1 0 5.1 5.9V9.1a7.6 7.6 0 0 0 4.5 1.4V7.2a4.3 4.3 0 0 1-3.4-1.4z"/></svg>',
    pt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-5 0-2.6-1.9-4.4-4.5-4.4a4.7 4.7 0 0 0-4.9 4.7c0 .9.4 1.9.8 2.5l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.8-2.4 6.8-5.7 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A10 10 0 1 0 12 2z"/></svg>'
  };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function person(slug) { return D.people.filter(function (p) { return p.slug === slug; })[0]; }
  function workshop(slug) { return D.workshops.filter(function (w) { return w.slug === slug; })[0]; }
  function wsUrl(w, ref) { return ROOT + "workshops/" + w.slug + "/" + (ref ? "?ref=" + encodeURIComponent(ref) : ""); }
  function pUrl(p) { return ROOT + "creators/" + p.slug + "/"; }
  function money(n) { return n === 0 ? "Free" : "R " + n.toLocaleString("en-ZA").replace(/,/g, " "); }
  function seatsLeft(s) { return Math.max(0, s.seats - s.taken); }
  function initials(name) { return name.split(/\s+/).filter(function (w) { return /^[A-Z]/.test(w); }).slice(0, 2).map(function (w) { return w[0]; }).join(""); }
  function roleLabel(r) { return { ambassador: "Ambassador", host: "Host", creator: "Creator", team: "Nikon School" }[r] || r; }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(sessionStorage.getItem(key) || "null");
      sessionStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function dt(iso) {
    var p = iso.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return { d: d, day: d.getDate(), mon: MONTHS[d.getMonth()], dow: DAYS[d.getDay()], long: DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()] };
  }
  function nextSession(w) {
    var open = w.sessions.filter(function (s) { return seatsLeft(s) > 0; });
    return (open.length ? open : w.sessions).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; })[0];
  }

  function art(kind, cls) { return '<div class="art-box ' + (cls || "") + '">' + window.nsArt(kind) + "</div>"; }
  function avatar(p, size) {
    return '<span class="avatar' + (p.role === "ambassador" ? " ring" : "") + '"' + (size ? ' style="--size:' + size + 'px"' : "") + ">" + window.nsArt(p.art) + "<b>" + esc(initials(p.name)) + "</b></span>";
  }

  /* ---------- layout ---------- */
  function navLink(href, label, key) {
    var cur = PAGE === key || (key === "workshops" && PAGE === "workshop") || (key === "creators" && PAGE === "creator");
    return '<a href="' + ROOT + href + '"' + (cur ? ' aria-current="page"' : "") + ">" + label + "</a>";
  }

  function renderLayout() {
    var bookings = store("ns-bookings") || [];
    var head = $("#site-header");
    if (head) {
      head.outerHTML =
        '<a class="skip" href="#main">Skip to content</a>' +
        '<div class="concept"><div class="wrap"><span><strong>Concept preview</strong> for Nikon South Africa by Cat\'s Creations. Bookings and payments are simulated.</span>' +
        '<a href="' + ROOT + 'proposal/">Read the proposal</a><a href="' + ROOT + 'manage/">See the admin dashboard</a></div></div>' +
        '<header class="site-head"><div class="wrap">' +
        '<a class="brand" href="' + ROOT + '"><img src="' + ROOT + 'images/logo.png" alt="Nikon School" width="52" height="52"><span>South<br>Africa</span></a>' +
        '<nav class="nav" id="nav" aria-label="Main">' +
        navLink("workshops/", "Workshops", "workshops") +
        '<a href="' + ROOT + 'workshops/lightcraft-fundamentals/">Free intro class</a>' +
        navLink("creators/", "Ambassadors & Creators", "creators") +
        '<a href="' + ROOT + '#faq">FAQ</a>' +
        "</nav>" +
        '<div class="head-actions">' +
        '<a class="icon-btn" href="' + ROOT + '#my-bookings" id="my-bookings-btn" aria-label="My bookings">' + I.ticket + (bookings.length ? '<span class="dot">' + bookings.length + "</span>" : "") + "</a>" +
        '<a class="btn btn-yellow" href="' + ROOT + 'workshops/lightcraft-fundamentals/">Book free class</a>' +
        '<button class="icon-btn menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav">' + I.menu + "</button>" +
        "</div></div></header>";
      $("#menu-btn").addEventListener("click", function () {
        var nav = $("#nav");
        var open = nav.classList.toggle("open");
        this.setAttribute("aria-expanded", open);
      });
      $("#my-bookings-btn").addEventListener("click", function (e) {
        e.preventDefault();
        showMyBookings();
      });
    }

    var foot = $("#site-footer");
    if (foot) {
      foot.outerHTML =
        '<footer class="site-foot"><div class="wrap"><div class="foot-grid">' +
        '<div><a class="brand" href="' + ROOT + '"><img src="' + ROOT + 'images/logo.png" alt="Nikon School" width="52" height="52"></a>' +
        '<p style="margin-top:16px;max-width:320px">Hands-on photography and video workshops from Nikon South Africa, taught by the people who shoot for a living.</p>' +
        '<div class="socials">' +
        '<a href="https://www.instagram.com/_nikonsouthafrica/" aria-label="Instagram">' + I.ig + "</a>" +
        '<a href="https://www.facebook.com/nikonsouthafrica" aria-label="Facebook">' + I.fb + "</a>" +
        '<a href="https://www.youtube.com/@Nikon_SA" aria-label="YouTube">' + I.yt + "</a>" +
        '<a href="https://www.tiktok.com/@nikonschoolsa" aria-label="TikTok">' + I.tt + "</a>" +
        '<a href="https://za.pinterest.com/nikonsouthafrica/" aria-label="Pinterest">' + I.pt + "</a>" +
        "</div></div>" +
        '<div><h4>Learn</h4><ul><li><a href="' + ROOT + 'workshops/lightcraft-fundamentals/">Free intro class</a></li><li><a href="' + ROOT + 'workshops/?type=free">Free workshops</a></li><li><a href="' + ROOT + 'workshops/?type=paid">Paid workshops</a></li><li><a href="' + ROOT + 'workshops/?format=Online">Online classes</a></li></ul></div>' +
        '<div><h4>People</h4><ul><li><a href="' + ROOT + 'creators/?role=ambassador">Ambassadors</a></li><li><a href="' + ROOT + 'creators/?role=host">Workshop hosts</a></li><li><a href="' + ROOT + 'creators/?role=creator">Creators</a></li></ul></div>' +
        '<div><h4>Help</h4><ul><li><a href="' + ROOT + '#faq">FAQ</a></li><li><a href="#" data-demo>Contact us</a></li><li><a href="#" data-demo>Gift vouchers</a></li><li><a href="#" data-demo>Terms and refunds</a></li></ul></div>' +
        "</div>" +
        '<div class="foot-base"><span>&copy; 2026 Nikon South Africa. Concept design by <a href="https://catscreations.co.za" style="color:#fff">Cat\'s Creations</a>.</span>' +
        '<div class="pay-icons" aria-label="Payment methods"><span>VISA</span><span>Mastercard</span><span>Instant EFT</span><span>Apple Pay</span><span>Scan to Pay</span></div></div>' +
        "</div></footer>" +
        '<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="scrim" data-close></div><div class="sheet" id="sheet"></div></div>' +
        '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
    }

    document.addEventListener("click", function (e) {
      var demo = e.target.closest("[data-demo]");
      if (demo) { e.preventDefault(); mockupNotice(demo.getAttribute("aria-label") || demo.textContent.trim()); }
    });
  }

  function mockupNotice(label) {
    openModal('<div class="sheet-body mockup-pop">' +
      '<button class="close" data-close aria-label="Close">&times;</button>' +
      '<div class="mockup-ico">' + I.camera + "</div>" +
      '<h2 id="modal-title">This is a mockup</h2>' +
      "<p>In the live site, <b>" + esc(label) + "</b> opens its own page. This preview focuses on the workshops, the booking flow, the creator pages and the dashboard.</p>" +
      '<div class="mockup-actions"><button class="btn btn-dark" data-close>Got it</button><a class="btn btn-ghost" href="' + ROOT + 'proposal/">Read the proposal</a></div>' +
      "</div>");
  }

  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    if (!t) return;
    t.innerHTML = I.check + "<span>" + esc(msg) + "</span>";
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  function copy(text, msg) {
    var done = function () { toast(msg || "Link copied"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }

  /* ---------- cards ---------- */
  function workshopCard(w, ref) {
    var s = nextSession(w);
    var left = seatsLeft(s);
    var pct = Math.round((s.taken / s.seats) * 100);
    var h = person(w.host);
    var low = left > 0 && left <= 4;
    return '<a class="card" href="' + wsUrl(w, ref) + '">' +
      '<div class="art-box">' + window.nsArt(w.art) +
      '<div class="tags">' + (w.price === 0 ? '<span class="badge badge-free">Free</span>' : '<span class="badge badge-dark">' + esc(w.format === "Trip" ? "Experience" : "Workshop") + "</span>") +
      '<span class="badge">' + esc(w.level) + "</span>" + (w.sample ? '<span class="badge badge-sample">Sample</span>' : "") + "</div>" +
      '<span class="price-tag' + (w.price === 0 ? " free" : "") + '">' + money(w.price) + "</span></div>" +
      '<div class="body"><h3>' + esc(w.title) + "</h3>" +
      '<div class="host">' + avatar(h, 28) + "<span>" + esc(h.name) + "</span></div>" +
      '<div class="meta"><span>' + I.cal + esc(dt(s.date).long) + "</span><span>" + I.pin + esc(s.city) + "</span><span>" + I.clock + esc(w.duration) + "</span></div>" +
      '<div class="foot"><div class="seats' + (low ? " low" : "") + '">' + (left === 0 ? "Fully booked" : left + " of " + s.seats + " seats left") + '<div class="bar"><i style="width:' + pct + '%"></i></div></div>' +
      '<span class="btn btn-sm ' + (w.price === 0 ? "btn-yellow" : "btn-dark") + '">' + (w.price === 0 ? "Reserve" : "Book") + "</span></div>" +
      "</div></a>";
  }

  function personCard(p) {
    return '<a class="person" href="' + pUrl(p) + '">' + art(p.art) +
      (p.sample ? '<span class="badge badge-sample sample">Sample</span>' : "") +
      '<div class="body"><span class="badge ' + (p.role === "ambassador" ? "badge-free" : "badge-dark") + '">' + roleLabel(p.role) + "</span>" +
      "<h3>" + esc(p.name) + "</h3><p>" + esc(p.specialty) + "</p></div></a>";
  }

  /* ---------- home ---------- */
  function pageHome() {
    var lc = workshop("lightcraft-fundamentals");
    var s = nextSession(lc);
    var nc = $("#next-card");
    if (nc) {
      nc.innerHTML = art("lightcraft") +
        '<div class="body"><div class="row"><span class="badge badge-free">Free class</span><span class="meta">' + seatsLeft(s) + " seats left</span></div>" +
        "<h3>" + esc(lc.title) + '</h3><div class="meta">' + esc(dt(s.date).long) + " at " + s.time + " &middot; " + esc(s.city) + "</div>" +
        '<div class="countdown" id="countdown" aria-label="Time until class"></div>' +
        '<a class="btn btn-yellow btn-block" href="' + wsUrl(lc) + '">Reserve my free seat ' + I.arrow + "</a></div>";
      startCountdown(s);
    }

    var feat = $("#feature-sessions");
    if (feat) {
      $("#feature-art").innerHTML = window.nsArt("lightcraft");
      var picked = s.id;
      feat.innerHTML = lc.sessions.map(function (x) {
        return '<button class="session-pill" aria-pressed="' + (x.id === picked) + '" data-id="' + x.id + '">' + esc(dt(x.date).long) + "<small>" + esc(x.city) + " &middot; " + seatsLeft(x) + " left</small></button>";
      }).join("");
      feat.addEventListener("click", function (e) {
        var b = e.target.closest(".session-pill");
        if (!b) return;
        picked = b.getAttribute("data-id");
        $$(".session-pill", feat).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      });
      $("#feature-book").addEventListener("click", function () { openBooking(lc, picked, 1); });
      $("#feature-learn").innerHTML = lc.learn.slice(0, 4).map(function (l) { return "<li>" + I.check + "<span>" + esc(l) + "</span></li>"; }).join("");
    }

    var grid = $("#home-grid");
    if (grid) {
      var filter = "all";
      var draw = function () {
        var list = D.workshops.filter(function (w) {
          if (filter === "free") return w.price === 0;
          if (filter === "paid") return w.price > 0;
          if (filter === "online") return w.sessions.some(function (x) { return x.city === "Online"; });
          return !w.sample;
        }).slice(0, 6);
        grid.innerHTML = list.map(function (w) { return workshopCard(w); }).join("");
      };
      $("#home-filters").addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        filter = b.getAttribute("data-f");
        $$(".chip", this).forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
        draw();
      });
      draw();
    }

    var ppl = $("#home-people");
    if (ppl) ppl.innerHTML = D.people.filter(function (p) { return p.role !== "team"; }).slice(0, 4).map(personCard).join("");

    renderFaq();
    var nl = $("#newsletter");
    if (nl) nl.addEventListener("submit", function (e) { e.preventDefault(); nl.reset(); toast("You're on the list. New dates land in your inbox first."); });
    if (location.hash === "#my-bookings") showMyBookings();
  }

  function startCountdown(s) {
    var box = $("#countdown");
    var target = new Date(dt(s.date).d);
    var t = s.time.split(":");
    target.setHours(+t[0], +t[1]);
    function tick() {
      var ms = Math.max(0, target - new Date());
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, sec = Math.floor(ms / 1e3) % 60;
      box.innerHTML = [[d, "days"], [h, "hrs"], [m, "min"], [sec, "sec"]].map(function (x) { return "<div><b>" + String(x[0]).padStart(2, "0") + "</b><small>" + x[1] + "</small></div>"; }).join("");
    }
    tick();
    setInterval(tick, 1000);
  }

  function renderFaq() {
    var f = $("#faq-list");
    if (f) f.innerHTML = D.faqs.map(function (q, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>"; }).join("");
  }

  /* ---------- workshops list ---------- */
  function pageWorkshops() {
    var params = new URLSearchParams(location.search);
    var state = { type: params.get("type") || "all", city: params.get("city") || "all", level: params.get("level") || "all", format: params.get("format") || "all", sort: "date" };
    var cities = [], levels = [];
    D.workshops.forEach(function (w) {
      w.sessions.forEach(function (s) { if (cities.indexOf(s.city) < 0) cities.push(s.city); });
      if (levels.indexOf(w.level) < 0) levels.push(w.level);
    });
    var cSel = $("#f-city"), lSel = $("#f-level");
    cSel.innerHTML = '<option value="all">All cities</option>' + cities.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("");
    lSel.innerHTML = '<option value="all">All levels</option>' + levels.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("");
    if (state.format === "Online") state.city = "Online";
    cSel.value = state.city; lSel.value = state.level;
    $$("#f-type .chip").forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-f") === state.type); });

    function draw() {
      var list = D.workshops.filter(function (w) {
        if (state.type === "free" && w.price > 0) return false;
        if (state.type === "paid" && w.price === 0) return false;
        if (state.level !== "all" && w.level !== state.level) return false;
        if (state.city !== "all" && !w.sessions.some(function (s) { return s.city === state.city; })) return false;
        return true;
      });
      list.sort(function (a, b) {
        if (state.sort === "price") return a.price - b.price;
        return nextSession(a).date < nextSession(b).date ? -1 : 1;
      });
      $("#count").textContent = list.length + (list.length === 1 ? " workshop" : " workshops");
      $("#ws-grid").innerHTML = list.length ? list.map(function (w) { return workshopCard(w); }).join("") : '<div class="empty" style="grid-column:1/-1">No workshops match those filters yet. <a href="#" id="reset">Clear filters</a></div>';
      var r = $("#reset");
      if (r) r.addEventListener("click", function (e) { e.preventDefault(); state.type = state.city = state.level = "all"; cSel.value = lSel.value = "all"; $$("#f-type .chip").forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-f") === "all"); }); draw(); });
    }
    $("#f-type").addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state.type = b.getAttribute("data-f");
      $$(".chip", this).forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
      draw();
    });
    cSel.addEventListener("change", function () { state.city = this.value; draw(); });
    lSel.addEventListener("change", function () { state.level = this.value; draw(); });
    $("#f-sort").addEventListener("change", function () { state.sort = this.value; draw(); });
    draw();
  }

  /* ---------- workshop detail ---------- */
  function pageWorkshop() {
    var w = workshop(SLUG);
    var h = person(w.host);
    var ref = new URLSearchParams(location.search).get("ref");
    var refP = ref && person(ref);
    document.title = w.short + " | Nikon School South Africa";
    var picked = nextSession(w).id;
    var qty = 1;

    var related = D.workshops.filter(function (x) { return x.slug !== w.slug && !x.sample && (w.price === 0 ? x.price > 0 : true); }).slice(0, 3);

    $("#main").innerHTML =
      '<div class="wrap detail-hero"><div class="crumbs"><a href="' + ROOT + '">Home</a> / <a href="' + ROOT + 'workshops/">Workshops</a> / ' + esc(w.short) + "</div>" + art(w.art) + "</div>" +
      '<div class="wrap detail-grid"><div>' +
      '<div class="chips">' + (w.price === 0 ? '<span class="badge badge-free">Free workshop</span>' : '<span class="badge badge-dark">Paid workshop</span>') + (w.sample ? '<span class="badge badge-sample">Sample listing</span>' : "") + "</div>" +
      '<h1 style="margin-top:16px">' + esc(w.title) + "</h1>" +
      '<p class="lede">' + esc(w.summary) + "</p>" +
      '<div class="facts"><span class="fact">' + I.level + esc(w.level) + '</span><span class="fact">' + I.clock + esc(w.duration) + '</span><span class="fact">' + I.users + "Max " + w.groupSize + ' people</span><span class="fact">' + I.camera + esc(w.format) + "</span></div>" +
      '<div class="block"><h2>What you\'ll learn</h2><ul class="ticks">' + w.learn.map(function (l) { return "<li>" + I.check + "<span>" + esc(l) + "</span></li>"; }).join("") + "</ul></div>" +
      '<div class="block"><h2>On the day</h2><ul class="timeline">' + w.schedule.map(function (s) { return "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>"; }).join("") + "</ul></div>" +
      '<div class="block"><h2>What to bring</h2><ul class="ticks">' + w.bring.map(function (l) { return "<li>" + I.check + "<span>" + esc(l) + "</span></li>"; }).join("") + "</ul></div>" +
      '<div class="block"><h2>Your host</h2><a class="host-card" href="' + pUrl(h) + '">' + avatar(h) + '<div><span class="badge ' + (h.role === "ambassador" ? "badge-free" : "badge-dark") + '">' + roleLabel(h.role) + "</span><h3 style=\"margin-top:8px\">" + esc(h.name) + "</h3><p>" + esc(h.specialty) + " &middot; View profile &rarr;</p></div></a></div>" +
      "</div>" +
      '<aside class="book-card" aria-label="Book this workshop">' +
      (refP ? '<div class="ref-note">' + avatar(refP, 28) + "<span>You're booking through <b>" + esc(refP.name) + "</b>'s link.</span></div>" : "") +
      '<div class="price">' + money(w.price) + (w.price ? " <small>per person</small>" : " <small>for Nikon owners</small>") + "</div>" +
      '<div class="sessions" role="radiogroup" aria-label="Choose a date" id="sessions"></div>' +
      '<div class="qty"><span class="lbl" style="margin:0">Seats</span><div class="stepper"><button type="button" id="minus" aria-label="Fewer seats">&minus;</button><output id="qty">1</output><button type="button" id="plus" aria-label="More seats">+</button></div></div>' +
      (w.price ? '<div class="book-total"><span>Total</span><span id="total"></span></div>' : "") +
      '<button class="btn ' + (w.price ? "btn-dark" : "btn-yellow") + ' btn-block" id="book">' + (w.price ? "Book and pay" : "Reserve my free seat") + "</button>" +
      '<div class="assure"><span>' + I.shield + (w.price ? "Secure checkout, card or instant EFT" : "No payment needed") + "</span><span>" + I.check + "Free date change up to 72 hours before</span><span>" + I.cal + "Calendar invite and reminders by email</span></div>" +
      "</aside></div>" +
      '<section class="cream"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + (w.price === 0 ? "Your next step" : "You might also like") + "</div><h2>" + (w.price === 0 ? "Ready to go further?" : "More workshops") + "</h2></div>" +
      '<a class="btn btn-ghost" href="' + ROOT + 'workshops/">All workshops</a></div><div class="grid">' + related.map(function (x) { return workshopCard(x); }).join("") + "</div></div></section>";

    function drawSessions() {
      $("#sessions").innerHTML = w.sessions.map(function (s) {
        var d = dt(s.date), left = seatsLeft(s);
        return '<button type="button" class="session" role="radio" aria-checked="' + (s.id === picked) + '" data-id="' + s.id + '"' + (left === 0 ? " disabled" : "") + ">" +
          '<span class="cal"><small>' + d.mon + "</small><b>" + d.day + "</b></span>" +
          '<span class="info"><b>' + d.dow + " at " + s.time + "</b><span>" + esc(s.city) + "</span></span>" +
          '<span class="left' + (left === 0 ? " full" : left <= 4 ? " low" : "") + '">' + (left === 0 ? "Full" : left + " left") + "</span></button>";
      }).join("");
    }
    function drawTotal() {
      $("#qty").textContent = qty;
      var t = $("#total");
      if (t) t.textContent = money(w.price * qty);
    }
    drawSessions(); drawTotal();
    $("#sessions").addEventListener("click", function (e) {
      var b = e.target.closest(".session");
      if (!b || b.disabled) return;
      picked = b.getAttribute("data-id");
      drawSessions();
    });
    $("#minus").addEventListener("click", function () { qty = Math.max(1, qty - 1); drawTotal(); });
    $("#plus").addEventListener("click", function () {
      var s = w.sessions.filter(function (x) { return x.id === picked; })[0];
      qty = Math.min(Math.min(4, seatsLeft(s)), qty + 1);
      drawTotal();
    });
    $("#book").addEventListener("click", function () { openBooking(w, picked, qty, ref); });
  }

  /* ---------- booking modal ---------- */
  var modalReturn;
  function openModal(html) {
    modalReturn = document.activeElement;
    $("#sheet").innerHTML = html;
    $("#modal").classList.add("open");
    document.body.style.overflow = "hidden";
    var f = $("#sheet").querySelector("input, button:not(.close), select");
    if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function closeModal() {
    $("#modal").classList.remove("open");
    document.body.style.overflow = "";
    if (modalReturn) modalReturn.focus();
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("#modal") && $("#modal").classList.contains("open")) closeModal(); });
  document.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(); });

  function sheetHead(title, step, total) {
    return '<div class="sheet-head"><h2 id="modal-title">' + title + '</h2><button class="close" data-close aria-label="Close">&times;</button></div><div class="sheet-body">' +
      (total ? '<div class="steps-ind" aria-hidden="true">' + Array.apply(null, Array(total)).map(function (_, i) { return '<i class="' + (i < step ? "on" : "") + '"></i>'; }).join("") + "</div>" : "");
  }

  function openBooking(w, sessionId, qty, ref) {
    var s = w.sessions.filter(function (x) { return x.id === sessionId; })[0];
    var paid = w.price > 0;
    var steps = paid ? 3 : 2;
    var d = dt(s.date);
    var summary = '<div class="summary">' + art(w.art) + "<div><b>" + esc(w.short) + "</b><span>" + esc(d.long) + " at " + s.time + " &middot; " + esc(s.city) + " &middot; " + qty + (qty > 1 ? " seats" : " seat") + "</span></div></div>";
    var models = ["Nikon Z8", "Nikon Z6III", "Nikon Z5II", "Nikon Zf", "Nikon Z50II", "Nikon Z fc", "Nikon Z30", "Nikon D-series DSLR", "Nikon Coolpix", "I don't own a Nikon yet"];

    openModal(sheetHead(paid ? "Book your seat" : "Reserve your free seat", 1, steps) + summary +
      '<form id="details" class="form-grid" novalidate>' +
      '<div><label class="lbl" for="fn">First name</label><input class="inp" id="fn" required autocomplete="given-name"></div>' +
      '<div><label class="lbl" for="ln">Surname</label><input class="inp" id="ln" required autocomplete="family-name"></div>' +
      '<div class="full"><label class="lbl" for="em">Email</label><input class="inp" id="em" type="email" required autocomplete="email"></div>' +
      '<div><label class="lbl" for="ph">Mobile</label><input class="inp" id="ph" type="tel" autocomplete="tel" placeholder="082 000 0000"></div>' +
      '<div><label class="lbl" for="cam">Your camera</label><select class="inp" id="cam">' + models.map(function (m) { return "<option>" + m + "</option>"; }).join("") + "</select></div>" +
      '<div class="full"><label class="check"><input type="checkbox" checked> Send me new workshop dates and Nikon School news</label></div>' +
      '<div class="full" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ' + (paid ? "btn-dark" : "btn-yellow") + '" type="submit" style="flex:1">' + (paid ? "Continue to payment" : "Confirm my free seat") + ' </button><button class="btn btn-ghost" type="button" id="prefill">Fill demo details</button></div>' +
      "</form>");

    $("#prefill").addEventListener("click", function () {
      $("#fn").value = "Thandi"; $("#ln").value = "Khumalo"; $("#em").value = "thandi@example.co.za"; $("#ph").value = "082 555 0199"; $("#cam").value = "Nikon Z50II";
    });
    $("#details").addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = ["#fn", "#ln", "#em"].filter(function (id) { var el = $(id); return !el.value.trim() || (el.type === "email" && !/.+@.+\..+/.test(el.value)); });
      if (bad.length) {
        bad.forEach(function (id) { $(id).style.borderColor = "#c8332b"; });
        $(bad[0]).focus();
        toast("Please fill in your name and a valid email. Or tap Fill demo details.");
        return;
      }
      var who = { first: $("#fn").value.trim(), email: $("#em").value.trim(), camera: $("#cam").value };
      if (paid) payStep(w, s, qty, ref, who, summary, steps); else finish(w, s, qty, ref, who, null);
    });
  }

  function payStep(w, s, qty, ref, who, summary, steps) {
    var method = "card";
    var total = w.price * qty;
    var methods = [
      ["card", I.card, "Card", "Visa, Mastercard, Apple Pay"],
      ["eft", I.bank, "Instant EFT", "Pay straight from your bank app"],
      ["qr", I.qr, "Scan to Pay", "SnapScan, Zapper and banking app QR"]
    ];
    $("#sheet").innerHTML = sheetHead("Payment", 2, steps) + summary +
      '<div class="lines"><div><span>' + esc(w.short) + " &times; " + qty + "</span><span>" + money(total) + '</span></div><div><span>Booking fee</span><span>R 0</span></div><div class="total"><span>Total</span><span>' + money(total) + "</span></div></div>" +
      '<div class="pay-methods" role="radiogroup" aria-label="Payment method" id="methods">' + methods.map(function (m) {
        return '<button type="button" class="pay-method" role="radio" aria-checked="' + (m[0] === method) + '" data-m="' + m[0] + '"><span class="ico">' + m[1] + "</span><span><b>" + m[2] + "</b><span>" + m[3] + "</span></span></button>";
      }).join("") + "</div>" +
      '<button class="btn btn-dark btn-block" id="pay">' + I.lock + " Pay " + money(total) + " securely</button>" +
      '<p class="demo-note"><b>Demo mode.</b> No payment is taken and no card details are collected. In the live build this hands over to the payment gateway\'s own secure page, then returns here.</p>' +
      '<button class="btn btn-ghost btn-sm" id="back" style="margin-top:8px">&larr; Back</button>';
    $("#methods").addEventListener("click", function (e) {
      var b = e.target.closest(".pay-method");
      if (!b) return;
      method = b.getAttribute("data-m");
      $$(".pay-method", this).forEach(function (x) { x.setAttribute("aria-checked", x === b); });
    });
    $("#back").addEventListener("click", function () { openBooking(w, s.id, qty, ref); });
    $("#pay").addEventListener("click", function () {
      $("#sheet").innerHTML = sheetHead("Payment", 3, steps) + '<div class="processing"><div class="spinner"></div><b>Talking to the payment gateway&hellip;</b><p style="color:var(--muted);margin-top:6px">Demo only, nothing is being charged.</p></div></div>';
      setTimeout(function () { finish(w, s, qty, ref, who, method); }, 1800);
    });
  }

  function finish(w, s, qty, ref, who, method) {
    var refCode = "NS-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    var d = dt(s.date);
    var list = store("ns-bookings") || [];
    list.push({ ref: refCode, slug: w.slug, session: s.id, qty: qty });
    store("ns-bookings", list);
    var dot = $("#my-bookings-btn .dot");
    if (dot) dot.textContent = list.length;
    else if ($("#my-bookings-btn")) $("#my-bookings-btn").insertAdjacentHTML("beforeend", '<span class="dot">' + list.length + "</span>");

    var next = w.price === 0
      ? D.workshops.filter(function (x) { return x.price > 0 && !x.sample; })[0]
      : D.workshops.filter(function (x) { return x.price > 0 && x.slug !== w.slug && !x.sample; })[0];
    var refP = ref && person(ref);
    var steps = w.price ? 3 : 2;
    $("#sheet").innerHTML = sheetHead("You're booked", steps, steps) +
      '<div class="success"><div class="tick">' + I.check + "</div>" +
      "<h2>See you there, " + esc(who.first) + "!</h2>" +
      '<p style="color:var(--muted)">We sent your confirmation and a calendar invite to <b>' + esc(who.email) + "</b>.</p>" +
      '<div class="ticket"><span class="ref">' + refCode + "</span><b>" + esc(w.title) + "</b><span>" + esc(d.long) + " at " + s.time + "</span><span>" + esc(s.venue) + "</span>" +
      "<span>" + qty + (qty > 1 ? " seats" : " seat") + " &middot; " + (w.price ? "Paid " + money(w.price * qty) + " by " + { card: "card", eft: "instant EFT", qr: "QR" }[method] : "Free") + "</span>" +
      (refP ? '<span style="color:var(--muted)">Credited to ' + esc(refP.name) + "'s link</span>" : "") + "</div>" +
      (next ? '<a class="upsell" href="' + wsUrl(next) + '">' + art(next.art) + "<div><small>" + (w.price === 0 ? "Your next step" : "Keep going") + "</small><b>" + esc(next.title) + "</b><span>" + money(next.price) + " &middot; " + esc(dt(nextSession(next).date).long) + "</span></div></a>" : "") +
      '<div style="display:flex;gap:10px;margin-top:16px"><button class="btn btn-ghost btn-sm" style="flex:1" id="add-cal">' + I.cal + ' Add to calendar</button><button class="btn btn-dark btn-sm" style="flex:1" data-close>Done</button></div>' +
      "</div></div>";
    $("#add-cal").addEventListener("click", function () { toast("Calendar invite downloaded (demo)"); });
  }

  function showMyBookings() {
    var list = store("ns-bookings") || [];
    var body = list.length
      ? list.map(function (b) {
        var w = workshop(b.slug);
        var s = w && w.sessions.filter(function (x) { return x.id === b.session; })[0];
        if (!w || !s) return "";
        return '<div class="summary">' + art(w.art) + "<div><b>" + esc(w.short) + "</b><span>" + esc(dt(s.date).long) + " &middot; " + esc(s.city) + " &middot; " + b.ref + "</span></div></div>";
      }).join("")
      : '<p style="color:var(--muted)">No bookings yet. Start with the free LightCraft class.</p><a class="btn btn-yellow" href="' + ROOT + 'workshops/lightcraft-fundamentals/">Book free class</a>';
    openModal(sheetHead("My bookings") + body + "</div>");
  }

  /* ---------- people ---------- */
  function pageCreators() {
    var role = new URLSearchParams(location.search).get("role") || "all";
    function draw() {
      var list = D.people.filter(function (p) { return role === "all" || p.role === role; });
      $("#people-grid").innerHTML = list.map(personCard).join("");
      $$("#role-tabs .chip").forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-r") === role); });
    }
    $("#role-tabs").addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      role = b.getAttribute("data-r");
      history.replaceState(null, "", role === "all" ? location.pathname : "?role=" + role);
      draw();
    });
    draw();
  }

  function pageCreator() {
    var p = person(SLUG);
    document.title = p.name + " | Nikon School South Africa";
    var theirs = D.workshops.filter(function (w) { return w.host === p.slug; });
    var others = theirs.length ? [] : D.workshops.filter(function (w) { return !w.sample; }).slice(0, 3);
    var liveLink = LIVE_DOMAIN + "/creators/" + p.slug;
    var socials = Object.keys(p.socials || {}).map(function (k) {
      var url = p.socials[k], icon = { instagram: I.ig, youtube: I.yt, tiktok: I.tt }[k] || I.link;
      if (/^https?:/.test(url)) return '<a href="' + esc(url) + '" target="_blank" rel="noopener" aria-label="' + esc(p.name) + "'s " + k + '">' + icon + "</a>";
      return '<a href="#" data-demo aria-label="' + k + '">' + icon + "</a>";
    }).join("");
    var gallery = [p.art, p.art, p.art, p.art].map(function (a, i) { return art(i === 0 ? a : ["lightcraft", "cityscape", "seeing", "masterclass", "wildlife", "astro", "portrait", "sport", "flash", "surf", "auto", "ocean"][(p.slug.length + i * 3) % 12]); }).join("");

    $("#main").innerHTML =
      '<section class="profile-hero dark">' + art(p.art) + '<div class="wrap">' +
      '<div class="crumbs"><a href="' + ROOT + '">Home</a> / <a href="' + ROOT + 'creators/">Ambassadors & Creators</a> / ' + esc(p.name) + "</div>" +
      '<div class="profile-id">' + avatar(p) + '<div><span class="badge ' + (p.role === "ambassador" ? "badge-free" : "") + '">' + roleLabel(p.role) + "</span>" + (p.sample ? ' <span class="badge badge-sample">Sample profile</span>' : "") + "</div></div>" +
      "<h1>" + esc(p.name) + '</h1><p class="lede">' + esc(p.specialty) + " &middot; " + esc(p.city) + "</p>" +
      '<div class="share-row">' +
      (theirs.length ? '<a class="btn btn-yellow" href="#their-workshops">Book with ' + esc(p.name.split(" ")[0]) + " " + I.arrow + "</a>" : '<a class="btn btn-yellow" href="' + ROOT + 'workshops/">Browse workshops</a>') +
      '<span class="link-box">' + I.link + "<code>" + esc(liveLink) + '</code><button class="btn btn-sm btn-yellow" id="copy-link">Copy link</button></span>' +
      "</div></div></section>" +
      '<section><div class="wrap profile-grid"><div>' +
      '<div class="eyebrow">About</div><h2>Meet ' + esc(p.name.split(" ")[0]) + "</h2><p class=\"lede\">" + esc(p.bio) + "</p>" +
      '<div class="block"><h2>Known for</h2><ul class="ticks">' + p.highlights.map(function (h) { return "<li>" + I.check + "<span>" + esc(h) + "</span></li>"; }).join("") + "</ul></div>" +
      '<div class="block"><h2>Portfolio</h2><div class="gallery">' + gallery + "</div>" +
      '<p class="placeholder-note">Illustrations stand in for portfolio images. Nikon uploads the real photos through the dashboard.</p></div>' +
      "</div>" +
      '<aside class="side-card"><dl>' +
      "<div><dt>Role</dt><dd>" + roleLabel(p.role) + "</dd></div>" +
      "<div><dt>Based in</dt><dd>" + esc(p.city) + "</dd></div>" +
      (p.gear ? "<div><dt>Shoots with</dt><dd>" + esc(p.gear) + "</dd></div>" : "") +
      (p.socials && /^https?:/.test(p.socials.website || "") ? '<div><dt>Website</dt><dd><a href="' + esc(p.socials.website) + '" target="_blank" rel="noopener">' + esc(p.socials.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) + "</a></dd></div>" : "") +
      "<div><dt>Workshops</dt><dd>" + (theirs.length ? theirs.length + " upcoming" : "None scheduled yet") + "</dd></div>" +
      "<div><dt>Follow</dt><dd><div class=\"socials\" style=\"margin-top:6px\">" + socials + "</div></dd></div>" +
      "</dl>" +
      '<hr style="border:0;border-top:1px solid var(--line);margin:20px 0">' +
      '<p style="font-size:.88rem;color:var(--muted);margin-bottom:12px">Share this page in an ad or bio. Bookings that come through this link are credited to ' + esc(p.name.split(" ")[0]) + ".</p>" +
      '<button class="btn btn-dark btn-block btn-sm" id="share">' + I.share + " Share profile</button></aside>" +
      "</div></section>" +
      '<section class="cream" id="their-workshops"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">' + (theirs.length ? "Learn with " + esc(p.name.split(" ")[0]) : "Workshops") + "</div><h2>" + (theirs.length ? "Upcoming workshops" : "Explore Nikon School") + "</h2></div></div>" +
      '<div class="grid">' + (theirs.length ? theirs : others).map(function (w) { return workshopCard(w, p.slug); }).join("") + "</div></div></section>";

    var demoUrl = location.origin + location.pathname;
    $("#copy-link").addEventListener("click", function () { copy(demoUrl, "Profile link copied"); });
    $("#share").addEventListener("click", function () {
      if (navigator.share) navigator.share({ title: p.name + " | Nikon School", url: demoUrl }).catch(function () {});
      else copy(demoUrl, "Profile link copied");
    });
  }

  /* ---------- boot ---------- */
  renderLayout();
  ({ home: pageHome, workshops: pageWorkshops, workshop: pageWorkshop, creators: pageCreators, creator: pageCreator }[PAGE] || function () {})();
  window.NS = { I: I, art: art, avatar: avatar, money: money, dt: dt, person: person, workshop: workshop, seatsLeft: seatsLeft, nextSession: nextSession, toast: toast, copy: copy, esc: esc, roleLabel: roleLabel, ROOT: ROOT, LIVE_DOMAIN: LIVE_DOMAIN, openModal: openModal, closeModal: closeModal };
})();
