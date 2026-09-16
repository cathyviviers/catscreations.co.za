(function () {
  'use strict';

  var GA_ID = 'G-0KLCS93P9M';
  var page = window.location.pathname;

  function send(eventName, params) {
    // Use gtag() if available (loaded by GTM's GA4 Configuration tag)
    // Fall back to dataLayer for GTM to pick up
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: eventName }, params));
    }
  }

  // ── CLICK TRACKING (event delegation) ───────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;

    if (el.matches('.cookie-btn-accept')) {
      send('cookie_consent', { choice: 'accepted' });
      return;
    }
    if (el.matches('.cookie-btn-decline')) {
      send('cookie_consent', { choice: 'declined' });
      return;
    }
    if (el.matches('.nav-cta')) {
      send('cta_click', { cta_label: 'nav_get_in_touch', page: page });
      return;
    }
    if (el.matches('.nav-blog')) {
      send('nav_click', { nav_item: 'blog', page: page });
      return;
    }
    if (el.matches('a[href="#services"]')) {
      send('cta_click', { cta_label: 'hero_see_services', page: page });
      return;
    }
    if (el.matches('a[href="#contact"]') && !el.closest('nav')) {
      send('cta_click', { cta_label: 'hero_get_a_quote', page: page });
      return;
    }

    var serviceCard = el.closest('.service-card');
    if (serviceCard) {
      var serviceTitle = serviceCard.querySelector('h3');
      send('service_card_click', {
        service_name: serviceTitle ? serviceTitle.textContent.trim() : serviceCard.getAttribute('href'),
        page: page
      });
      return;
    }

    var blogCard = el.closest('.blog-card');
    if (blogCard) {
      var blogTitle = blogCard.querySelector('.blog-card-title');
      send('blog_post_click', {
        post_title: blogTitle ? blogTitle.textContent.trim() : el.getAttribute('href'),
        page: page
      });
      return;
    }

    if (el.closest('.whatsapp-float')) {
      send('whatsapp_click', { page: page });
      return;
    }

    var footerLink = el.closest('footer a[aria-label]');
    if (footerLink) {
      send('social_click', {
        platform: footerLink.getAttribute('aria-label').toLowerCase(),
        location: 'footer',
        page: page
      });
      return;
    }

    if (el.href && el.href.includes('instagram.com') && el.matches('.btn')) {
      send('social_click', { platform: 'instagram', location: 'instagram_section', page: page });
      return;
    }

    if (el.href && el.href.includes('upwork.com')) {
      send('outbound_click', { destination: 'upwork', page: page });
      return;
    }

    if (el.href && el.href.includes('/privacy')) {
      send('privacy_policy_click', { page: page });
      return;
    }

    if (el.tagName === 'A' && el.hostname && el.hostname !== location.hostname) {
      send('outbound_click', { destination: el.hostname, url: el.href, page: page });
    }
  });

  // ── FORM SUBMIT TRACKING ────────────────────────────────────────────────────
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (form.action && form.action.includes('formspree.io')) {
      send('form_submit', { form_type: 'contact', page: page });
    }
  });

  // ── SCROLL DEPTH ────────────────────────────────────────────────────────────
  var milestones = [25, 50, 75, 100];
  var fired = {};
  window.addEventListener('scroll', function () {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var pct = Math.round((window.scrollY / docHeight) * 100);
    milestones.forEach(function (m) {
      if (!fired[m] && pct >= m) {
        fired[m] = true;
        send('scroll_depth', { depth_percent: m, page: page });
      }
    });
  }, { passive: true });

  // ── SECTION VISIBILITY (Intersection Observer) ───────────────────────────────
  if ('IntersectionObserver' in window) {
    var sections = document.querySelectorAll('section[id], div[id]');
    var seen = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (entry.isIntersecting && id && !seen[id]) {
          seen[id] = true;
          send('section_view', { section_id: id, page: page });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(function (s) { observer.observe(s); });
  }

})();
