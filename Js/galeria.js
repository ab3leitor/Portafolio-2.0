document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = false;
  const nav = document.querySelector('.site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const progress = document.querySelector('.scroll-progress');
  const glow = document.querySelector('.cursor-glow');
  const themeToggle = document.getElementById('themeToggle');
  const languageToggle = document.getElementById('languageToggle');
  const year = document.getElementById('year');
  const filterBar = document.querySelector('.gallery-filters');
  const indicator = document.querySelector('.filter-indicator');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.gallery-card')];

  if (year) year.textContent = new Date().getFullYear();

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
    nav?.classList.toggle('scrolled', scrollY > 30);
  };
  addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  menuButton?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', open);
    menuButton.innerHTML = `<i class="bi bi-${open ? 'x-lg' : 'list'}"></i>`;
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.innerHTML = '<i class="bi bi-list"></i>';
  }));

  if (!reducedMotion) {
    addEventListener('pointermove', event => {
      if (!glow) return;
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(element);
  });

  const moveIndicator = button => {
    if (!indicator || !filterBar || matchMedia('(max-width: 700px)').matches) return;
    const barRect = filterBar.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    indicator.style.width = `${buttonRect.width}px`;
    indicator.style.transform = `translateX(${buttonRect.left - barRect.left - 7}px)`;
  };

  const applyFilter = button => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active);
    });
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.classList.toggle('is-hidden', !visible);
    });
    moveIndicator(button);
  };

  filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button)));
  const activeFilter = document.querySelector('.filter-button.active');
  if (activeFilter) requestAnimationFrame(() => moveIndicator(activeFilter));
  addEventListener('resize', () => activeFilter && moveIndicator(document.querySelector('.filter-button.active')), { passive: true });

  const content = {
    en: {
      htmlLang: 'en',
      languageButton: 'ES',
      nav: ['Portfolio', 'Stack', 'Gallery', 'Services'],
      navCta: 'Let us talk',
      heroEyebrow: 'My projects',
      heroTitle: 'Main project gallery.',
      heroCopy: 'A selection of real repositories published on GitHub, turned into a visual experience with filters, motion and interactive cards.',
      featuredLabel: 'Featured project',
      featuredMeta: 'Web App / Fullstack / Commercial management',
      featuredTitle: 'Web ventas',
      featuredCopy: 'Admin panel for managing clients, briefs, quotes, projects, payments and monthly maintenance from an operational dashboard.',
      featuredButton: 'View GitHub',
      sectionLabel: 'My projects',
      galleryTitle: 'Explore by category.',
      filters: ['All', 'Landing Pages', 'Web Apps', 'UI Design', 'Fullstack'],
      cards: [
        ['Web Apps / Fullstack', 'Web ventas', 'Admin system for organizing clients, quotes, projects, payments, briefs and maintenance in one operation.'],
        ['Web Apps / Fullstack', 'MyPage', 'First attempt at building a complete intranet: users, forums, messages, files and configuration in a larger-scale app.'],
        ['Landing Pages / UI Design', 'Cafe Bruma', 'Commercial presentation for specialty coffee with an editorial style, visual cart and brand focus.'],
        ['Landing Pages / UI Design', 'GreenMedical', 'Brand experience for a natural laboratory, with a visual hero, catalog and trust sections.'],
        ['Landing Pages / UI Design', 'JM Construcciones', 'Corporate site for construction and remodeling, with leading photography and commercial calls to action.'],
        ['Landing Pages', 'Tapicero de Confianza', 'Project to modernize the digital presence of an upholstery restoration and custom furniture business.']
      ],
      footer: 'Real projects, presented with motion.'
    },
    es: {
      htmlLang: 'es',
      languageButton: 'EN',
      nav: ['Portafolio', 'Stack', 'Galeria', 'Servicios'],
      navCta: 'Hablemos',
      heroEyebrow: 'Mis proyectos',
      heroTitle: 'Galeria de proyectos principales.',
      heroCopy: 'Una seleccion de repositorios reales publicados en GitHub, convertidos en una experiencia visual con filtros, movimiento y cards interactivas.',
      featuredLabel: 'Proyecto destacado',
      featuredMeta: 'Web App / Fullstack / Gestion comercial',
      featuredTitle: 'Web ventas',
      featuredCopy: 'Panel administrable para gestionar clientes, briefs, cotizaciones, proyectos, pagos y mantenimiento mensual desde un dashboard operativo.',
      featuredButton: 'Ver GitHub',
      sectionLabel: 'Mis proyectos',
      galleryTitle: 'Explora por categoria.',
      filters: ['Todos', 'Landing Pages', 'Web Apps', 'UI Design', 'Fullstack'],
      cards: [
        ['Web Apps / Fullstack', 'Web ventas', 'Sistema administrable para ordenar clientes, cotizaciones, proyectos, pagos, briefs y mantenimiento en una sola operacion.'],
        ['Web Apps / Fullstack', 'MyPage', 'Primer intento de construir una intranet completa: usuarios, foros, mensajes, archivos y configuracion en una app de mayor escala.'],
        ['Landing Pages / UI Design', 'Cafe Bruma', 'Presentacion comercial para cafe de especialidad con estilo editorial, carrito visual y enfoque de marca.'],
        ['Landing Pages / UI Design', 'GreenMedical', 'Experiencia de marca para laboratorio natural, con hero visual, catalogo y secciones de confianza.'],
        ['Landing Pages / UI Design', 'JM Construcciones', 'Sitio corporativo para construccion y remodelacion, con fotografia protagonista y llamados comerciales.'],
        ['Landing Pages', 'Tapicero de Confianza', 'Proyecto para modernizar la presencia digital de un negocio de restauracion y fabricacion de muebles tapizados.']
      ],
      footer: 'Proyectos reales, presentados con movimiento.'
    }
  };

  const applyTheme = theme => {
    document.body.classList.toggle('theme-light', theme === 'light');
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f8fb' : '#07111f');
    if (themeToggle) {
      themeToggle.innerHTML = `<i class="bi bi-${theme === 'light' ? 'sun' : 'moon-stars'}"></i>`;
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      themeToggle.title = theme === 'light' ? 'Dark theme' : 'Light theme';
    }
    localStorage.setItem('portfolio-theme', theme);
  };

  const applyLanguage = language => {
    const t = content[language] || content.en;
    document.documentElement.lang = t.htmlLang;
    if (languageToggle) {
      languageToggle.textContent = t.languageButton;
      languageToggle.setAttribute('aria-label', language === 'en' ? 'Cambiar a espanol' : 'Switch to English');
      languageToggle.title = language === 'en' ? 'Espanol' : 'English';
    }
    document.querySelectorAll('.nav-links > a:not(.nav-cta)').forEach((link, index) => {
      if (t.nav[index]) link.textContent = t.nav[index];
    });
    document.querySelector('.nav-cta').innerHTML = `${t.navCta} <i class="bi bi-arrow-up-right"></i>`;
    document.querySelector('.gallery-intro .eyebrow').innerHTML = `<span class="status-dot"></span> ${t.heroEyebrow}`;
    document.querySelector('.gallery-intro h1').textContent = t.heroTitle;
    document.querySelector('.gallery-intro > p:last-child').textContent = t.heroCopy;
    document.querySelector('.featured-media span').textContent = t.featuredLabel;
    document.querySelector('.featured-copy p:first-child').textContent = t.featuredMeta;
    document.querySelector('.featured-copy h2').textContent = t.featuredTitle;
    document.querySelector('.featured-copy p:last-child').textContent = t.featuredCopy;
    document.querySelector('.featured-copy .button').innerHTML = `${t.featuredButton} <i class="bi bi-github"></i>`;
    document.querySelector('.gallery-top .section-label').innerHTML = `<span>01</span> ${t.sectionLabel}`;
    document.getElementById('gallery-title').textContent = t.galleryTitle;
    filterButtons.forEach((button, index) => {
      if (t.filters[index]) button.textContent = t.filters[index];
    });
    cards.forEach((card, index) => {
      const data = t.cards[index];
      if (!data) return;
      card.querySelector('.gallery-card-body p:first-child').textContent = data[0];
      card.querySelector('.gallery-card-body h3').textContent = data[1];
      card.querySelector('.gallery-card-body p:last-child').textContent = data[2];
    });
    document.querySelector('footer p:first-of-type').textContent = t.footer;
    localStorage.setItem('portfolio-language', language);
    requestAnimationFrame(() => moveIndicator(document.querySelector('.filter-button.active')));
  };

  themeToggle?.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
  });
  languageToggle?.addEventListener('click', () => {
    const current = localStorage.getItem('portfolio-language') || 'en';
    applyLanguage(current === 'en' ? 'es' : 'en');
  });

  applyTheme(localStorage.getItem('portfolio-theme') || 'dark');
  applyLanguage(localStorage.getItem('portfolio-language') || 'en');

  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt-gallery,.featured-project,.magnetic').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        const depth = element.classList.contains('magnetic') ? 12 : 8;
        element.style.transform = element.classList.contains('magnetic')
          ? `translate(${x * depth}px, ${y * depth}px)`
          : `perspective(1000px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateZ(0)`;
      });
      element.addEventListener('pointerleave', () => element.style.transform = '');
    });
  }
});
