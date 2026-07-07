document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('servicio');
  const themeToggle = document.getElementById('themeToggle');
  const languageToggle = document.getElementById('languageToggle');

  const planLabels = {
    'Landing page business': { es: 'Landing page business', en: 'Landing page business' },
    'Landing page premium': { es: 'Landing page premium', en: 'Landing page premium' },
    'Sitio corporativo': { es: 'Sitio corporativo', en: 'Corporate website' }
  };

  const content = {
    en: {
      htmlLang: 'en',
      languageButton: 'ES',
      nav: ['Portfolio', 'Gallery', 'Services', 'Plans', 'Process'],
      navCta: 'Get a quote',
      eyebrow: 'Custom web development',
      heroTitleA: 'Your business deserves',
      heroTitleB: 'a website that works.',
      heroCopy: 'I create modern, fast websites adapted to every screen. A digital presence designed to show your value and turn visits into opportunities.',
      heroButtons: ['View plans', 'Request a quote'],
      benefitsLabel: 'What you get',
      benefitsTitle: 'A website that looks good.',
      benefitsTitleSpan: 'And works even better.',
      benefitsCopy: 'Each project combines strategy, design and development to deliver a clear, reliable experience prepared to grow.',
      benefits: [
        ['Responsive design', 'A consistent experience across phones, tablets and desktop screens.'],
        ['Fast and optimized', 'Agile loading, clear structure and good practices for search engines.'],
        ['Direct contact', 'Forms, WhatsApp, maps and links that make conversion easier.'],
        ['Safe and reliable', 'Professional setup, backup guidance and support after launch.']
      ],
      plansLabel: 'Guideline plans',
      plansTitle: 'Choose a starting point.',
      plansCopy: 'Final values depend on content, features and scope. First we talk; then you receive a clear proposal.',
      recommended: 'Most requested',
      plans: [
        {
          tag: 'PROFESSIONAL PLAN',
          title: 'Landing page business',
          note: 'Designed for businesses that need a more complete presentation focused on capturing clients.',
          small: 'From',
          price: '$200',
          suffix: 'USD',
          items: ['Up to 6 sections', 'Gallery or portfolio', 'Map and WhatsApp', 'Basic SEO', 'More personalized design'],
          button: 'I want this plan'
        },
        {
          tag: 'PREMIUM PLAN',
          title: 'Landing page premium',
          note: 'For brands or businesses that want a stronger, modern and professional image.',
          small: 'From',
          price: '$250',
          suffix: 'USD',
          items: ['Up to 8 sections', 'Soft animations', 'Testimonials or FAQ', 'Image optimization', 'Initial support'],
          button: 'I want this plan'
        },
        {
          tag: 'COMING SOON',
          title: 'Corporate website',
          note: 'More complete solutions for businesses that need multiple pages, a stronger structure and professional presence will be available soon.',
          small: 'Status',
          price: 'COMING SOON',
          suffix: '',
          items: ['Multipage', 'Business structure', 'Advanced sections', 'More scalability', 'More complete solutions'],
          button: 'Available soon'
        }
      ],
      disclaimer: 'Domain not included · Maintenance available from $30/month',
      extrasLabel: 'Add-ons',
      extras: [
        ['Domain and hosting', 'I help you choose, configure and connect everything needed to publish.', 'Full setup'],
        ['Maintenance', 'Updates, backups, improvements and support whenever your site needs it.', 'Optional monthly plan']
      ],
      processLabel: 'How we will work',
      processTitle: 'From idea to a website',
      processTitleEm: 'ready to move forward.',
      process: [
        ['We talk', 'I understand your business, goals, audience and available content.'],
        ['We define', 'You receive scope, timing, value and a clear visual direction.'],
        ['I build', 'I develop the experience and show you progress for review.'],
        ['We publish', 'We run final tests and leave your site working.']
      ],
      quoteEyebrow: 'Tell me your idea',
      quoteTitle: 'Let us make a',
      quoteTitleEm: 'clear quote.',
      quoteCopy: 'Complete these details and your email app will open with the request prepared.',
      fields: ['Your name', 'Your email', 'What do you need', 'Estimated budget', 'Briefly describe your project'],
      placeholders: ['What is your name?', 'hello@example.com', '', '', 'My business needs...'],
      serviceOptions: ['Select an option', 'Landing page business', 'Landing page premium', 'Corporate website', 'Maintenance', 'Other project'],
      budgetOptions: ['Select a range', 'Up to $200 USD', '$200 to $250 USD', 'I need guidance'],
      quoteButton: 'Prepare quote',
      footer: ['Professional web design, clear and with personality.', 'Back to portfolio', 'GitHub']
    },
    es: {
      htmlLang: 'es',
      languageButton: 'EN',
      nav: ['Portafolio', 'Galeria', 'Servicios', 'Planes', 'Proceso'],
      navCta: 'Cotizar',
      eyebrow: 'Desarrollo web a tu medida',
      heroTitleA: 'Tu negocio merece',
      heroTitleB: 'una web que trabaje.',
      heroCopy: 'Creo sitios modernos, rapidos y adaptados a cada pantalla. Una presencia digital pensada para mostrar tu valor y convertir visitas en oportunidades.',
      heroButtons: ['Ver planes', 'Solicitar cotizacion'],
      benefitsLabel: 'Lo que obtienes',
      benefitsTitle: 'Una pagina que se ve bien.',
      benefitsTitleSpan: 'Y funciona aun mejor.',
      benefitsCopy: 'Cada proyecto combina estrategia, diseno y desarrollo para entregar una experiencia clara, confiable y preparada para crecer.',
      benefits: [
        ['Diseno responsivo', 'Una experiencia consistente en celulares, tablets y computadores.'],
        ['Rapido y optimizado', 'Carga agil, estructura clara y buenas practicas para buscadores.'],
        ['Contacto directo', 'Formularios, WhatsApp, mapas y enlaces que facilitan la conversion.'],
        ['Seguro y confiable', 'Configuracion profesional, respaldo y acompanamiento despues de publicar.']
      ],
      plansLabel: 'Planes orientativos',
      plansTitle: 'Elige un punto de partida.',
      plansCopy: 'Los valores finales dependen del contenido, funciones y alcance. Primero conversamos; despues recibes una propuesta clara.',
      recommended: 'Mas solicitado',
      plans: [
        {
          tag: 'PLAN PROFESIONAL',
          title: 'Landing page business',
          note: 'Pensada para negocios que buscan una presentacion mas completa y enfocada en captar clientes.',
          small: 'Desde',
          price: '$200',
          suffix: 'USD',
          items: ['Hasta 6 secciones', 'Galeria o portafolio', 'Mapa y WhatsApp', 'SEO basico', 'Diseno mas personalizado'],
          button: 'Quiero este plan'
        },
        {
          tag: 'PLAN PREMIUM',
          title: 'Landing page premium',
          note: 'Para marcas o negocios que quieren una imagen mas solida, moderna y profesional.',
          small: 'Desde',
          price: '$250',
          suffix: 'USD',
          items: ['Hasta 8 secciones', 'Animaciones suaves', 'Testimonios o FAQ', 'Optimizacion de imagenes', 'Soporte inicial'],
          button: 'Quiero este plan'
        },
        {
          tag: 'PROXIMAMENTE',
          title: 'Sitio corporativo',
          note: 'Muy pronto estaran disponibles soluciones mas completas para negocios que necesitan multiples secciones, estructura mas robusta y presencia profesional.',
          small: 'Estado',
          price: 'COMING SOON',
          suffix: '',
          items: ['Multipagina', 'Estructura empresarial', 'Secciones avanzadas', 'Mayor escalabilidad', 'Soluciones mas completas'],
          button: 'Disponible pronto'
        }
      ],
      disclaimer: 'Dominio no incluido · Mantenimiento disponible desde $30/mes',
      extrasLabel: 'Complementos',
      extras: [
        ['Dominio y hosting', 'Te ayudo a elegir, configurar y conectar todo lo necesario para publicar.', 'Configuracion completa'],
        ['Mantenimiento', 'Actualizaciones, respaldos, mejoras y soporte cuando tu sitio lo necesite.', 'Plan mensual opcional']
      ],
      processLabel: 'Como trabajaremos',
      processTitle: 'De la idea a una web',
      processTitleEm: 'lista para avanzar.',
      process: [
        ['Conversamos', 'Entiendo tu negocio, objetivos, publico y contenido disponible.'],
        ['Definimos', 'Recibes alcance, tiempos, valor y una direccion visual clara.'],
        ['Construyo', 'Desarrollo la experiencia y te muestro avances para revisar.'],
        ['Publicamos', 'Hacemos las pruebas finales y dejamos tu sitio funcionando.']
      ],
      quoteEyebrow: 'Cuentame tu idea',
      quoteTitle: 'Hagamos una',
      quoteTitleEm: 'cotizacion clara.',
      quoteCopy: 'Completa estos datos y se abrira tu aplicacion de correo con la solicitud preparada.',
      fields: ['Tu nombre', 'Tu email', 'Que necesitas', 'Presupuesto estimado', 'Describe brevemente tu proyecto'],
      placeholders: ['Como te llamas?', 'hola@ejemplo.com', '', '', 'Mi negocio necesita...'],
      serviceOptions: ['Selecciona una opcion', 'Landing page business', 'Landing page premium', 'Sitio corporativo', 'Mantenimiento', 'Otro proyecto'],
      budgetOptions: ['Selecciona un rango', 'Hasta $200 USD', '$200 a $250 USD', 'Necesito orientacion'],
      quoteButton: 'Preparar cotizacion',
      footer: ['Diseno web profesional, claro y con personalidad.', 'Volver al portafolio', 'GitHub']
    }
  };

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  const applyOptions = (select, values) => {
    if (!select) return;
    const current = select.value;
    select.innerHTML = values.map((value, index) => `<option value="${index === 0 ? '' : value}">${value}</option>`).join('');
    if ([...select.options].some(option => option.value === current)) select.value = current;
  };

  const applyLanguage = (language) => {
    const normalizedLanguage = content[language] ? language : 'en';
    const t = content[normalizedLanguage];
    document.documentElement.lang = t.htmlLang;
    if (languageToggle) {
      languageToggle.textContent = t.languageButton;
      languageToggle.setAttribute('aria-label', normalizedLanguage === 'en' ? 'Cambiar a espanol' : 'Switch to English');
      languageToggle.title = normalizedLanguage === 'en' ? 'Espanol' : 'English';
    }

    document.querySelectorAll('.nav-links > a:not(.nav-cta)').forEach((link, index) => {
      if (t.nav[index]) link.textContent = t.nav[index];
    });
    const navCta = document.querySelector('.nav-cta');
    if (navCta) navCta.innerHTML = `${t.navCta} <i class="bi bi-arrow-up-right"></i>`;

    setText('.services-hero .eyebrow', t.eyebrow);
    document.querySelector('.services-hero .eyebrow')?.prepend(document.createElement('span'));
    document.querySelector('.services-hero .eyebrow span')?.classList.add('status-dot');
    setText('.services-hero .hero-title .line:first-child span', t.heroTitleA);
    setText('.services-hero .hero-title .line:nth-child(2) span', t.heroTitleB);
    const heroCopy = document.querySelector('.services-hero .hero-bottom p');
    if (heroCopy) heroCopy.innerHTML = t.heroCopy;
    document.querySelectorAll('.services-hero .hero-actions .button').forEach((button, index) => {
      button.childNodes[0].nodeValue = `${t.heroButtons[index]} `;
    });

    const benefitsLabel = document.querySelector('#servicios .section-label');
    if (benefitsLabel) benefitsLabel.innerHTML = `<span>01</span> ${t.benefitsLabel}`;
    setText('.services-heading h2', t.benefitsTitle);
    document.querySelector('.services-heading h2')?.insertAdjacentHTML('beforeend', `<br><span>${t.benefitsTitleSpan}</span>`);
    setText('.services-heading p', t.benefitsCopy);
    document.querySelectorAll('.benefit-card').forEach((card, index) => {
      setText(`#servicios .benefit-card:nth-child(${index + 1}) h3`, t.benefits[index][0]);
      setText(`#servicios .benefit-card:nth-child(${index + 1}) p`, t.benefits[index][1]);
    });

    const plansLabel = document.querySelector('#planes .section-label');
    if (plansLabel) plansLabel.innerHTML = `<span>02</span> ${t.plansLabel}`;
    setText('.plans-intro h2', t.plansTitle);
    setText('.plans-intro p', t.plansCopy);
    setText('.recommended', t.recommended);
    document.querySelectorAll('.plan-card').forEach((card, index) => {
      const plan = t.plans[index];
      if (!plan) return;
      card.querySelector('.plan-top span').textContent = plan.tag;
      card.querySelector('h3').textContent = plan.title;
      card.querySelector('.plan-note').textContent = plan.note;
      card.querySelector('.plan-price small').textContent = plan.small;
      card.querySelector('.plan-price strong').textContent = plan.price;
      const suffix = card.querySelector('.plan-price span');
      if (suffix) suffix.textContent = plan.suffix;
      card.querySelector('ul').innerHTML = plan.items.map(item => `<li><i class="bi bi-check2"></i> ${item}</li>`).join('');
      const button = card.querySelector('.button');
      const icon = card.classList.contains('plan-card-soon') ? 'bi-clock' : 'bi-arrow-right';
      if (button) button.innerHTML = `${plan.button} <i class="bi ${icon}"></i>`;
    });
    setText('.pricing-disclaimer', t.disclaimer);

    const extrasLabel = document.querySelector('.extras-section .section-label');
    if (extrasLabel) extrasLabel.innerHTML = `<span>03</span> ${t.extrasLabel}`;
    document.querySelectorAll('.extra-card').forEach((card, index) => {
      setText(`.extra-card:nth-child(${index + 1}) h3`, t.extras[index][0]);
      setText(`.extra-card:nth-child(${index + 1}) p`, t.extras[index][1]);
      setText(`.extra-card:nth-child(${index + 1}) > span`, t.extras[index][2]);
    });

    const processLabel = document.querySelector('#proceso .section-label');
    if (processLabel) processLabel.innerHTML = `<span>04</span> ${t.processLabel}`;
    const processHeading = document.querySelector('.process-heading h2');
    if (processHeading) processHeading.innerHTML = `${t.processTitle}<br><em>${t.processTitleEm}</em>`;
    document.querySelectorAll('.process-list article').forEach((item, index) => {
      setText(`.process-list article:nth-child(${index + 1}) h3`, t.process[index][0]);
      setText(`.process-list article:nth-child(${index + 1}) p`, t.process[index][1]);
    });

    setText('.quote-section .eyebrow', t.quoteEyebrow);
    document.querySelector('.quote-section .eyebrow')?.prepend(document.createElement('span'));
    document.querySelector('.quote-section .eyebrow span')?.classList.add('status-dot');
    const quoteTitle = document.querySelector('.quote-section h2');
    if (quoteTitle) quoteTitle.innerHTML = `${t.quoteTitle}<br><em>${t.quoteTitleEm}</em>`;
    setText('.quote-section .contact-copy', t.quoteCopy);
    document.querySelectorAll('.quote-form label > span').forEach((label, index) => {
      if (t.fields[index]) label.textContent = t.fields[index];
    });
    const nameInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('mensaje');
    if (nameInput) nameInput.placeholder = t.placeholders[0];
    if (emailInput) emailInput.placeholder = t.placeholders[1];
    if (messageInput) messageInput.placeholder = t.placeholders[4];
    applyOptions(serviceSelect, t.serviceOptions);
    applyOptions(document.getElementById('presupuesto'), t.budgetOptions);
    const quoteButton = document.querySelector('.quote-form button');
    if (quoteButton) quoteButton.innerHTML = `${t.quoteButton} <i class="bi bi-send"></i>`;
    const footerText = document.querySelector('footer p:first-of-type');
    if (footerText) footerText.textContent = t.footer[0];
    const backLink = document.querySelector('.contact-links a:first-child');
    if (backLink) backLink.innerHTML = `${t.footer[1]} <i class="bi bi-arrow-up-right"></i>`;

    localStorage.setItem('portfolio-language', normalizedLanguage);
  };

  const applyTheme = (theme) => {
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

  document.querySelectorAll('[data-plan]').forEach(link => {
    link.addEventListener('click', () => {
      const language = localStorage.getItem('portfolio-language') || 'en';
      const label = planLabels[link.dataset.plan]?.[language] || link.dataset.plan;
      if (serviceSelect) serviceSelect.value = label;
    });
  });

  themeToggle?.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
  });

  languageToggle?.addEventListener('click', () => {
    const current = localStorage.getItem('portfolio-language') || 'en';
    applyLanguage(current === 'en' ? 'es' : 'en');
  });

  applyTheme(localStorage.getItem('portfolio-theme') || 'dark');
  applyLanguage(localStorage.getItem('portfolio-language') || 'en');
});
