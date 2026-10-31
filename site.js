(() => {
  document.documentElement.classList.add('has-js');
  const header = document.querySelector('.site-header');
  const body = document.body;
  const desktopNav = document.querySelector('.desktop-nav');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const isDesktop = () => window.matchMedia('(min-width: 851px)').matches;

  // Mobile menu
  if (toggle && menu) {
    const closeMobile = () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('mobile-nav-open');
    };
    const openMobile = () => {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      body.classList.add('mobile-nav-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      open ? closeMobile() : openMobile();
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobile();
    });
    window.addEventListener('resize', () => {
      if (isDesktop()) closeMobile();
    });
  }

  // Reveal motion
  const obs = window.IntersectionObserver
    ? new IntersectionObserver((items) => items.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add('in-view');
          obs.unobserve(item.target);
        }
      }), { threshold: 0.08 })
    : null;
  document.querySelectorAll('.opening,.difference,.services-editorial,.industry-section,.editorial-note,.process,.page-hero h1,.directory-row,.lead-spread,.ruled-section,.article-photo').forEach(el => {
    if (obs) {
      el.classList.add('reveal');
      obs.observe(el);
    }
  });

  // Active top-level nav item
  const topMap = {
    services: ['services.html', 'bookkeeping.html', 'tax-support.html', 'payroll.html', 'financial-reporting.html', 'forecasting.html', 'specialized.html'],
    industries: ['industries.html', 'restaurants.html', 'construction.html', 'retail.html', 'property.html', 'logistics.html', 'professional.html', 'nonprofits.html'],
    approach: ['approach.html'],
    about: ['about.html', 'why-pcbt.html', 'contact.html', 'privacy.html'],
    insights: ['insights.html', 'bookkeeping-habits.html', 'cash-flow-clarity.html', 'tax-time-checklist.html']
  };
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  let currentTop = 'services';
  if (current === 'index.html') currentTop = '';
  Object.entries(topMap).forEach(([key, pages]) => {
    if (pages.includes(current)) currentTop = key;
  });
  if (desktopNav) {
    desktopNav.querySelectorAll('a').forEach(link => {
      const key = link.getAttribute('href').replace('.html', '').replace(/[^a-z-]/g, '');
      if (key === currentTop) link.classList.add('active');
    });
  }

  // Desktop preview menu
  const menuData = {
    services: {
      label: 'What we do',
      intro: 'Core bookkeeping, reporting and tax support shaped for small business operations.',
      cta: { href: 'services.html', label: 'Explore all services' },
      items: [
        { href: 'bookkeeping.html', title: 'Bookkeeping & Reconciliation', desc: 'Reliable monthly bookkeeping and reconciliations.', image: 'assets/hero/bookkeeping-hero.webp' },
        { href: 'tax-support.html', title: 'Tax Preparation & Support', desc: 'Organized records that make tax season smoother.', image: 'assets/hero/tax-support-hero.webp' },
        { href: 'payroll.html', title: 'Payroll Management', desc: 'A practical payroll routine for your team.', image: 'assets/hero/payroll-hero.webp' },
        { href: 'financial-reporting.html', title: 'Financial Reporting', desc: 'Reporting that helps you see the business clearly.', image: 'assets/hero/financial-reporting-hero.webp' },
        { href: 'forecasting.html', title: 'Budgeting & Forecasting', desc: 'A more useful view of what comes next.', image: 'assets/hero/forecasting-hero.webp' },
        { href: 'specialized.html', title: 'Specialized Accounting', desc: 'Support tailored to special requirements and sectors.', image: 'assets/hero/specialized-hero.webp' }
      ]
    },
    industries: {
      label: 'Who we serve',
      intro: 'Every industry has its own rhythm. Our work is shaped around how that business actually runs.',
      cta: { href: 'industries.html', label: 'See all industries' },
      items: [
        { href: 'restaurants.html', title: 'Restaurants & Cafés', desc: 'For kitchen teams, cafés and hospitality businesses.', image: 'assets/hero/restaurants-hero.webp' },
        { href: 'construction.html', title: 'Construction & Trades', desc: 'For contractors, builders and trade-based teams.', image: 'assets/hero/construction-hero.webp' },
        { href: 'retail.html', title: 'Retail & Hardware', desc: 'For owner-operated retail and inventory-heavy stores.', image: 'assets/hero/retail-hero.webp' },
        { href: 'property.html', title: 'Property & Rentals', desc: 'For landlords, property managers and rental operations.', image: 'assets/hero/property-hero.webp' },
        { href: 'logistics.html', title: 'Moving & Logistics', desc: 'For warehousing, delivery and moving operations.', image: 'assets/hero/logistics-hero.webp' },
        { href: 'professional.html', title: 'Professional Services', desc: 'For offices, consultancies and service-based firms.', image: 'assets/hero/professional-hero.webp' },
        { href: 'nonprofits.html', title: 'Nonprofits', desc: 'For organizations serving the community with care.', image: 'assets/hero/nonprofits-hero.webp' }
      ]
    },
    approach: {
      label: 'Our approach',
      intro: 'A simpler process designed to stay practical, human and easy to work with.',
      cta: { href: 'approach.html', label: 'Learn how we work' },
      items: [
        { href: 'approach.html', title: 'How we work', desc: 'A simpler way to work together.', image: 'assets/hero/approach-hero.webp' },
        { href: 'why-pcbt.html', title: 'Why PCB&T', desc: 'What makes the relationship different.', image: 'assets/hero/why-pcbt-hero.webp' },
        { href: 'about.html', title: 'About PCB&T', desc: 'A local team grounded in practical support.', image: 'assets/hero/about-hero.webp' },
        { href: 'contact.html', title: 'Start a conversation', desc: 'Tell us what support would make the biggest difference.', image: 'assets/hero/contact-hero.webp' }
      ]
    },
    about: {
      label: 'About',
      intro: 'Get a feel for the team, the philosophy and the way PCB&T works with local businesses.',
      cta: { href: 'about.html', label: 'More about PCB&T' },
      items: [
        { href: 'about.html', title: 'About PCB&T', desc: 'A thoughtful bookkeeping and tax support partner.', image: 'assets/hero/about-hero.webp' },
        { href: 'why-pcbt.html', title: 'Why PCB&T', desc: 'What clients value in the relationship.', image: 'assets/hero/why-pcbt-hero.webp' },
        { href: 'privacy.html', title: 'Privacy', desc: 'How information is handled with care.', image: 'assets/hero/privacy-hero.webp' },
        { href: 'contact.html', title: 'Contact', desc: 'Ready to start a conversation?', image: 'assets/hero/contact-hero.webp' }
      ]
    },
    insights: {
      label: 'Insights',
      intro: 'A small library of practical thinking around financial routines, clarity and tax-time readiness.',
      cta: { href: 'insights.html', label: 'Visit insights' },
      items: [
        { href: 'bookkeeping-habits.html', title: 'Bookkeeping habits', desc: 'Small routines that reduce friction all year.', image: 'assets/hero/bookkeeping-habits-hero.webp' },
        { href: 'cash-flow-clarity.html', title: 'Cash flow clarity', desc: 'See the business more clearly with better timing.', image: 'assets/hero/cash-flow-clarity-hero.webp' },
        { href: 'tax-time-checklist.html', title: 'Tax-time checklist', desc: 'A calmer way to prepare for tax season.', image: 'assets/hero/tax-time-checklist-hero.webp' },
        { href: 'insights.html', title: 'All insights', desc: 'Explore the editorial hub.', image: 'assets/hero/insights-hero.webp' }
      ]
    }
  };

  if (header && desktopNav) {
    const panel = document.createElement('div');
    panel.className = 'nav-preview-menu';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="nav-preview-grid">
        <div class="nav-preview-intro">
          <span class="nav-preview-kicker"></span>
          <h3 class="nav-preview-title"></h3>
          <p class="nav-preview-copy"></p>
          <a class="nav-preview-cta" href="#">Explore <span aria-hidden="true">↗</span></a>
        </div>
        <div class="nav-preview-links"></div>
        <a class="nav-preview-card" href="#">
          <div class="nav-preview-image-wrap"><img alt="" class="nav-preview-image" src=""/></div>
          <div class="nav-preview-card-copy">
            <strong class="nav-preview-card-title"></strong>
            <p class="nav-preview-card-desc"></p>
            <span class="nav-preview-card-action">Open page <span aria-hidden="true">↗</span></span>
          </div>
        </a>
      </div>`;
    header.appendChild(panel);

    const introKicker = panel.querySelector('.nav-preview-kicker');
    const introTitle = panel.querySelector('.nav-preview-title');
    const introCopy = panel.querySelector('.nav-preview-copy');
    const introCta = panel.querySelector('.nav-preview-cta');
    const linksWrap = panel.querySelector('.nav-preview-links');
    const previewCard = panel.querySelector('.nav-preview-card');
    const previewImg = panel.querySelector('.nav-preview-image');
    const previewTitle = panel.querySelector('.nav-preview-card-title');
    const previewDesc = panel.querySelector('.nav-preview-card-desc');

    let openKey = null;
    let closeTimer = null;

    const setPreview = (item) => {
      previewImg.src = item.image;
      previewImg.alt = item.title;
      previewCard.href = item.href;
      previewTitle.textContent = item.title;
      previewDesc.textContent = item.desc;
      linksWrap.querySelectorAll('a').forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === item.href));
    };

    const buildMenu = (key) => {
      const data = menuData[key];
      if (!data) return;
      introKicker.textContent = 'Explore';
      introTitle.textContent = data.label;
      introCopy.textContent = data.intro;
      introCta.href = data.cta.href;
      introCta.innerHTML = `${data.cta.label} <span aria-hidden="true">↗</span>`;
      linksWrap.innerHTML = data.items.map((item) => `
        <a class="nav-preview-link" href="${item.href}" data-image="${item.image}" data-title="${item.title}" data-desc="${item.desc}">
          <strong>${item.title}</strong>
          <span>${item.desc}</span>
        </a>`).join('');
      const links = Array.from(linksWrap.querySelectorAll('.nav-preview-link'));
      links.forEach((link, idx) => {
        const item = data.items[idx];
        link.addEventListener('mouseenter', () => setPreview(item));
        link.addEventListener('focus', () => setPreview(item));
      });
      setPreview(data.items[0]);
    };

    const openMenu = (key, trigger) => {
      if (!isDesktop() || !menuData[key]) return;
      clearTimeout(closeTimer);
      if (openKey !== key) buildMenu(key);
      openKey = key;
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      header.classList.add('menu-open');
      desktopNav.querySelectorAll('a').forEach(a => a.classList.remove('is-open'));
      trigger.classList.add('is-open');
    };

    const closeMenu = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        openKey = null;
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        header.classList.remove('menu-open');
        desktopNav.querySelectorAll('a').forEach(a => a.classList.remove('is-open'));
      }, 100);
    };

    const linkKey = (href) => {
      const page = href.replace('.html', '');
      if (page === 'services') return 'services';
      if (page === 'industries') return 'industries';
      if (page === 'approach') return 'approach';
      if (page === 'about') return 'about';
      if (page === 'insights') return 'insights';
      return null;
    };

    desktopNav.querySelectorAll('a').forEach(link => {
      const key = linkKey(link.getAttribute('href'));
      if (!key) return;
      link.setAttribute('data-menu-key', key);
      link.addEventListener('mouseenter', () => openMenu(key, link));
      link.addEventListener('focus', () => openMenu(key, link));
    });
    desktopNav.addEventListener('mouseleave', closeMenu);
    panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    panel.addEventListener('mouseleave', closeMenu);
    // Scrolling dismisses the desktop preview so the header can slide away cleanly.
    window.addEventListener('scroll', () => {
      if (openKey === null || !isDesktop()) return;
      clearTimeout(closeTimer);
      openKey = null;
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      header.classList.remove('menu-open');
      desktopNav.querySelectorAll('a').forEach(a => a.classList.remove('is-open'));
    }, { passive: true });
    header.addEventListener('mouseleave', () => {
      if (isDesktop()) closeMenu();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (!isDesktop()) {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        header.classList.remove('menu-open');
      }
    });
  }

  // Header show/hide on scroll
  if (header) {
    let lastY = window.scrollY;
    const updateHeaderState = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastY;
      if (header.classList.contains('on-hero')) {
        header.classList.toggle('is-scrolled', y > 88);
      } else {
        header.classList.add('is-scrolled');
      }
      if (!body.classList.contains('mobile-nav-open') && !header.classList.contains('menu-open')) {
        if (y > 140 && scrollingDown) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
      }
      lastY = y;
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  // Contact form mailto
  const f = document.getElementById('contact-form');
  if (f) {
    f.addEventListener('submit', event => {
      event.preventDefault();
      if (!f.reportValidity()) return;
      const name = f.querySelector('[name="name"]').value.trim();
      const email = f.querySelector('[name="email"]').value.trim();
      const service = f.querySelector('[name="service"]').value;
      const message = f.querySelector('[name="message"]').value.trim();
      const subject = 'PCB&T website enquiry — ' + service;
      const bodyText = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Your email application will open with a prepared message. Please send it there to complete your enquiry.';
      window.location.href = 'mailto:Bookkeeping@NCPCGROUP.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
    });
  }
})();
