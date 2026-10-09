(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia('(hover: none)').matches;

  // ── MOUSE POSITION (used by sparkles) ────────────────────────────────────
  if (!touch) {
    document.addEventListener('mousemove', function (e) {
      window._ccMx = e.clientX; window._ccMy = e.clientY;
    });
  }

  // ── CURSOR SPARKLE TRAIL ──────────────────────────────────────────────────
  if (!touch && !reduced) {
    var lastSparkle = 0;
    document.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - lastSparkle < 60) return;
      lastSparkle = now;
      var s = document.createElement('span');
      s.className = 'cc-sparkle';
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  }

  // ── MAGNETIC BUTTONS ──────────────────────────────────────────────────────
  if (!touch && !reduced) {
    document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) * 0.28;
        var dy = (e.clientY - cy) * 0.28;
        btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        btn.style.transition = 'transform 0.1s linear';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(.23,1,.32,1), background 0.25s, box-shadow 0.25s, color 0.25s';
      });
    });
  }

  // ── SERVICE CARD 3D TILT ──────────────────────────────────────────────────
  if (!touch && !reduced) {
    document.querySelectorAll('.service-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        var dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        card.style.transform = 'perspective(800px) rotateY(' + (dx * 8) + 'deg) rotateX(' + (-dy * 6) + 'deg) translateY(-4px)';
        card.style.transition = 'transform 0.08s linear, box-shadow 0.2s';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease, box-shadow 0.2s';
      });
    });
  }

  // ── ANIMATED COUNTERS ─────────────────────────────────────────────────────
  if (!reduced && 'IntersectionObserver' in window) {
    var counters = document.querySelectorAll('.testimonial-stat-value');
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        counterObserver.unobserve(entry.target);
        var el = entry.target;
        var end = parseFloat(el.textContent);
        var isDecimal = el.textContent.includes('.');
        var duration = 1200;
        var start = 0;
        var step = 16;
        var steps = duration / step;
        var inc = end / steps;
        var current = 0;
        var timer = setInterval(function () {
          current = Math.min(current + inc, end);
          el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
          if (current >= end) clearInterval(timer);
        }, step);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  // ── SCROLL-TO-TOP BUTTON ──────────────────────────────────────────────────
  var topBtn = document.getElementById('cc-scroll-top');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('cc-scroll-top--visible', window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── READING PROGRESS BAR ──────────────────────────────────────────────────
  var bar = document.getElementById('cc-progress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

})();


// ── CAT PAW SCROLL TRAIL ──────────────────────────────────────────────────
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  var PAW = '<svg viewBox="0 0 40 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="20" cy="32" rx="11" ry="9"/><ellipse cx="8" cy="19" rx="5.5" ry="4.5"/><ellipse cx="16" cy="14" rx="5.5" ry="4.5"/><ellipse cx="25" cy="14" rx="5.5" ry="4.5"/><ellipse cx="33" cy="19" rx="5.5" ry="4.5"/></svg>';

  var stepIndex = 0;
  var lastScrollY = window.scrollY;
  var dist = 0;
  var STEP = 90;
  var fadeTimer = null;
  var paws = [];
  var MAX = 25;

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    dist += Math.abs(y - lastScrollY);
    lastScrollY = y;

    clearTimeout(fadeTimer);
    paws.forEach(function (p) { p.classList.add('cc-paw--visible'); });

    if (dist >= STEP) {
      dist = 0;
      var isLeft = stepIndex % 2 === 0;
      var el = document.createElement('div');
      el.className = 'cc-paw ' + (isLeft ? 'cc-paw--l' : 'cc-paw--r');
      el.innerHTML = PAW;
      el.style.top = (y + window.innerHeight * 0.55 + (stepIndex % 4) * 6) + 'px';
      document.body.appendChild(el);
      requestAnimationFrame(function () { el.classList.add('cc-paw--visible'); });
      paws.push(el);
      stepIndex++;
      if (paws.length > MAX) { paws.shift().remove(); }
    }

    fadeTimer = setTimeout(function () {
      paws.forEach(function (p) { p.classList.remove('cc-paw--visible'); });
    }, 700);
  }, { passive: true });
})();
