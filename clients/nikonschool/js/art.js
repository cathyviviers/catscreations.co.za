/*
  Illustrated placeholders for workshop and creator imagery, with motion.
  Each scene has an ambient loop, depth layers that follow the pointer (.px with --d),
  a hover reaction (via .art-hot on the hovered card) and a shutter flash on click.
  The live site swaps these for Nikon's own photography, uploaded through the dashboard.
*/
(function (root) {
  var n = 0;

  function svg(body, defs) {
    return '<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>' + (defs || "") + "</defs>" + body + "</svg>";
  }
  function lin(id, stops, x2, y2) {
    var s = stops.map(function (c, i) { return '<stop offset="' + (i / (stops.length - 1)) + '" stop-color="' + c + '"/>'; }).join("");
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + (x2 == null ? 0 : x2) + '" y2="' + (y2 == null ? 1 : y2) + '">' + s + "</linearGradient>";
  }
  function rad(id, inner, outer) {
    return '<radialGradient id="' + id + '"><stop offset="0" stop-color="' + inner + '"/><stop offset="1" stop-color="' + outer + '" stop-opacity="0"/></radialGradient>';
  }
  // Depth layer: moves with the pointer, d = pixels of travel
  function px(d, inner) { return '<g class="px" style="--d:' + d + '">' + inner + "</g>"; }
  // Seeded pseudo-random so each artwork renders the same every time
  function rng(seed) {
    var s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  function f(v) { return v.toFixed(1); }

  function aperture(cx, cy, r, blades, open, fill, stroke) {
    var out = "";
    for (var i = 0; i < blades; i++) {
      var a = (i / blades) * Math.PI * 2;
      var a2 = a + Math.PI * 2 / blades;
      out += '<path d="M' + f(cx + Math.cos(a) * r) + " " + f(cy + Math.sin(a) * r) + " L" + f(cx + Math.cos(a2) * r) + " " + f(cy + Math.sin(a2) * r) + " L" + f(cx + Math.cos(a + 1.1) * r * open) + " " + f(cy + Math.sin(a + 1.1) * r * open) + 'Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.2"/>';
    }
    return out;
  }
  function birds(y) {
    return '<g class="fly"><path d="M0 ' + y + " l8 -6 l8 6 M22 " + (y + 10) + ' l6 -5 l6 5" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
  }

  var scenes = {
    lightcraft: function (id) {
      var d = lin(id + "b", ["#111214", "#1d1e22"]) + rad(id + "g", "#FFE100", "#FFE100") + rad(id + "y", "#fff8b3", "#FFE100") +
        '<clipPath id="' + id + 'c"><circle cx="200" cy="150" r="82"/></clipPath>';
      var beams = "";
      for (var i = 0; i < 7; i++) {
        beams += '<path class="beam" style="animation-delay:' + (i * -0.7) + 's" d="M200 150 L' + (i * 70 - 20) + " -10 L" + (i * 70 + 10) + ' -10 Z" fill="#FFE100" opacity=".08"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(-6, '<g class="aim-beams">' + beams + '</g><circle class="glow" cx="200" cy="150" r="120" fill="url(#' + id + 'g)" opacity=".35"/>') +
        px(6,
          '<circle cx="200" cy="150" r="92" fill="#0d0d0f" stroke="#2c2d33" stroke-width="10"/>' +
          '<g clip-path="url(#' + id + 'c)"><circle cx="200" cy="150" r="82" fill="#FFE100"/><circle cx="200" cy="150" r="40" fill="url(#' + id + 'y)"/>' +
          '<g class="lc-iris"><g class="lc-breathe">' + aperture(200, 150, 104, 7, 0.33, "#24252a", "#3a3b42") + "</g></g></g>" +
          '<circle class="glint lc-glint" cx="191" cy="141" r="5" fill="#fff"/>' +
          '<circle class="spin" cx="200" cy="150" r="110" fill="none" stroke="#FFE100" stroke-width="1.2" opacity=".55" stroke-dasharray="2 6"/>' +
          '<circle class="spin rev" cx="200" cy="150" r="124" fill="none" stroke="#FFE100" stroke-width="1" opacity=".25" stroke-dasharray="18 10"/>'
        ),
        d
      );
    },
    zvideo: function (id) {
      var d = lin(id + "b", ["#0f1013", "#1b1c21"]);
      var frames = "", holes = "", bars = "", r = rng(7);
      for (var i = 0; i < 6; i++) {
        frames += '<rect x="' + (28 + i * 90) + '" y="96" width="76" height="108" rx="6" fill="#26272d" stroke="#3b3c44"/>' +
          '<path class="zv-shape" d="M' + (40 + i * 90) + " 190 Q" + (66 + i * 90) + " " + (130 + (i % 4) * 12) + " " + (92 + i * 90) + ' 190Z" fill="#FFE100" opacity="' + (0.25 + (i % 4) * 0.18) + '"/>' +
          '<circle cx="' + (84 + i * 90) + '" cy="118" r="6" fill="#FFE100" opacity=".5"/>';
      }
      for (var j = 0; j < 22; j++) {
        holes += '<rect x="' + (12 + j * 20) + '" y="74" width="10" height="8" rx="2" fill="#3b3c44"/><rect x="' + (12 + j * 20) + '" y="218" width="10" height="8" rx="2" fill="#3b3c44"/>';
      }
      for (var k = 0; k < 36; k++) {
        bars += '<rect class="eq" x="' + f(20 + k * 10.3) + '" y="244" width="6" height="26" rx="2" fill="#FFE100" style="animation-duration:' + (0.5 + r() * 0.7).toFixed(2) + "s;animation-delay:-" + (r() * 1.2).toFixed(2) + 's"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(5, '<g class="aim-film"><g class="zv-holes">' + holes + '</g><g class="zv-film">' + frames + "</g></g>") +
        px(-3, '<g opacity=".85">' + bars + "</g>") +
        '<circle class="blink" cx="356" cy="36" r="9" fill="#ff3b30"/><text x="300" y="41" fill="#f2f2f2" font-family="Archivo, sans-serif" font-size="14" font-weight="700" letter-spacing="2">REC</text>' +
        '<text class="zv-tc" x="22" y="41" fill="#a3a5ad" font-family="ui-monospace, monospace" font-size="12">00:00:12:08</text>',
        d
      );
    },
    zseries: function (id) {
      var d = lin(id + "b", ["#1a1b1f", "#0e0f11"]) + rad(id + "g", "#FFE100", "#FFE100");
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(-5, '<circle class="glow" cx="230" cy="170" r="140" fill="url(#' + id + 'g)" opacity=".18"/>') +
        px(5, '<g class="aim-cam">' +
          '<g fill="none" stroke="#FFE100" stroke-width="3" stroke-linejoin="round">' +
          '<path class="draw" pathLength="1" d="M80 110 h60 l18 -28 h70 l18 28 h80 a14 14 0 0 1 14 14 v110 a14 14 0 0 1 -14 14 h-246 a14 14 0 0 1 -14 -14 v-110 a14 14 0 0 1 14 -14z"/>' +
          '<rect class="draw" pathLength="1" x="96" y="124" width="34" height="18" rx="4" opacity=".7"/>' +
          '<circle class="draw" pathLength="1" cx="300" cy="96" r="9" opacity=".7"/>' +
          '<g class="zs-lens"><circle class="draw" pathLength="1" cx="210" cy="180" r="58"/>' +
          '<circle class="spin" cx="210" cy="180" r="48" stroke-width="2" opacity=".6" stroke-dasharray="3 7"/>' +
          '<circle class="draw" pathLength="1" cx="210" cy="180" r="34" opacity=".45"/>' +
          '<g class="zs-af"><path d="M196 172v-6h6M218 166h6v6M224 188v6h-6M202 194h-6v-6" stroke-width="2.4"/></g></g>' +
          "</g>" +
          '<text x="168" y="104" fill="#FFE100" font-family="Archivo, sans-serif" font-size="13" font-weight="800" letter-spacing="3">Z</text>' +
          '<circle class="blink slow" cx="318" cy="134" r="4" fill="#3ddc84"/></g>'
        ),
        d
      );
    },
    coolpix: function (id) {
      var d = lin(id + "s", ["#7fb6e6", "#d9ecf7"]);
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        px(-3,
          '<circle class="glow" cx="300" cy="80" r="40" fill="#fffbe0" opacity=".5"/><circle cx="300" cy="80" r="26" fill="#fffbe0"/>' +
          '<g class="drift" fill="#fff" opacity=".85"><ellipse cx="80" cy="60" rx="34" ry="10"/><ellipse cx="96" cy="52" rx="20" ry="10"/></g>' +
          '<g class="drift slow" fill="#fff" opacity=".6"><ellipse cx="220" cy="40" rx="28" ry="8"/></g>'
        ) +
        '<g style="color:#244a63">' + birds(76) + "</g>" +
        px(2, '<path d="M0 220 L70 150 L120 190 L190 110 L260 180 L310 140 L400 210 V300 H0Z" fill="#3c6e8f"/><path d="M190 110 L215 135 L200 132 L185 140 L170 130Z" fill="#eef6fb"/>') +
        px(6, '<path d="M-10 250 L90 210 L170 240 L260 205 L410 250 V310 H-10Z" fill="#244a63"/>') +
        '<g class="cp-zoom-h"><g class="cp-zoom"><g stroke="#FFE100" stroke-width="4" fill="none"><path d="M110 60 h-24 v24"/><path d="M290 60 h24 v24"/><path d="M110 240 h-24 v-24"/><path d="M290 240 h24 v-24"/></g></g></g>' +
        '<rect x="150" y="262" width="100" height="18" rx="9" fill="#111" opacity=".75"/><text x="200" y="275" text-anchor="middle" fill="#FFE100" font-family="Archivo, sans-serif" font-size="11" font-weight="700">125x ZOOM</text>',
        d
      );
    },
    cityscape: function (id) {
      var d = lin(id + "s", ["#2a1446", "#b0306b", "#f47a3c", "#ffc75a"]) + rad(id + "g", "#ffe7a0", "#ff9a3c");
      var r = rng(42), city = "", lights = "";
      var x = 0;
      while (x < 420) {
        var w = 18 + r() * 34, h = 50 + r() * 120;
        if (x > 150 && x < 200) h = 175;
        city += '<rect x="' + f(x - 10) + '" y="' + f(300 - h) + '" width="' + f(w) + '" height="' + f(h + 10) + '"/>';
        for (var wy = 300 - h + 10; wy < 285; wy += 12) {
          for (var wx = x - 5; wx < x + w - 16; wx += 9) {
            if (r() > 0.62) {
              var tw = r() > 0.55;
              lights += '<rect' + (tw ? ' class="tw" style="animation-duration:' + (2 + r() * 4).toFixed(1) + "s;animation-delay:-" + (r() * 6).toFixed(1) + 's"' : "") + ' x="' + f(wx) + '" y="' + f(wy) + '" width="3.5" height="5"/>';
            }
          }
        }
        x += w + 2;
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        px(-4, '<g class="cs-sun-h"><g class="cs-sun"><circle class="glow" cx="250" cy="196" r="110" fill="url(#' + id + 'g)" opacity=".7"/><circle cx="250" cy="196" r="38" fill="#fff1c4"/></g></g>' +
          '<g style="color:#3a1a3e" opacity=".7">' + birds(70) + "</g>") +
        px(6, '<g class="aim-lean"><g fill="#1a0f26">' + city + '</g><g fill="#FFE100" opacity=".9">' + lights + "</g></g>") +
        '<path class="flow" d="M0 293 Q200 273 400 293" stroke="#ffd36b" stroke-width="2" fill="none" opacity=".7" stroke-dasharray="10 8"/>',
        d
      );
    },
    masterclass: function (id) {
      var d = lin(id + "b", ["#121316", "#24180a"], 1, 1);
      var streaks = "", r = rng(11);
      for (var i = 0; i < 18; i++) {
        var y = 20 + r() * 260, len = 80 + r() * 200;
        streaks += '<rect class="streak" style="animation-duration:' + (1.6 + r() * 3).toFixed(2) + "s;animation-delay:-" + (r() * 4).toFixed(2) + 's" x="0" y="' + y.toFixed(0) + '" width="' + len.toFixed(0) + '" height="' + (1 + r() * 3).toFixed(1) + '" rx="2" fill="' + (i % 3 ? "#FFE100" : "#ff8a00") + '" opacity="' + (0.15 + r() * 0.5).toFixed(2) + '"/>';
      }
      var rings = "", ripples = "";
      for (var k = 0; k < 6; k++) rings += '<circle cx="150" cy="150" r="' + (24 + k * 18) + '" fill="none" stroke="#FFE100" stroke-width="' + (k === 0 ? 6 : 1.5) + '" opacity="' + (0.9 - k * 0.13) + '"/>';
      for (var m = 0; m < 3; m++) ripples += '<circle class="ripple" style="animation-delay:' + (m * 1.1) + 's" cx="150" cy="150" r="60" fill="none" stroke="#FFE100" stroke-width="2"/>';
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(-8, streaks) +
        px(6, '<g class="mc-rings">' + rings + "</g>" + ripples + '<circle cx="150" cy="150" r="20" fill="#0b0b0c"/><circle class="glint" cx="143" cy="143" r="5" fill="#fff" opacity=".6"/>') +
        px(10, '<g class="mc-play"><g class="aim-point"><path class="pulse" d="M262 190 l40 20 l-40 20z" fill="#FFE100"/></g></g>'),
        d
      );
    },
    seeing: function (id) {
      var d = lin(id + "b", ["#f3efe6", "#e4dccb"]) +
        '<clipPath id="' + id + 'e"><path d="M40 150 Q200 30 360 150 Q200 270 40 150Z"/></clipPath><clipPath id="' + id + 'i"><circle cx="200" cy="150" r="56"/></clipPath>';
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(-3, '<g stroke="#111" stroke-width="2" opacity=".4"><line class="draw" pathLength="1" x1="133" y1="0" x2="133" y2="300"/><line class="draw" pathLength="1" x1="267" y1="0" x2="267" y2="300"/><line class="draw" pathLength="1" x1="0" y1="100" x2="400" y2="100"/><line class="draw" pathLength="1" x1="0" y1="200" x2="400" y2="200"/></g>') +
        '<g class="se-blink">' +
        '<path d="M40 150 Q200 30 360 150 Q200 270 40 150Z" fill="#fffdf7"/>' +
        '<g clip-path="url(#' + id + 'e)">' + px(18,
          '<circle cx="200" cy="150" r="62" fill="#111"/>' +
          '<g clip-path="url(#' + id + 'i)"><circle cx="200" cy="150" r="56" fill="#FFE100"/><g class="lc-iris se"><g class="lc-breathe">' + aperture(200, 150, 74, 6, 0.3, "#1f1f22", "#3a3a40") + "</g></g></g>" +
          '<circle cx="214" cy="132" r="8" fill="#fff" opacity=".85"/>'
        ) + "</g>" +
        '<path d="M40 150 Q200 30 360 150 Q200 270 40 150Z" fill="none" stroke="#111" stroke-width="4"/>' +
        "</g>",
        d
      );
    },
    wildlife: function (id) {
      var d = lin(id + "s", ["#3b1d0e", "#c4541c", "#f5a54a", "#fde3a0"]);
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        px(-4, '<g class="aim-sun"><circle class="glow" cx="120" cy="190" r="80" fill="#ffe6a8" opacity=".35"/><circle cx="120" cy="190" r="56" fill="#ffe6a8" opacity=".9"/></g>' +
          '<g style="color:#2a1408">' + birds(90) + "</g>") +
        px(4, '<path d="M-10 230 Q100 215 200 228 T410 222 V310 H-10Z" fill="#2a1408"/>' +
          '<g fill="#1a0c05"><g class="sway"><rect x="268" y="150" width="7" height="82"/>' +
          '<path d="M210 150 Q272 118 340 148 Q300 140 272 146 Q244 140 210 150Z"/><path d="M226 138 Q272 104 326 136 Q290 126 272 132 Q252 126 226 138Z"/></g>' +
          '<g class="graze"><path d="M60 236 l6 -26 q4 -14 14 -16 l10 -30 l6 0 l-4 30 q24 2 34 10 l2 32 h-6 l-2 -24 l-30 2 l-4 22 h-6 l2 -22 l-10 0 l-4 22z"/></g></g>') +
        '<rect class="haze" x="0" y="205" width="400" height="30" fill="#fde3a0" opacity=".12"/>',
        d
      );
    },
    astro: function (id) {
      var d = lin(id + "s", ["#05060f", "#141a3a", "#2a2350"]) + lin(id + "m", ["#ffffff", "#9fb2ff"], 1, 1) + lin(id + "t", ["#ffffff", "#ffffff"], 1, 0);
      var r = rng(99), stars = "";
      for (var i = 0; i < 140; i++) {
        var tw = r() > 0.5;
        stars += "<circle" + (tw ? ' class="tw" style="animation-duration:' + (1.5 + r() * 3).toFixed(1) + "s;animation-delay:-" + (r() * 4).toFixed(1) + 's"' : "") + ' cx="' + f(r() * 420 - 10) + '" cy="' + f(r() * 230) + '" r="' + (r() * 1.3 + 0.2).toFixed(2) + '" opacity="' + (0.4 + r() * 0.6).toFixed(2) + '"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        px(-5,
          '<g class="milky-h"><g class="breathe"><path d="M-20 260 Q180 120 420 20" stroke="url(#' + id + 'm)" stroke-width="70" fill="none" opacity=".12"/>' +
          '<path d="M-20 260 Q180 120 420 20" stroke="#ffe9c2" stroke-width="22" fill="none" opacity=".1"/></g></g>' +
          '<g fill="#fff">' + stars + "</g>" +
          '<g class="shoot"><line x1="330" y1="30" x2="372" y2="8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>' +
          '<g class="shoot late"><line x1="200" y1="50" x2="236" y2="31" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></g>'
        ) +
        px(5, '<path d="M-10 250 L60 230 L110 244 L170 214 L230 240 L300 222 L410 246 V310 H-10Z" fill="#06060a"/>' +
          '<g class="aim-scope"><rect x="300" y="207" width="34" height="9" rx="3" fill="#1b1d2a" stroke="#FFE100" stroke-width="1"/><rect x="330" y="205" width="6" height="13" rx="2" fill="#2a2d40"/><circle class="blink slow" cx="336" cy="211.5" r="2.2" fill="#FFE100"/></g>' +
          '<path d="M304 212 L292 238 M304 212 L316 238 M304 212 L304 238" stroke="#06060a" stroke-width="3"/>'),
        d
      );
    },
    portrait: function (id) {
      var d = lin(id + "b", ["#2b1a14", "#5a3527"], 1, 1) + rad(id + "g", "#ffcf9e", "#ffcf9e");
      var r = rng(5), bokeh = "";
      for (var i = 0; i < 12; i++) {
        bokeh += '<circle class="bokeh" style="animation-duration:' + (6 + r() * 6).toFixed(1) + "s;animation-delay:-" + (r() * 10).toFixed(1) + 's" cx="' + f(r() * 400) + '" cy="' + f(160 + r() * 140) + '" r="' + f(4 + r() * 12) + '" fill="#ffd9a8"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(-6, '<g class="pt-glow-h"><circle class="glow" cx="290" cy="90" r="150" fill="url(#' + id + 'g)" opacity=".45"/></g>' + bokeh) +
        px(5, '<g class="aim-head"><path d="M150 310 Q150 210 200 196 Q186 180 184 150 Q182 96 226 92 Q272 92 270 148 Q268 182 250 196 Q306 212 306 310Z" fill="#1a0f0b"/>' +
          '<path class="rim" d="M262 120 Q272 150 258 186" stroke="#ffd9a8" stroke-width="4" fill="none" stroke-linecap="round"/>' +
          '<path class="rim late" d="M300 236 Q306 270 304 300" stroke="#ffd9a8" stroke-width="3" fill="none"/></g>'),
        d
      );
    },
    flash: function (id) {
      var d = lin(id + "b", ["#120e19", "#2a1a2e"]) + rad(id + "f", "#ffffff", "#fff6d8");
      var bulbs = "", r = rng(21);
      for (var i = 0; i < 16; i++) {
        var x = 10 + i * 26, y = 34 + Math.sin((i / 15) * Math.PI) * 26;
        bulbs += '<circle class="tw" style="animation-duration:' + (1.8 + r() * 2.5).toFixed(1) + "s;animation-delay:-" + (r() * 3).toFixed(1) + 's" cx="' + x + '" cy="' + f(y + 4) + '" r="3.2" fill="#FFE100"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        px(-5, '<path d="M0 30 Q200 92 410 30" stroke="#4a3d54" stroke-width="1.5" fill="none"/>' + bulbs) +
        px(6,
          '<ellipse cx="244" cy="282" rx="80" ry="8" fill="#000" opacity=".45"/>' +
          '<g fill="#0b0910"><circle cx="222" cy="126" r="13"/><path d="M200 290 L204 176 Q206 146 222 144 Q240 146 242 176 L246 290Z"/>' +
          '<circle cx="262" cy="122" r="12"/><path d="M262 136 Q276 140 276 168 L304 292 L222 292 L250 168 Q250 140 262 136Z"/></g>' +
          '<path class="rim-pop" d="M210 122 Q209 132 214 138 M204 178 Q202 230 202 288 M252 168 L226 288" stroke="#fff6d8" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
        ) +
        px(3,
          '<g stroke="#3a3342" stroke-width="3" fill="none"><path d="M84 150 V276"/><path d="M84 276 L66 296 M84 276 L102 296 M84 276 V296"/></g>' +
          '<g class="aim-flash"><circle class="flash-pop" cx="150" cy="146" r="90" fill="url(#' + id + 'f)"/>' +
          '<rect x="72" y="140" width="14" height="12" rx="2" fill="#1d1a22" stroke="#555"/>' +
          '<path d="M90 138 L122 116 V176 L90 154Z" fill="#26222c" stroke="#4d4656"/><path class="softbox" d="M122 116 V176" stroke="#fff6d8" stroke-width="3"/></g>'
        ),
        d
      );
    },
    surf: function (id) {
      var d = lin(id + "s", ["#1d6fa3", "#59b3d9", "#cdeef7"]) + lin(id + "w", ["#2b8fbf", "#0f5a80", "#073a55"]);
      var r = rng(31), spray = "";
      for (var i = 0; i < 14; i++) spray += '<circle class="spray" style="animation-duration:' + (1.6 + r() * 1.6).toFixed(1) + "s;animation-delay:-" + (r() * 3).toFixed(1) + 's" cx="' + f(262 + r() * 60) + '" cy="' + f(88 + r() * 30) + '" r="' + f(1.5 + r() * 3) + '" fill="#fff"/>';
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        px(-4, '<circle class="glow" cx="80" cy="70" r="46" fill="#fff8d6" opacity=".5"/><circle cx="80" cy="70" r="26" fill="#fff8d6"/>' +
          '<g style="color:#0f5a80">' + birds(60) + "</g>") +
        px(5,
          '<path d="M-10 300 L-10 210 Q70 160 150 170 Q236 178 262 118 Q282 74 334 84 Q304 98 304 134 Q304 192 410 214 L410 300Z" fill="url(#' + id + 'w)"/>' +
          '<path class="flow" d="M150 170 Q236 178 262 118 Q282 74 334 84" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="14 10" opacity=".9"/>' +
          spray +
          '<g class="ride"><g class="aim-surfer">' +
          '<ellipse cx="206" cy="182" rx="34" ry="5" fill="#FFE100" transform="rotate(-14 206 182)"/>' +
          '<g fill="#0b1b26"><circle cx="208" cy="134" r="7"/><path d="M204 142 L196 160 L184 166 L188 170 L200 164 L204 156 L208 170 L198 180 L204 182 L216 170 L212 152 L224 146 L222 141 L210 145Z"/></g>' +
          "</g></g>"
        ) +
        px(8, '<path class="flow fast" d="M-10 262 Q100 250 200 262 T410 258" stroke="#bfe6f2" stroke-width="2" fill="none" opacity=".5" stroke-dasharray="30 20"/>'),
        d
      );
    },
    auto: function (id) {
      var d = lin(id + "b", ["#07080b", "#151a24"]) + lin(id + "fl", ["#1b2130", "#07080b"]) + rad(id + "h", "#fff6d8", "#fff6d8");
      var car = "M56 222 Q64 198 106 190 L158 168 Q200 156 252 160 L302 176 Q332 182 346 196 L354 214 Q355 224 344 226 L68 226 Q56 226 56 222Z";
      var trails = "";
      for (var i = 0; i < 5; i++) trails += '<path class="flow" style="animation-duration:' + (1.4 + i * 0.5) + 's" d="M-20 ' + (90 + i * 16) + " Q200 " + (40 + i * 22) + " 420 " + (110 + i * 12) + '" stroke="' + (i % 2 ? "#ff3b30" : "#FFE100") + '" stroke-width="' + (1 + (i % 3)) + '" fill="none" opacity="' + (0.25 + i * 0.1) + '" stroke-dasharray="60 30"/>';
      function wheel(cx) {
        return '<circle cx="' + cx + '" cy="226" r="22" fill="#0a0b0f" stroke="#2a2f3c" stroke-width="3"/><g class="wheel" style="transform-origin:' + cx + 'px 226px"><circle cx="' + cx + '" cy="226" r="13" fill="none" stroke="#8a92a6" stroke-width="2" stroke-dasharray="6 4"/></g><circle cx="' + cx + '" cy="226" r="4" fill="#FFE100"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/><rect y="226" width="400" height="74" fill="url(#' + id + 'fl)"/>' +
        px(-6, trails) +
        px(5,
          '<path d="' + car + '" fill="#0d0f14" transform="translate(0 452) scale(1 -1)" opacity=".25"/>' +
          '<g class="aim-beam"><path d="M350 204 L420 170 L420 250Z" fill="url(#' + id + 'h)" opacity=".55"/></g>' +
          '<path d="' + car + '" fill="#0d0f14" stroke="#2a2f3c" stroke-width="1.5"/>' +
          '<path class="sweep" pathLength="1" d="M70 214 Q80 198 108 192 L160 170 Q200 160 250 163 L300 178 Q328 184 342 198" stroke="#fff6d8" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
          '<path d="M168 172 L196 166 L236 166 L272 178 L170 182Z" fill="#1c2230" stroke="#3a4152"/>' +
          wheel(116) + wheel(300) +
          '<rect x="340" y="200" width="12" height="6" rx="2" fill="#fff6d8"/><rect class="glow" x="56" y="204" width="10" height="6" rx="2" fill="#ff3b30"/>'
        ),
        d
      );
    },
    ocean: function (id) {
      var d = lin(id + "w", ["#2fb3c9", "#0b6f8f", "#06304a", "#031a2b"]);
      var r = rng(77), rays = "", bubbles = "", fish = "";
      for (var i = 0; i < 6; i++) rays += '<path class="ray" style="animation-delay:-' + (i * 0.9).toFixed(1) + 's" d="M' + (60 + i * 60) + " -10 L" + (30 + i * 60) + " 300 L" + (70 + i * 60) + ' 300Z" fill="#cff6ff" opacity=".08"/>';
      for (var j = 0; j < 14; j++) bubbles += '<circle class="bubble" style="animation-duration:' + (3 + r() * 4).toFixed(1) + "s;animation-delay:-" + (r() * 6).toFixed(1) + 's" cx="' + f(150 + r() * 120) + '" cy="' + f(200 + r() * 60) + '" r="' + f(1.5 + r() * 4) + '" fill="none" stroke="#dff8ff" stroke-width="1.2"/>';
      for (var k = 0; k < 18; k++) fish += '<path d="M' + f(r() * 120) + " " + f(r() * 50) + ' l10 -4 l0 8z" fill="#9fe3f2"/>';
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'w)"/>' +
        px(-5, '<g class="rays">' + rays + '</g><path d="M0 14 Q50 6 100 14 T200 14 T300 14 T400 14" stroke="#dff8ff" stroke-width="2" fill="none" opacity=".5" class="flow"/>') +
        px(-2, '<g class="school"><g opacity=".7" transform="translate(40 70)">' + fish + "</g></g>") +
        px(6,
          bubbles +
          '<g class="swim"><g class="aim-diver">' +
          '<g fill="#04121c"><circle cx="204" cy="150" r="11"/>' +
          '<path d="M214 156 Q240 166 268 170 L300 176 L302 182 L268 182 Q238 180 210 170 Q196 166 196 158Z"/>' +
          '<path d="M300 172 L344 156 L350 164 L346 180 L350 196 L344 204 L300 186Z" fill="#FFE100"/>' +
          '<path d="M196 152 L160 140 L158 146 L194 160Z"/></g>' +
          '<path d="M204 138 Q220 132 236 160" stroke="#6fd3e8" stroke-width="2" fill="none" opacity=".7"/>' +
          "</g></g>"
        ) +
        px(9, '<path d="M-10 300 L-10 268 Q40 250 80 264 Q120 240 160 262 L200 300Z M260 300 Q300 250 340 262 Q380 244 410 258 L410 300Z" fill="#021019"/>'),
        d
      );
    },
    sport: function (id) {
      var d = lin(id + "b", ["#0b2a1e", "#145a3c"]);
      var lanes = "";
      for (var i = 0; i < 7; i++) lanes += '<path class="flow fast" d="M-40 ' + (120 + i * 30) + " Q200 " + (80 + i * 34) + " 440 " + (130 + i * 28) + '" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-dasharray="26 14"/>';
      var blur = "";
      for (var j = 0; j < 8; j++) blur += '<rect class="speed" style="animation-delay:-' + (j * 0.09).toFixed(2) + 's" x="' + (40 + j * 14) + '" y="' + (120 + j * 4) + '" width="' + (120 - j * 10) + '" height="3" fill="#FFE100" opacity="' + (0.6 - j * 0.06) + '"/>';
      return svg(
        '<rect width="400" height="300" fill="#b54a2a"/>' +
        px(-3, '<rect width="400" height="96" fill="url(#' + id + 'b)"/>') +
        px(3, lanes) +
        px(9, '<g class="sp-run"><g class="bob">' + blur +
          '<g class="aim-runner" fill="#111"><circle cx="248" cy="110" r="13"/><path d="M236 124 l-22 40 l-30 16 l6 8 l34 -14 l14 -22 l10 30 l-14 34 l10 4 l18 -38 l-8 -40 l20 10 l22 -8 l-4 -9 l-18 6z"/></g></g></g>'),
        d
      );
    }
  };

  root.nsArt = function (kind) {
    n += 1;
    var fn = scenes[kind] || scenes.lightcraft;
    return fn("a" + n + kind);
  };

  /* ---------- interaction ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HOSTS = ".card, .person, .next-card, .feature, .profile-hero, .detail-hero, .upsell, .summary, .host-card, .cell-title";
  var cur = null, raf = 0, ptr = null;
  var visible = [];

  function hostOf(t) {
    if (!t || !t.closest) return null;
    var h = t.closest(HOSTS);
    if (h && h.querySelector(".art")) return h;
    return t.closest(".art-box");
  }
  function setVars(h, mx, my) {
    h.style.setProperty("--mx", mx.toFixed(3));
    h.style.setProperty("--my", my.toFixed(3));
  }
  function clamp(v) { return Math.max(-1, Math.min(1, v)); }

  // Every visible artwork looks toward the pointer, wherever it is on the page.
  // The card under the pointer reacts fully, using the pointer's position inside it.
  function update() {
    raf = 0;
    if (!ptr) return;
    var under = document.elementFromPoint(ptr.x, ptr.y);
    var hot = hostOf(under);
    if (hot !== cur) {
      if (cur) cur.classList.remove("art-hot");
      cur = hot;
      if (hot) hot.classList.add("art-hot");
    }
    var done = [];
    var vw = window.innerWidth / 2, vh = window.innerHeight / 2;
    visible.forEach(function (box) {
      var h = box._nsHost || (box._nsHost = hostOf(box) || box);
      if (done.indexOf(h) >= 0) return;
      done.push(h);
      var b = h.getBoundingClientRect();
      if (h === hot) {
        setVars(h, clamp(((ptr.x - b.left) / b.width) * 2 - 1), clamp(((ptr.y - b.top) / b.height) * 2 - 1));
      } else {
        var cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        setVars(h, clamp((ptr.x - cx) / vw) * 0.7, clamp((ptr.y - cy) / vh) * 0.7);
      }
    });
  }
  function queue() { if (!raf) raf = requestAnimationFrame(update); }
  function reset() {
    ptr = null;
    document.documentElement.classList.remove("ptr-on");
    if (cur) cur.classList.remove("art-hot");
    cur = null;
    visible.forEach(function (box) { var h = box._nsHost || box; setVars(h, 0, 0); });
  }

  if (!reduce) {
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      ptr = { x: e.clientX, y: e.clientY };
      document.documentElement.classList.add("ptr-on");
      queue();
    }, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);

    // Shutter flash on press
    document.addEventListener("pointerdown", function (e) {
      var h = hostOf(e.target);
      if (!h) return;
      var boxes = h.classList.contains("art-box") ? [h] : Array.prototype.slice.call(h.querySelectorAll(".art-box"));
      boxes.forEach(function (b) {
        b.classList.remove("snap");
        void b.offsetWidth;
        b.classList.add("snap");
        setTimeout(function () { b.classList.remove("snap"); }, 500);
      });
    });
  }

  // Only animate artwork that's on screen; draw line art in the first time it appears
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      en.target.classList.toggle("in-view", en.isIntersecting);
      var i = visible.indexOf(en.target);
      if (en.isIntersecting) {
        en.target.classList.add("drawn");
        if (i < 0) visible.push(en.target);
      } else if (i >= 0) {
        visible.splice(i, 1);
      }
    });
  }, { rootMargin: "60px" }) : null;

  function watch(scope) {
    var boxes = scope.querySelectorAll ? scope.querySelectorAll(".art-box") : [];
    Array.prototype.forEach.call(boxes, function (b) {
      if (b._nsSeen) return;
      b._nsSeen = true;
      if (io) io.observe(b); else b.classList.add("in-view", "drawn");
    });
    if (scope.classList && scope.classList.contains("art-box") && !scope._nsSeen) { scope._nsSeen = true; if (io) io.observe(scope); else scope.classList.add("in-view", "drawn"); }
  }
  function boot() {
    watch(document);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (node) { if (node.nodeType === 1) watch(node); }); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) boot(); else document.addEventListener("DOMContentLoaded", boot);
})(window);
