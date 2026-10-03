/*
  Illustrated placeholders for workshop and creator imagery.
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

  // Seeded pseudo-random so each artwork renders the same every time
  function rng(seed) {
    var s = seed;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  function aperture(cx, cy, r, blades, open, fill, stroke) {
    var out = "";
    for (var i = 0; i < blades; i++) {
      var a = (i / blades) * Math.PI * 2;
      var a2 = a + Math.PI * 2 / blades;
      var x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
      var x2 = cx + Math.cos(a2) * r, y2 = cy + Math.sin(a2) * r;
      var ix = cx + Math.cos(a + 1.1) * r * open, iy = cy + Math.sin(a + 1.1) * r * open;
      out += '<path d="M' + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + " L" + ix.toFixed(1) + " " + iy.toFixed(1) + 'Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.2"/>';
    }
    return out;
  }

  var scenes = {
    lightcraft: function (id) {
      var d = lin(id + "b", ["#111214", "#1d1e22"]) + rad(id + "g", "#FFE100", "#FFE100");
      var beams = "";
      for (var i = 0; i < 7; i++) {
        beams += '<path d="M200 150 L' + (i * 70 - 20) + ' -10 L' + (i * 70 + 10) + ' -10 Z" fill="#FFE100" opacity="' + (0.05 + (i % 3) * 0.03) + '"/>';
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' + beams +
        '<circle cx="200" cy="150" r="120" fill="url(#' + id + 'g)" opacity=".35"/>' +
        '<circle cx="200" cy="150" r="92" fill="#0d0d0f" stroke="#2c2d33" stroke-width="10"/>' +
        aperture(200, 150, 82, 7, 0.42, "#24252a", "#3a3b42") +
        '<circle cx="200" cy="150" r="26" fill="#FFE100"/><circle cx="200" cy="150" r="10" fill="#fff8b3"/>' +
        '<circle cx="200" cy="150" r="110" fill="none" stroke="#FFE100" stroke-width="1" opacity=".5" stroke-dasharray="2 6"/>',
        d
      );
    },
    zvideo: function (id) {
      var d = lin(id + "b", ["#0f1013", "#1b1c21"]);
      var frames = "";
      for (var i = 0; i < 4; i++) {
        frames += '<rect x="' + (28 + i * 90) + '" y="96" width="76" height="108" rx="6" fill="#26272d" stroke="#3b3c44"/>' +
          '<path d="M' + (40 + i * 90) + " 190 Q" + (66 + i * 90) + " " + (130 + i * 12) + " " + (92 + i * 90) + ' 190Z" fill="#FFE100" opacity="' + (0.25 + i * 0.18) + '"/>';
      }
      var holes = "";
      for (var j = 0; j < 20; j++) {
        holes += '<rect x="' + (12 + j * 20) + '" y="74" width="10" height="8" rx="2" fill="#3b3c44"/><rect x="' + (12 + j * 20) + '" y="218" width="10" height="8" rx="2" fill="#3b3c44"/>';
      }
      var wave = "M20 262";
      var r = rng(7);
      for (var k = 0; k < 36; k++) wave += " L" + (20 + k * 10.3) + " " + (262 - r() * 22 * Math.sin(k / 3) - 4);
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' + holes + frames +
        '<circle cx="356" cy="36" r="9" fill="#ff3b30"/><text x="300" y="41" fill="#f2f2f2" font-family="Archivo, sans-serif" font-size="14" font-weight="700" letter-spacing="2">REC</text>' +
        '<path d="' + wave + '" fill="none" stroke="#FFE100" stroke-width="2" opacity=".8"/>',
        d
      );
    },
    zseries: function (id) {
      var d = lin(id + "b", ["#1a1b1f", "#0e0f11"]) + rad(id + "g", "#FFE100", "#FFE100");
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        '<circle cx="230" cy="170" r="140" fill="url(#' + id + 'g)" opacity=".18"/>' +
        '<g fill="none" stroke="#FFE100" stroke-width="3" stroke-linejoin="round">' +
        '<path d="M80 110 h60 l18 -28 h70 l18 28 h80 a14 14 0 0 1 14 14 v110 a14 14 0 0 1 -14 14 h-246 a14 14 0 0 1 -14 -14 v-110 a14 14 0 0 1 14 -14z"/>' +
        '<circle cx="210" cy="180" r="58"/><circle cx="210" cy="180" r="42" opacity=".6"/><circle cx="210" cy="180" r="22" opacity=".35"/>' +
        '<rect x="96" y="124" width="34" height="18" rx="4" opacity=".7"/><circle cx="300" cy="96" r="9" opacity=".7"/></g>' +
        '<text x="168" y="104" fill="#FFE100" font-family="Archivo, sans-serif" font-size="13" font-weight="800" letter-spacing="3">Z</text>',
        d
      );
    },
    coolpix: function (id) {
      var d = lin(id + "s", ["#7fb6e6", "#d9ecf7"]);
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        '<circle cx="300" cy="80" r="26" fill="#fffbe0"/>' +
        '<path d="M0 220 L70 150 L120 190 L190 110 L260 180 L310 140 L400 210 V300 H0Z" fill="#3c6e8f"/>' +
        '<path d="M190 110 L215 135 L200 132 L185 140 L170 130Z" fill="#eef6fb"/>' +
        '<path d="M0 250 L90 210 L170 240 L260 205 L400 250 V300 H0Z" fill="#244a63"/>' +
        '<path d="M120 70 L128 64 L136 70 M150 92 L157 86 L164 92" stroke="#244a63" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<g stroke="#FFE100" stroke-width="4" fill="none"><path d="M110 60 h-24 v24"/><path d="M290 60 h24 v24"/><path d="M110 240 h-24 v-24"/><path d="M290 240 h24 v-24"/></g>' +
        '<rect x="150" y="262" width="100" height="18" rx="9" fill="#111" opacity=".75"/><text x="200" y="275" text-anchor="middle" fill="#FFE100" font-family="Archivo, sans-serif" font-size="11" font-weight="700">125x ZOOM</text>',
        d
      );
    },
    cityscape: function (id) {
      var d = lin(id + "s", ["#2a1446", "#b0306b", "#f47a3c", "#ffc75a"]) + rad(id + "g", "#ffe7a0", "#ff9a3c");
      var r = rng(42), city = "", lights = "";
      var x = 0;
      while (x < 400) {
        var w = 18 + r() * 34, h = 50 + r() * 120;
        if (x > 150 && x < 200) h = 175;
        city += '<rect x="' + x.toFixed(1) + '" y="' + (300 - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '"/>';
        for (var wy = 300 - h + 10; wy < 285; wy += 12) {
          for (var wx = x + 5; wx < x + w - 6; wx += 9) {
            if (r() > 0.62) lights += '<rect x="' + wx.toFixed(1) + '" y="' + wy.toFixed(1) + '" width="3.5" height="5"/>';
          }
        }
        x += w + 2;
      }
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        '<circle cx="250" cy="196" r="110" fill="url(#' + id + 'g)" opacity=".7"/><circle cx="250" cy="196" r="38" fill="#fff1c4"/>' +
        '<g fill="#1a0f26">' + city + '</g><g fill="#FFE100" opacity=".85">' + lights + "</g>" +
        '<path d="M0 292 Q200 270 400 292" stroke="#ffd36b" stroke-width="2" fill="none" opacity=".6"/>',
        d
      );
    },
    masterclass: function (id) {
      var d = lin(id + "b", ["#121316", "#24180a"], 1, 1);
      var streaks = "", r = rng(11);
      for (var i = 0; i < 18; i++) {
        var y = 20 + r() * 260, len = 80 + r() * 200, x = r() * 300;
        streaks += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="' + len.toFixed(0) + '" height="' + (1 + r() * 3).toFixed(1) + '" rx="2" fill="' + (i % 3 ? "#FFE100" : "#ff8a00") + '" opacity="' + (0.15 + r() * 0.5).toFixed(2) + '"/>';
      }
      var rings = "";
      for (var k = 0; k < 6; k++) rings += '<circle cx="150" cy="150" r="' + (24 + k * 18) + '" fill="none" stroke="#FFE100" stroke-width="' + (k === 0 ? 6 : 1.5) + '" opacity="' + (0.9 - k * 0.13) + '"/>';
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' + streaks + rings +
        '<circle cx="150" cy="150" r="20" fill="#0b0b0c"/><circle cx="143" cy="143" r="5" fill="#fff" opacity=".6"/>' +
        '<path d="M260 210 l40 -20 v40z" fill="#FFE100"/>',
        d
      );
    },
    seeing: function (id) {
      var d = lin(id + "b", ["#f3efe6", "#e4dccb"]);
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        '<path d="M40 150 Q200 30 360 150 Q200 270 40 150Z" fill="#fffdf7" stroke="#111" stroke-width="4"/>' +
        '<circle cx="200" cy="150" r="62" fill="#111"/>' +
        aperture(200, 150, 56, 6, 0.38, "#1f1f22", "#3a3a40") +
        '<circle cx="200" cy="150" r="18" fill="#FFE100"/><circle cx="214" cy="132" r="8" fill="#fff" opacity=".85"/>' +
        '<g stroke="#111" stroke-width="2" opacity=".5"><line x1="133" y1="0" x2="133" y2="300"/><line x1="267" y1="0" x2="267" y2="300"/><line x1="0" y1="100" x2="400" y2="100"/><line x1="0" y1="200" x2="400" y2="200"/></g>',
        d
      );
    },
    wildlife: function (id) {
      var d = lin(id + "s", ["#3b1d0e", "#c4541c", "#f5a54a", "#fde3a0"]);
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        '<circle cx="120" cy="190" r="56" fill="#ffe6a8" opacity=".9"/>' +
        '<path d="M0 230 Q100 215 200 228 T400 222 V300 H0Z" fill="#2a1408"/>' +
        '<g fill="#1a0c05"><rect x="268" y="150" width="7" height="82"/>' +
        '<path d="M210 150 Q272 118 340 148 Q300 140 272 146 Q244 140 210 150Z"/><path d="M226 138 Q272 104 326 136 Q290 126 272 132 Q252 126 226 138Z"/>' +
        '<path d="M60 236 l6 -26 q4 -14 14 -16 l10 -30 l6 0 l-4 30 q24 2 34 10 l2 32 h-6 l-2 -24 l-30 2 l-4 22 h-6 l2 -22 l-10 0 l-4 22z"/></g>',
        d
      );
    },
    astro: function (id) {
      var d = lin(id + "s", ["#05060f", "#141a3a", "#2a2350"]) + lin(id + "m", ["#ffffff", "#9fb2ff"], 1, 1);
      var r = rng(99), stars = "";
      for (var i = 0; i < 140; i++) stars += '<circle cx="' + (r() * 400).toFixed(1) + '" cy="' + (r() * 230).toFixed(1) + '" r="' + (r() * 1.3 + 0.2).toFixed(2) + '" opacity="' + (0.4 + r() * 0.6).toFixed(2) + '"/>';
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 's)"/>' +
        '<path d="M-20 260 Q180 120 420 20" stroke="url(#' + id + 'm)" stroke-width="70" fill="none" opacity=".12"/>' +
        '<path d="M-20 260 Q180 120 420 20" stroke="#ffe9c2" stroke-width="22" fill="none" opacity=".1"/>' +
        '<g fill="#fff">' + stars + "</g>" +
        '<path d="M0 250 L60 230 L110 244 L170 214 L230 240 L300 222 L400 246 V300 H0Z" fill="#06060a"/>' +
        '<path d="M300 222 v-18 h4 v18" fill="#06060a"/><circle cx="302" cy="200" r="3" fill="#FFE100"/>',
        d
      );
    },
    portrait: function (id) {
      var d = lin(id + "b", ["#2b1a14", "#5a3527"], 1, 1) + rad(id + "g", "#ffcf9e", "#ffcf9e");
      return svg(
        '<rect width="400" height="300" fill="url(#' + id + 'b)"/>' +
        '<circle cx="290" cy="90" r="150" fill="url(#' + id + 'g)" opacity=".45"/>' +
        '<path d="M150 300 Q150 210 200 196 Q186 180 184 150 Q182 96 226 92 Q272 92 270 148 Q268 182 250 196 Q306 212 306 300Z" fill="#1a0f0b"/>' +
        '<path d="M262 120 Q272 150 258 186" stroke="#ffd9a8" stroke-width="4" fill="none" opacity=".8" stroke-linecap="round"/>' +
        '<path d="M300 236 Q306 270 304 300" stroke="#ffd9a8" stroke-width="3" fill="none" opacity=".5"/>',
        d
      );
    },
    sport: function (id) {
      var d = lin(id + "b", ["#0b2a1e", "#145a3c"]);
      var lanes = "";
      for (var i = 0; i < 7; i++) lanes += '<path d="M-40 ' + (120 + i * 30) + ' Q200 ' + (80 + i * 34) + ' 440 ' + (130 + i * 28) + '" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/>';
      var blur = "";
      for (var j = 0; j < 8; j++) blur += '<rect x="' + (40 + j * 14) + '" y="' + (120 + j * 4) + '" width="' + (120 - j * 10) + '" height="3" fill="#FFE100" opacity="' + (0.6 - j * 0.06) + '"/>';
      return svg(
        '<rect width="400" height="300" fill="#b54a2a"/><rect width="400" height="96" fill="url(#' + id + 'b)"/>' + lanes + blur +
        '<g fill="#111"><circle cx="248" cy="110" r="13"/><path d="M236 124 l-22 40 l-30 16 l6 8 l34 -14 l14 -22 l10 30 l-14 34 l10 4 l18 -38 l-8 -40 l20 10 l22 -8 l-4 -9 l-18 6z"/></g>',
        d
      );
    }
  };

  root.nsArt = function (kind) {
    n += 1;
    var fn = scenes[kind] || scenes.lightcraft;
    return fn("a" + n + kind);
  };
})(window);
