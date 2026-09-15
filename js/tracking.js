(function () {
  'use strict';

  function push(eventName, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params));
  }

  var page = window.location.pathname;

  // ── CLICK TRACKING (event delegation) ───────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;

    // Cookie consent buttons
    if (el.matches('.cookie-btn-accept')) {
      push('cookie_consent', { choice: 'accepted' });
      return;
    }
    if (el.matches('.cookie-btn-decline')) {
      push('cookie_consent', { choice: 'declined' });
      return;
    }

    // Nav "Get in Touch" CTA
    if (el.matches('.nav-cta')) {
      push('cta_click', { cta_label: 'nav_get_in_touch', page: page });
      return;
    }

    // Nav blog link
    if (el.matches('.nav-blog')) {
      push('nav_click', { nav_item: 'blog', page: page });
      return;
    }

    // Hero CTAs
    if (el.matches('a[href="#services"]')) {
      push('cta_click', { cta_label: 'hero_see_services', page: page });
      return;
    }
    if (el.matches('a[href="#contact"]') && !el.closest('nav')) {
      push('cta_click', { cta_label: 'hero_get_a_quote', page: page });
      return;
    }

    // Service cards on home page
    var serviceCard = el.closest('.service-card');
    if (serviceCard) {
      var serviceTitle = serviceCard.querySelector('h3');
      push('service_card_click', {
        service_name: serviceTitle ? serviceTitle.textContent.trim() : serviceCard.getAttribute('href'),
        page: page
      });
      return;
    }

    // Blog post cards
    var blogCard = el.closest('.blog-card');
    if (blogCard) {
      var blogTitle = blogCard.querySelector('.blog-card-title');
      push('blog_post_click', {
        post_title: blogTitle ? blogTitle.textContent.trim() : el.getAttribute('href'),
        page: page
      });
      return;
    }

    // WhatsApp float button
    if (el.closest('.whatsapp-float')) {
      push('whatsapp_click', { page: page });
      return;
    }

    // Footer social links
    var footerLink = el.closest('footer a[aria-label]');
    if (footerLink) {
      push('social_click', {
        platform: footerLink.getAttribute('aria-label').toLowerCase(),
        location: 'footer',
        page: page
      });
      return;
    }

    // Instagram "Follow" button in Instagram section
    if (el.href && el.href.includes('instagram.com') && el.matches('.btn')) {
      push('social_click', { platform: 'instagram', location: 'instagram_section', page: page });
      return;
    }

    // Upwork profile link
    if (el.href && el.href.includes('upwork.com')) {
      push('outbound_click', { destination: 'upwork', page: page });
      return;
    }

    // Privacy policy link in footer
    if (el.href && el.href.includes('/privacy')) {
      push('privacy_policy_click', { page: page });
      return;
    }

    // Catch-all: any other outbound link
    if (el.tagName === 'A' && el.hostname && el.hostname !== location.hostname) {
      push('outbound_click', { destination: el.hostname, url: el.href, page: page });
    }
  });

  // ── FORM SUBMIT TRACKING ────────────────────────────────────────────────────
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (form.action && form.action.includes('formspree.io')) {
      push('form_submit', { form_type: 'contact', page: page });
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
        push('scroll_depth', { depth_percent: m, page: page });
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
          push('section_view', { section_id: id, page: page });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(function (s) { observer.observe(s); });
  }

})();
