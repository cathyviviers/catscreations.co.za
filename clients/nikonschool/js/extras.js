/* Nikon School SA concept: finishing touches.
   Aperture intro, search palette, autofocus cursor, scroll reveals and progress,
   booking confetti, sticky mobile booking bar and back-to-top. */
(function () {
  var D = window.NS_DATA, N = window.NS;
  if (!D || !N) return;
  var ROOT = N.ROOT, esc = N.esc;
  var PAGE = document.body.getAttribute("data-page");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- aperture intro (home, once per visit) ---------- */
  function intro() {
    if (PAGE !== "home" || reduce || store("ns-intro")) return;
    store("ns-intro", "1");
    var el = document.createElement("div");
    el.className = "intro";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="intro-mark"><div class="intro-iris">' + window.nsArt("lightcraft") + '</div><img src="' + ROOT + 'images/logo.png" alt="" width="84" height="84"></div>';
    document.body.appendChild(el);
    var done = function () { if (el.parentNode) el.parentNode.removeChild(el); };
    el.addEventListener("click", done);
    setTimeout(done, 2100);
  }

  /* ---------- reading progress ---------- */
  function progress() {
    if (PAGE === "manage") return;
    var bar = document.createElement("div");
    bar.className = "progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var raf = 0;
    function draw() {
      raf = 0;
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
    }
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
    draw();
  }

  /* ---------- scroll reveals ---------- */
  function reveals() {
    if (reduce || !("IntersectionObserver" in window) || PAGE === "manage") return;
    var targets = $$(".sec-head, .step, .grid > .card, .people > .person, .feature, .owner-item, .faq details, .fcard, .compare > div, .funnel > div, .sitemap > div, .tech > div, .phase, .block, .values > div, .newsletter > *");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92) return; // already on screen: leave as is
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
      io.observe(el);
      el.addEventListener("transitionend", function clear(e) {
        if (e.propertyName !== "opacity") return;
        el.style.transitionDelay = "";
        el.removeEventListener("transitionend", clear);
      });
    });
  }

  /* ---------- search palette ---------- */
  var ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>';
  function searchIndex() {
    var items = [];
    D.workshops.forEach(function (w) {
      var s = N.nextSession(w);
      items.push({ type: "Workshop", title: w.title, sub: N.money(w.price) + " · " + N.dt(s.date).long + " · " + s.city, url: ROOT + "workshops/" + w.slug + "/", art: w, hay: (w.title + " " + w.summary + " " + N.person(w.host).name + " " + w.level + " " + s.city).toLowerCase() });
    });
    D.people.forEach(function (p) {
      items.push({ type: N.roleLabel(p.role), title: p.name, sub: p.specialty + " · " + p.city, url: ROOT + "creators/" + p.slug + "/", person: p, hay: (p.name + " " + p.specialty + " " + p.city + " " + p.role).toLowerCase() });
    });
    [["Free intro class", "workshops/lightcraft-fundamentals/", "Start here"], ["All workshops", "workshops/", "Calendar and filters"], ["Ambassadors & creators", "creators/", "Everyone, by role"], ["Proposal", "proposal/", "The thinking behind the redesign"], ["Admin dashboard", "manage/", "What the Nikon team sees"], ["FAQ", "#faq", "Good to know"]].forEach(function (pg) {
      items.push({ type: "Page", title: pg[0], sub: pg[2], url: ROOT + pg[1], hay: (pg[0] + " " + pg[2]).toLowerCase() });
    });
    return items;
  }
  function palette() {
    if (PAGE === "manage") return;
    var items = searchIndex();
    var wrap = document.createElement("div");
    wrap.className = "palette";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-label", "Search Nikon School");
    wrap.hidden = true;
    wrap.innerHTML = '<div class="palette-scrim" data-pclose></div><div class="palette-box">' +
      '<label class="palette-field">' + ICON_SEARCH + '<input type="search" placeholder="Search workshops, ambassadors, creators..." aria-label="Search" autocomplete="off"><kbd>Esc</kbd></label>' +
      '<div class="palette-results" role="listbox"></div>' +
      '<div class="palette-foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span><kbd>/</kbd> or <kbd>Ctrl K</kbd> to search</span></div></div>';
    document.body.appendChild(wrap);
    var input = $("input", wrap), list = $(".palette-results", wrap), active = 0, shown = [], lastFocus;

    function thumb(it) {
      if (it.person) return N.avatar(it.person, 38);
      if (it.art) return N.art(it.art);
      return '<span class="palette-ico">' + ICON_SEARCH + "</span>";
    }
    function draw() {
      var q = input.value.trim().toLowerCase();
      var terms = q.split(/\s+/).filter(Boolean);
      shown = items.filter(function (it) { return terms.every(function (t) { return it.hay.indexOf(t) >= 0; }); });
      if (!q) shown = items.filter(function (it) { return it.type === "Page" || it.type === "Workshop"; }).slice(0, 8);
      shown = shown.slice(0, 12);
      active = Math.min(active, Math.max(0, shown.length - 1));
      list.innerHTML = shown.length ? shown.map(function (it, i) {
        return '<a class="palette-item' + (i === active ? " on" : "") + '" role="option" aria-selected="' + (i === active) + '" href="' + it.url + '" data-i="' + i + '">' +
          '<span class="palette-thumb">' + thumb(it) + "</span><span class=\"palette-text\"><b>" + esc(it.title) + "</b><small>" + esc(it.sub) + '</small></span><span class="palette-type">' + esc(it.type) + "</span></a>";
      }).join("") : '<p class="palette-empty">Nothing matches "' + esc(input.value) + '". Try a name, a city or a style like "wildlife".</p>';
    }
    function open() {
      lastFocus = document.activeElement;
      wrap.hidden = false;
      document.body.style.overflow = "hidden";
      input.value = ""; active = 0; draw();
      requestAnimationFrame(function () { wrap.classList.add("open"); input.focus(); });
    }
    function close() {
      wrap.classList.remove("open");
      document.body.style.overflow = "";
      setTimeout(function () { wrap.hidden = true; }, 180);
      if (lastFocus) lastFocus.focus();
    }
    input.addEventListener("input", function () { active = 0; draw(); });
    wrap.addEventListener("click", function (e) {
      if (e.target.closest("[data-pclose]")) close();
      if (e.target.closest(".palette-item") && e.target.closest(".palette-item").getAttribute("href").indexOf("#") >= 0) close();
    });
    list.addEventListener("mousemove", function (e) {
      var it = e.target.closest(".palette-item");
      if (!it) return;
      var i = +it.getAttribute("data-i");
      if (i !== active) { active = i; $$(".palette-item", list).forEach(function (a, k) { a.classList.toggle("on", k === i); a.setAttribute("aria-selected", k === i); }); }
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        active = (active + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % Math.max(1, shown.length);
        draw();
        var on = $(".palette-item.on", list);
        if (on) on.scrollIntoView({ block: "nearest" });
      }
      if (e.key === "Enter" && shown[active]) { e.preventDefault(); location.href = shown[active].url; if (shown[active].url.indexOf("#") >= 0) close(); }
    });
    document.addEventListener("keydown", function (e) {
      var typing = /input|textarea|select/i.test((e.target.tagName || "")) || e.target.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        if (!wrap.hidden && wrap.classList.contains("open")) return;
        e.preventDefault(); open();
      }
    });
    // Header button and mobile menu entry
    var actions = $(".head-actions");
    if (actions) {
      actions.insertAdjacentHTML("afterbegin", '<button class="icon-btn search-btn" aria-label="Search (press /)" title="Search  /">' + ICON_SEARCH + "</button>");
      $(".search-btn", actions).addEventListener("click", open);
    }
    var nav = $("#nav");
    if (nav) {
      nav.insertAdjacentHTML("beforeend", '<a href="#" class="nav-search">Search</a>');
      $(".nav-search", nav).addEventListener("click", function (e) { e.preventDefault(); nav.classList.remove("open"); open(); });
    }
  }

  /* ---------- autofocus cursor over artwork ---------- */
  function afCursor() {
    if (reduce || !finePointer) return;
    var af = document.createElement("div");
    af.className = "af";
    af.setAttribute("aria-hidden", "true");
    af.innerHTML = "<i></i><i></i><i></i><i></i>";
    document.body.appendChild(af);
    var x = -100, y = -100, tx = -100, ty = -100, on = false, raf = 0;
    function loop() {
      x += (tx - x) * 0.28; y += (ty - y) * 0.28;
      af.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    }
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var over = !!(e.target.closest && e.target.closest(".art-box") && !e.target.closest(".palette, .modal"));
      if (over !== on) { on = over; af.classList.toggle("show", on); if (on) { x = tx = e.clientX; y = ty = e.clientY; } }
      tx = e.clientX; ty = e.clientY;
      if (on && !raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener("pointerdown", function () {
      if (!on) return;
      af.classList.remove("lock"); void af.offsetWidth; af.classList.add("lock");
      setTimeout(function () { af.classList.remove("lock"); }, 520);
    });
    document.documentElement.addEventListener("mouseleave", function () { on = false; af.classList.remove("show"); });
  }

  /* ---------- confetti when a booking is confirmed ---------- */
  function confetti() {
    var sheet = $("#sheet");
    if (!sheet || reduce || !Element.prototype.animate) return;
    new MutationObserver(function () {
      var tick = $(".success .tick", sheet);
      if (!tick || tick._burst) return;
      tick._burst = true;
      var r = tick.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var colours = ["#FFE100", "#FFE100", "#0b0b0c", "#ffffff", "#f5c400"];
      for (var i = 0; i < 34; i++) {
        var p = document.createElement("span");
        p.className = "confetti" + (i % 3 === 0 ? " blade" : "");
        p.style.background = colours[i % colours.length];
        p.style.left = cx + "px"; p.style.top = cy + "px";
        document.body.appendChild(p);
        var a = (Math.PI * 2 * i) / 34 + Math.random() * 0.4, d = 90 + Math.random() * 160;
        var dx = Math.cos(a) * d, dy = Math.sin(a) * d - 40;
        p.animate([
          { transform: "translate(-50%,-50%) rotate(0deg) scale(1)", opacity: 1 },
          { transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) rotate(" + (Math.random() * 540 - 270) + "deg) scale(1)", opacity: 1, offset: 0.6 },
          { transform: "translate(calc(-50% + " + dx * 1.1 + "px), calc(-50% + " + (dy + 120) + "px)) rotate(" + (Math.random() * 720 - 360) + "deg) scale(.6)", opacity: 0 }
        ], { duration: 1300 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = (function (el) { return function () { el.remove(); }; })(p);
      }
    }).observe(sheet, { childList: true, subtree: true });
  }

  /* ---------- sticky booking bar on workshop pages (phones and tablets) ---------- */
  function stickyBook() {
    if (PAGE !== "workshop") return;
    var card = $(".book-card"), btn = $("#book");
    if (!card || !btn) return;
    var w = D.workshops.filter(function (x) { return x.slug === document.body.getAttribute("data-slug"); })[0];
    var bar = document.createElement("div");
    bar.className = "book-bar";
    bar.innerHTML = "<div><b>" + N.money(w.price) + "</b><small>" + esc(w.short) + " &middot; " + esc(N.dt(N.nextSession(w).date).long) + '</small></div><button class="btn ' + (w.price ? "btn-dark" : "btn-yellow") + '">' + (w.price ? "Book now" : "Reserve free") + "</button>";
    document.body.appendChild(bar);
    document.body.classList.add("has-book-bar");
    $("button", bar).addEventListener("click", function () { btn.click(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { bar.classList.toggle("show", !en[0].isIntersecting); }).observe(card);
    }
  }

  /* ---------- back to top ---------- */
  function backToTop() {
    if (PAGE === "manage") return;
    var b = document.createElement("button");
    b.className = "to-top";
    b.setAttribute("aria-label", "Back to top");
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
    document.body.appendChild(b);
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
    window.addEventListener("scroll", function () { b.classList.toggle("show", scrollY > 1400); }, { passive: true });
  }

  intro();
  progress();
  reveals();
  palette();
  afCursor();
  confetti();
  stickyBook();
  backToTop();
})();
