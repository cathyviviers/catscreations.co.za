/* Nikon School SA concept: admin dashboard. All data is generated sample data. */
(function () {
  var D = window.NS_DATA, N = window.NS, I = N.I, esc = N.esc;
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  var icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    ws: I.cal, book: I.ticket, people: I.users, pay: I.card,
    site: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></svg>'
  };
  var views = [
    ["overview", "Overview", icons.home],
    ["workshops", "Workshops", icons.ws],
    ["bookings", "Bookings", icons.book],
    ["people", "People & links", icons.people],
    ["payments", "Payments", icons.pay]
  ];

  /* ---------- sample bookings derived from seat counts ---------- */
  var first = ["Thandi", "Pieter", "Aisha", "Sipho", "Megan", "Kagiso", "Ruan", "Naledi", "Johan", "Zanele", "Liam", "Precious", "Ahmed", "Chantel", "Bongi", "Werner", "Lindiwe", "Ethan", "Palesa", "Riaan"];
  var last = ["Khumalo", "Botha", "Naidoo", "Dlamini", "Smit", "Mokoena", "Pillay", "van der Merwe", "Nkosi", "Jacobs", "Mahlangu", "Fourie", "Moodley", "Ndlovu", "Coetzee"];
  var cams = ["Z50II", "Z6III", "Zf", "Z30", "Z5II", "Z8", "Coolpix P1000", "D7500"];
  var seed = 3;
  function r() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  var bookings = [];
  var creatorSlugs = D.people.filter(function (p) { return p.role !== "team"; }).map(function (p) { return p.slug; });
  D.workshops.forEach(function (w) {
    w.sessions.forEach(function (s) {
      for (var i = 0; i < s.taken; i++) {
        var srcRoll = r();
        var source = srcRoll < 0.35 ? "Website" : srcRoll < 0.55 ? "Instagram ad" : srcRoll < 0.68 ? "Facebook ad" : srcRoll < 0.76 ? "Google" : "Creator link";
        var via = source === "Creator link" ? (r() < 0.6 ? w.host !== "nikon-school-team" ? w.host : creatorSlugs[Math.floor(r() * creatorSlugs.length)] : creatorSlugs[Math.floor(r() * creatorSlugs.length)]) : null;
        var f = first[Math.floor(r() * first.length)], l = last[Math.floor(r() * last.length)];
        var daysAgo = Math.floor(r() * 55);
        var when = new Date(2026, 9, 3 - daysAgo);
        bookings.push({
          ref: "NS-" + (10000 + Math.floor(r() * 89999)).toString(36).toUpperCase(),
          name: f + " " + l,
          email: f.toLowerCase() + "." + l.toLowerCase().replace(/\s/g, "") + "@example.co.za",
          camera: "Nikon " + cams[Math.floor(r() * cams.length)],
          w: w, s: s, amount: w.price, source: source, via: via,
          status: w.price === 0 ? "free" : r() < 0.06 ? "pending" : "paid",
          when: when
        });
      }
    });
  });
  bookings.sort(function (a, b) { return b.when - a.when; });

  var paidBookings = bookings.filter(function (b) { return b.status === "paid"; });
  var revenue = paidBookings.reduce(function (t, b) { return t + b.amount; }, 0);
  var seatsAll = 0, takenAll = 0;
  D.workshops.forEach(function (w) { w.sessions.forEach(function (s) { seatsAll += s.seats; takenAll += s.taken; }); });

  /* ---------- nav ---------- */
  var current = (location.hash || "#overview").slice(1);
  if (!views.some(function (v) { return v[0] === current; })) current = "overview";

  function drawNav() {
    $("#side-nav").innerHTML = views.map(function (v) {
      return '<button data-v="' + v[0] + '"' + (v[0] === current ? ' aria-current="page"' : "") + ">" + v[2] + v[1] + "</button>";
    }).join("") + '<button data-site>' + icons.site + "View website</button>";
    $("#mob-nav").innerHTML = views.map(function (v) {
      return '<button data-v="' + v[0] + '"' + (v[0] === current ? ' aria-current="page"' : "") + ">" + v[1] + "</button>";
    }).join("");
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-v]");
    if (b) { current = b.getAttribute("data-v"); history.replaceState(null, "", "#" + current); render(); window.scrollTo(0, 0); }
    if (e.target.closest("[data-site]")) location.href = N.ROOT;
  });

  function top(title, sub, actions) {
    return '<div class="admin-top"><div><h1>' + title + "</h1><p>" + sub + "</p></div><div style=\"display:flex;gap:10px;flex-wrap:wrap\">" + (actions || "") + "</div></div>";
  }
  function tip(html) { return '<div class="help-tip">' + icons.info + "<div>" + html + "</div></div>"; }
  function money(n) { return n === 0 ? "Free" : N.money(n); }

  /* ---------- overview ---------- */
  function overview() {
    var free = bookings.filter(function (b) { return b.w.price === 0; }).length;
    var paidCount = bookings.length - free;
    var weeks = [];
    for (var i = 7; i >= 0; i--) {
      var start = new Date(2026, 9, 3 - i * 7 - 6), end = new Date(2026, 9, 3 - i * 7 + 1);
      var inWeek = bookings.filter(function (b) { return b.when >= start && b.when < end; });
      weeks.push({ label: start.getDate() + " " + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][start.getMonth()], free: inWeek.filter(function (b) { return b.w.price === 0; }).length, paid: inWeek.filter(function (b) { return b.w.price > 0; }).length });
    }
    var max = Math.max.apply(null, weeks.map(function (w) { return w.free + w.paid; })) || 1;
    var upcoming = [];
    D.workshops.forEach(function (w) { w.sessions.forEach(function (s) { upcoming.push({ w: w, s: s }); }); });
    upcoming.sort(function (a, b) { return a.s.date < b.s.date ? -1 : 1; });

    var linkStats = creatorSlugs.map(function (slug) {
      var bs = bookings.filter(function (b) { return b.via === slug; });
      return { p: N.person(slug), count: bs.length, rev: bs.reduce(function (t, b) { return t + (b.status === "paid" ? b.amount : 0); }, 0) };
    }).sort(function (a, b) { return b.count - a.count; }).slice(0, 5);

    return top("Good morning", "Here's how Nikon School is doing this month.", '<a class="btn btn-ghost btn-sm" href="../">View website</a><button class="btn btn-yellow btn-sm" data-add-ws>' + icons.plus + " Add workshop</button>") +
      tip("<b>Everything here is point and click.</b> Add a workshop, change a date or share a creator link without touching code. Changes go live on the website straight away.") +
      '<div class="kpis">' +
      '<div class="kpi"><small>Bookings</small><b>' + bookings.length + '</b><span class="up">&uarr; 18% vs last month</span></div>' +
      '<div class="kpi"><small>Revenue</small><b>' + N.money(revenue) + '</b><span class="up">&uarr; 24% vs last month</span></div>' +
      '<div class="kpi"><small>Free to paid</small><b>' + Math.round((paidCount / Math.max(1, free)) * 100) + '%</b><span class="up">of free attendees book a paid class</span></div>' +
      '<div class="kpi"><small>Seats filled</small><b>' + Math.round((takenAll / seatsAll) * 100) + "%</b><span class=\"up\">" + takenAll + " of " + seatsAll + " seats</span></div>" +
      "</div>" +
      '<div class="two-col"><div class="panel"><div class="panel-head"><h2>Bookings per week</h2><div class="legend"><span><i style="background:#FFE100"></i>Free</span><span><i style="background:#0b0b0c"></i>Paid</span></div></div>' +
      '<div class="chart" role="img" aria-label="Weekly bookings, free and paid">' + weeks.map(function (w) {
        var tot = w.free + w.paid;
        return '<div class="col" title="' + w.free + " free, " + w.paid + ' paid"><div class="stack" style="height:' + Math.max(4, (tot / max) * 150) + 'px"><i style="flex:' + w.paid + ';background:#0b0b0c"></i><i style="flex:' + w.free + ';background:#FFE100"></i></div><small>' + w.label + "</small></div>";
      }).join("") + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Top creator links</h2><button class="btn btn-ghost btn-sm" data-v="people">All links</button></div>' +
      '<table><tbody>' + linkStats.map(function (l) {
        return '<tr><td><div class="cell-title">' + N.avatar(l.p, 30) + esc(l.p.name) + "</div></td><td style=\"text-align:right\"><b>" + l.count + '</b> <span style="color:var(--muted)">bookings</span></td></tr>';
      }).join("") + "</tbody></table></div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Upcoming sessions</h2><button class="btn btn-ghost btn-sm" data-v="workshops">Manage workshops</button></div><div class="table-wrap"><table><thead><tr><th>Workshop</th><th>Date</th><th>City</th><th>Seats</th><th>Price</th></tr></thead><tbody>' +
      upcoming.slice(0, 7).map(function (u) {
        var pct = Math.round(u.s.taken / u.s.seats * 100);
        return '<tr><td><div class="cell-title">' + N.art(u.w) + esc(u.w.short) + "</div></td><td>" + esc(N.dt(u.s.date).long) + " " + u.s.time + "</td><td>" + esc(u.s.city) + '</td><td><span class="mini-bar"><i style="width:' + pct + '%"></i></span>' + u.s.taken + "/" + u.s.seats + "</td><td>" + money(u.w.price) + "</td></tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  /* ---------- workshops ---------- */
  var drafts = {};
  function workshopsView() {
    return top("Workshops", "Add, edit and publish workshops. Each one gets its own page and booking calendar.", '<button class="btn btn-yellow btn-sm" data-add-ws>' + icons.plus + " Add workshop</button>") +
      tip("Flip the switch to hide a workshop from the website without deleting it. Seats update automatically as people book.") +
      '<div class="panel"><div class="table-wrap"><table><thead><tr><th>Workshop</th><th>Host</th><th>Next date</th><th>Seats</th><th>Price</th><th>On website</th><th></th></tr></thead><tbody id="ws-rows">' +
      D.workshops.map(function (w) {
        var s = N.nextSession(w), pct = Math.round(s.taken / s.seats * 100), live = !drafts[w.slug];
        return '<tr><td><div class="cell-title">' + N.art(w) + "<div>" + esc(w.short) + '<br><span style="font-weight:400;color:var(--muted);font-size:.82rem">' + w.sessions.length + (w.sessions.length > 1 ? " dates" : " date") + "</span></div></div></td>" +
          "<td>" + esc(N.person(w.host).name) + "</td><td>" + esc(N.dt(s.date).long) + "</td>" +
          '<td><span class="mini-bar"><i style="width:' + pct + '%"></i></span>' + s.taken + "/" + s.seats + "</td>" +
          "<td>" + (w.price ? N.money(w.price) : '<span class="status free">Free</span>') + "</td>" +
          '<td><button class="switch" role="switch" aria-checked="' + live + '" aria-label="Show ' + esc(w.short) + ' on website" data-toggle="' + w.slug + '"></button></td>' +
          '<td><div style="display:flex;gap:6px"><a class="btn btn-ghost btn-sm" href="../workshops/' + w.slug + '/">View</a><button class="btn btn-ghost btn-sm" data-edit="' + w.slug + '">Edit</button></div></td></tr>';
      }).join("") + "</tbody></table></div></div>";
  }

  function workshopForm(w) {
    var hosts = D.people.map(function (p) { return '<option value="' + p.slug + '"' + (w && w.host === p.slug ? " selected" : "") + ">" + esc(p.name) + "</option>"; }).join("");
    var s = w ? N.nextSession(w) : null;
    N.openModal('<div class="sheet-head"><h2 id="modal-title">' + (w ? "Edit workshop" : "Add a workshop") + '</h2><button class="close" data-close aria-label="Close">&times;</button></div><div class="sheet-body">' +
      '<form id="ws-form" class="form-grid">' +
      '<div class="full"><label class="lbl" for="t">Workshop name</label><input class="inp" id="t" required value="' + (w ? esc(w.title) : "") + '" placeholder="e.g. Street Photography with ..."></div>' +
      '<div class="full"><span class="lbl">Type</span><div class="seg" role="group" aria-label="Type"><button type="button" data-type="free" aria-pressed="' + (w ? w.price === 0 : "false") + '">Free</button><button type="button" data-type="paid" aria-pressed="' + (w ? w.price > 0 : "true") + '">Paid</button></div></div>' +
      '<div><label class="lbl" for="pr">Price (R)</label><input class="inp" id="pr" type="number" min="0" value="' + (w ? w.price : 350) + '"></div>' +
      '<div><label class="lbl" for="h">Host</label><select class="inp" id="h">' + hosts + "</select></div>" +
      '<div><label class="lbl" for="d">Date</label><input class="inp" id="d" type="date" value="' + (s ? s.date : "2026-12-05") + '"></div>' +
      '<div><label class="lbl" for="tm">Start time</label><input class="inp" id="tm" type="time" value="' + (s ? s.time : "09:00") + '"></div>' +
      '<div><label class="lbl" for="c">City</label><select class="inp" id="c"><option>Johannesburg</option><option>Cape Town</option><option>Durban</option><option>Pretoria</option><option>Online</option></select></div>' +
      '<div><label class="lbl" for="st">Seats</label><input class="inp" id="st" type="number" min="1" value="' + (s ? s.seats : 12) + '"></div>' +
      '<div class="full"><label class="lbl" for="ds">Short description</label><textarea class="inp" id="ds" rows="3">' + (w ? esc(w.summary) : "") + "</textarea></div>" +
      '<div class="full"><span class="lbl">Cover image</span><div class="drop">Drag a photo here or <b>browse</b><br><small>JPG or PNG, we resize it for you</small></div></div>' +
      '<div class="full" style="display:flex;gap:10px"><button class="btn btn-dark" type="submit" style="flex:1">' + (w ? "Save changes" : "Publish workshop") + '</button><button class="btn btn-ghost" type="button" data-close>Cancel</button></div>' +
      "</form></div>");
    if (s) $("#c").value = s.city;
    $(".seg").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      $$("button", this).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      $("#pr").disabled = b.getAttribute("data-type") === "free";
    });
    $("#pr").disabled = !!(w && w.price === 0);
    $("#ws-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var title = $("#t").value.trim();
      if (!title) { $("#t").focus(); return; }
      var free = $(".seg [aria-pressed=true]").getAttribute("data-type") === "free";
      if (w) {
        w.title = title; w.price = free ? 0 : +$("#pr").value || 0; w.host = $("#h").value; w.summary = $("#ds").value;
        s.date = $("#d").value || s.date; s.time = $("#tm").value || s.time; s.city = $("#c").value; s.seats = +$("#st").value || s.seats;
        N.closeModal(); N.toast("Saved. The website is updated."); render();
        return;
      }
      var slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      D.workshops.unshift({
        slug: slug, title: title, short: title.split(" with ")[0].slice(0, 30), price: free ? 0 : +$("#pr").value || 0,
        level: "All levels", format: $("#c").value === "Online" ? "Online" : "In person", duration: "3 hours", groupSize: +$("#st").value || 12,
        host: $("#h").value, art: N.person($("#h").value).art, summary: $("#ds").value || title, learn: [], bring: [], schedule: [],
        sessions: [{ id: slug + "-1", date: $("#d").value || "2026-12-05", time: $("#tm").value || "09:00", city: $("#c").value, venue: $("#c").value, seats: +$("#st").value || 12, taken: 0 }]
      });
      N.closeModal(); current = "workshops"; render();
      N.toast("Published. \"" + title + "\" is live and taking bookings.");
    });
  }

  /* ---------- bookings ---------- */
  var query = "";
  function bookingsView() {
    return top("Bookings", bookings.length + " bookings across all workshops.", '<button class="btn btn-dark btn-sm" id="export">' + icons.down + " Export to Excel (CSV)</button>") +
      '<div class="panel"><div class="panel-head"><label class="sr-only" for="q">Search bookings</label><input class="inp" id="q" style="max-width:340px" placeholder="Search name, email, workshop or ref" value="' + esc(query) + '"><span style="color:var(--muted);font-size:.88rem" id="q-count"></span></div>' +
      '<div class="table-wrap"><table><thead><tr><th>Ref</th><th>Name</th><th>Workshop</th><th>Date</th><th>Camera</th><th>Came from</th><th>Status</th></tr></thead><tbody id="b-rows"></tbody></table></div></div>';
  }
  function drawBookings() {
    var q = query.toLowerCase();
    var list = bookings.filter(function (b) { return !q || (b.name + " " + b.email + " " + b.w.title + " " + b.ref).toLowerCase().indexOf(q) >= 0; });
    $("#q-count").textContent = "Showing " + Math.min(list.length, 40) + " of " + list.length;
    $("#b-rows").innerHTML = list.slice(0, 40).map(function (b) {
      return '<tr><td class="link-cell">' + b.ref + "</td><td><b>" + esc(b.name) + '</b><br><span style="color:var(--muted);font-size:.82rem">' + esc(b.email) + "</span></td><td>" + esc(b.w.short) + "</td><td>" + esc(N.dt(b.s.date).long) + "</td><td>" + esc(b.camera) + "</td><td>" + (b.via ? esc(N.person(b.via).name) : esc(b.source)) + '</td><td><span class="status ' + b.status + '">' + { paid: "Paid " + N.money(b.amount), free: "Free", pending: "Awaiting EFT" }[b.status] + "</span></td></tr>";
    }).join("") || '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:30px">No bookings match.</td></tr>';
  }
  function exportCsv() {
    var rows = [["Ref", "Name", "Email", "Camera", "Workshop", "Date", "City", "Amount", "Status", "Source"]].concat(bookings.map(function (b) {
      return [b.ref, b.name, b.email, b.camera, b.w.title, b.s.date, b.s.city, b.amount, b.status, b.via ? "Creator link: " + N.person(b.via).name : b.source];
    }));
    var csv = rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(","); }).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "nikon-school-bookings-sample.csv";
    document.body.appendChild(a); a.click(); a.remove();
    N.toast("Bookings exported");
  }

  /* ---------- people ---------- */
  function peopleView() {
    var opts = D.people.map(function (p) { return '<option value="' + p.slug + '">' + esc(p.name) + "</option>"; }).join("");
    return top("People & links", "Ambassadors, hosts and creators. Every person has a page and a link that tracks bookings.", '<button class="btn btn-yellow btn-sm" id="add-person">' + icons.plus + " Add person</button>") +
      tip("Use a person's link in their ads, bio or newsletter. Any booking that starts from that link is credited to them, so you can see which partnerships actually sell seats.") +
      '<div class="panel"><div class="table-wrap"><table><thead><tr><th>Person</th><th>Role</th><th>Page link</th><th>Visits</th><th>Bookings</th><th>Revenue</th><th></th></tr></thead><tbody id="p-rows">' +
      D.people.map(function (p) {
        var bs = bookings.filter(function (b) { return b.via === p.slug; });
        var rev = bs.reduce(function (t, b) { return t + (b.status === "paid" ? b.amount : 0); }, 0);
        var visits = p.role === "team" ? 0 : bs.length * 23 + p.slug.length * 7;
        return '<tr><td><div class="cell-title">' + N.avatar(p, 34) + esc(p.name) + (p.sample ? ' <span class="badge badge-sample">Sample</span>' : "") + "</div></td><td>" + N.roleLabel(p.role) + '</td><td class="link-cell">/creators/' + p.slug + "</td><td>" + (visits || "-") + "</td><td>" + (bs.length || "-") + "</td><td>" + (rev ? N.money(rev) : "-") + '</td><td><div style="display:flex;gap:6px"><button class="btn btn-ghost btn-sm" data-copy="' + p.slug + '">' + I.link + ' Copy</button><a class="btn btn-ghost btn-sm" href="../creators/' + p.slug + '/">View</a></div></td></tr>';
      }).join("") + "</tbody></table></div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Ad link builder</h2></div><p style="color:var(--muted);margin-top:-6px">Make a tracked link for a paid ad in three clicks. Paste it straight into Meta, Google or TikTok.</p>' +
      '<div class="form-grid utm-grid"><div><label class="lbl" for="u-p">Person</label><select class="inp" id="u-p">' + opts + '</select></div>' +
      '<div><label class="lbl" for="u-s">Where the ad runs</label><select class="inp" id="u-s"><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option><option value="google">Google</option><option value="newsletter">Newsletter</option></select></div>' +
      '<div><label class="lbl" for="u-c">Campaign name</label><input class="inp" id="u-c" value="summer-workshops"></div></div>' +
      '<div class="utm-out"><span id="u-out" style="flex:1"></span><button class="btn btn-dark btn-sm" id="u-copy">Copy</button></div></div>';
  }
  function utm() {
    var p = $("#u-p").value, s = $("#u-s").value, c = ($("#u-c").value || "campaign").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return "https://" + N.LIVE_DOMAIN + "/creators/" + p + "/?utm_source=" + s + "&utm_medium=paid&utm_campaign=" + c;
  }
  function personForm() {
    N.openModal('<div class="sheet-head"><h2 id="modal-title">Add a person</h2><button class="close" data-close aria-label="Close">&times;</button></div><div class="sheet-body">' +
      '<form id="p-form" class="form-grid">' +
      '<div class="full"><label class="lbl" for="pn">Full name</label><input class="inp" id="pn" required placeholder="e.g. Naledi Dube"></div>' +
      '<div><label class="lbl" for="pr2">Role</label><select class="inp" id="pr2"><option value="ambassador">Ambassador</option><option value="collaborator">Collaborator</option><option value="host">Workshop host</option><option value="creator">Creator</option></select></div>' +
      '<div><label class="lbl" for="pc">Based in</label><input class="inp" id="pc" placeholder="City"></div>' +
      '<div class="full"><label class="lbl" for="ps">What they shoot</label><input class="inp" id="ps" placeholder="e.g. Street and documentary"></div>' +
      '<div class="full"><label class="lbl" for="pb">Short bio</label><textarea class="inp" id="pb" rows="3"></textarea></div>' +
      '<div class="full"><span class="lbl">Profile photo and portfolio</span><div class="drop">Drag up to 12 photos here or <b>browse</b></div></div>' +
      '<div class="full"><button class="btn btn-dark btn-block" type="submit">Create page and link</button></div></form></div>');
    $("#p-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#pn").value.trim();
      if (!name) { $("#pn").focus(); return; }
      var slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      D.people.push({ slug: slug, name: name, role: $("#pr2").value, specialty: $("#ps").value || "Photography", city: $("#pc").value || "South Africa", art: ["seeing", "portrait", "astro", "sport", "wildlife"][name.length % 5], bio: $("#pb").value, highlights: [], socials: {} });
      N.closeModal(); render();
      N.toast("Page created: " + N.LIVE_DOMAIN + "/creators/" + slug);
    });
  }

  /* ---------- payments ---------- */
  function paymentsView() {
    var pending = bookings.filter(function (b) { return b.status === "pending"; });
    return top("Payments", "Money in, payouts and refunds, all in one place.", "") +
      '<div class="kpis"><div class="kpi"><small>Collected this month</small><b>' + N.money(revenue) + '</b><span class="up">' + paidBookings.length + ' payments</span></div>' +
      '<div class="kpi"><small>Next payout</small><b>' + N.money(Math.round(revenue * 0.35)) + '</b><span style="color:var(--muted);font-size:.82rem">Mon 6 Oct, to Nikon SA account</span></div>' +
      '<div class="kpi"><small>Awaiting EFT</small><b>' + pending.length + '</b><span style="color:var(--muted);font-size:.82rem">Seats held for 48 hours</span></div>' +
      '<div class="kpi"><small>Refunds</small><b>R 0</b><span style="color:var(--muted);font-size:.82rem">None this month</span></div></div>' +
      '<div class="two-col"><div class="panel"><div class="panel-head"><h2>Recent payments</h2></div><div class="table-wrap"><table><thead><tr><th>Ref</th><th>Name</th><th>Workshop</th><th>Amount</th><th></th></tr></thead><tbody>' +
      paidBookings.slice(0, 8).map(function (b) {
        return '<tr><td class="link-cell">' + b.ref + "</td><td>" + esc(b.name) + "</td><td>" + esc(b.w.short) + "</td><td><b>" + N.money(b.amount) + '</b></td><td><button class="btn btn-ghost btn-sm" data-refund="' + b.ref + '">Refund</button></td></tr>';
      }).join("") + "</tbody></table></div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Payment gateway</h2><span class="status live">Connected</span></div>' +
      '<p style="color:var(--muted)">Card, instant EFT and QR payments run through a South African payment gateway (PayFast, Yoco or Peach Payments, Nikon\'s choice). Card details never touch this website.</p>' +
      '<div style="display:grid;gap:12px;margin-top:16px">' +
      ["Card payments", "Instant EFT", "Scan to Pay QR", "Email receipts"].map(function (x) { return '<div style="display:flex;justify-content:space-between;align-items:center"><span>' + x + '</span><button class="switch" role="switch" aria-checked="true" aria-label="' + x + '" data-flip></button></div>'; }).join("") +
      "</div></div></div>";
  }

  /* ---------- render ---------- */
  function render() {
    drawNav();
    var fn = { overview: overview, workshops: workshopsView, bookings: bookingsView, people: peopleView, payments: paymentsView }[current];
    $("#main").innerHTML = fn();
    if (current === "bookings") {
      drawBookings();
      $("#q").addEventListener("input", function () { query = this.value; drawBookings(); });
      $("#export").addEventListener("click", exportCsv);
    }
    if (current === "people") {
      var upd = function () { $("#u-out").textContent = utm(); };
      ["#u-p", "#u-s", "#u-c"].forEach(function (id) { $(id).addEventListener("input", upd); });
      upd();
      $("#u-copy").addEventListener("click", function () { N.copy(utm(), "Ad link copied"); });
      $("#add-person").addEventListener("click", personForm);
    }
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-add-ws]")) workshopForm(null);
    var ed = e.target.closest("[data-edit]");
    if (ed) workshopForm(N.workshop(ed.getAttribute("data-edit")));
    var tg = e.target.closest("[data-toggle]");
    if (tg) {
      var slug = tg.getAttribute("data-toggle");
      drafts[slug] = !drafts[slug];
      tg.setAttribute("aria-checked", !drafts[slug]);
      N.toast(drafts[slug] ? "Hidden from the website" : "Showing on the website");
    }
    var fl = e.target.closest("[data-flip]");
    if (fl) fl.setAttribute("aria-checked", fl.getAttribute("aria-checked") !== "true");
    var cp = e.target.closest("[data-copy]");
    if (cp) N.copy("https://" + N.LIVE_DOMAIN + "/creators/" + cp.getAttribute("data-copy") + "/", "Link copied");
    var rf = e.target.closest("[data-refund]");
    if (rf) { rf.disabled = true; rf.textContent = "Refunded"; N.toast("Refund sent for " + rf.getAttribute("data-refund") + " (demo)"); }
  });

  render();
})();
