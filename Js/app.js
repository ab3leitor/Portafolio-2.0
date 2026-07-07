document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = false;
  const nav = document.querySelector('.site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const progress = document.querySelector('.scroll-progress');
  const glow = document.querySelector('.cursor-glow');
  const themeToggle = document.getElementById('themeToggle');
  const languageToggle = document.getElementById('languageToggle');
  const isServicesPage = document.body.classList.contains('services-page');

  const year = document.getElementById('year');
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

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.setProperty('--project-color', card.dataset.color);
  });

  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .14}px, ${(event.clientY - rect.top - rect.height / 2) * .14}px)`;
      });
      button.addEventListener('pointerleave', () => button.style.transform = '');
    });
  }

  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };
  const validateField = field => {
    const small = field.parentElement.querySelector('small');
    let message = '';
    if (!field.value.trim()) message = 'Este campo es obligatorio.';
    else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Ingresa un correo vÃ¡lido.';
    else if (field.value.trim().length < Number(field.minLength || 0)) message = `Escribe al menos ${field.minLength} caracteres.`;
    if (small) small.textContent = message;
    field.setAttribute('aria-invalid', Boolean(message));
    return !message;
  };
  form?.querySelectorAll('input, textarea, select').forEach(field => field.addEventListener('blur', () => validateField(field)));
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea, select')];
    const results = fields.map(validateField);
    if (!results.every(Boolean)) {
      showToast('Revisa los campos marcados.');
      fields.find(field => field.getAttribute('aria-invalid') === 'true')?.focus();
      return;
    }
    const data = new FormData(form);
    const servicio = data.get('servicio');
    const presupuesto = data.get('presupuesto');
    const subject = encodeURIComponent(`${servicio ? 'Cotizacion' : 'Consulta'} de ${data.get('nombre')} desde el portafolio`);
    const details = [servicio && `Servicio: ${servicio}`, presupuesto && `Presupuesto: ${presupuesto}`].filter(Boolean).join('\n');
    const body = encodeURIComponent(`Hola Abel,\n\n${details ? `${details}\n\n` : ''}${data.get('mensaje')}\n\nContacto: ${data.get('email')}`);
    showToast('Abriendo tu aplicaciÃ³n de correoâ€¦');
    setTimeout(() => location.href = `mailto:?subject=${subject}&body=${body}`, 450);
  });

  if (!isServicesPage) {
    initHomePreferences();
  }
  initTypewriter();
  if (!reducedMotion) initParticles();

  function initHomePreferences() {
    const content = {
      en: {
        htmlLang: 'en',
        languageButton: 'ES',
        nav: ['Profile', 'Stack', 'Projects', 'Gallery', 'Services'],
        navCta: 'Let us talk',
        eyebrow: 'Available for new challenges',
        heroTitle: 'Design ideas.',
        heroCopy: 'I am <strong>Abel Arriagada</strong>, a full stack developer. I turn complex problems into clear, fast and memorable digital products.',
        heroButtons: ['Explore work', 'GitHub'],
        code: ['const idea = <b>"impact"</b>;', 'build(idea, <b>{ detail: true }</b>);'],
        scroll: 'Scroll',
        sections: ['Profile', 'Tech stack', 'Selected projects'],
        kicker: 'Code with intention. Design with personality.',
        aboutTitle: 'I do not just build pages. I build <em>digital moments</em> people remember.',
        aboutCopy: 'I care about the exact point where engineering meets design: fluid interfaces, solid logic and small details that make an experience feel alive.',
        principles: [
          ['Clarity', 'Every element has a reason to exist.'],
          ['Motion', 'Animation that guides, without distracting.'],
          ['Quality', 'Responsive, accessible and maintainable.']
        ],
        skillsTitle: 'Tools to turn an idea into a <span>product.</span>',
        skillsCopy: 'Frontend, backend, data and automation working as one system.',
        capabilities: [
          ['Frontend', 'Responsive interfaces with attention to detail, accessibility and motion.'],
          ['Backend', 'Business logic and applications built on solid foundations.'],
          ['Data & QA', 'Persistence, queries and testing to deliver reliable software.']
        ],
        projectsTitle: 'Experiment.<br><span>Build. Improve.</span>',
        projectsCopy: 'Visual concepts that explore known products through a personal perspective.',
        projectMeta: ['UI Concept · Frontend', 'Mobile Concept · Interaction', 'Dashboard · Data UI'],
        projectTexts: [
          'An immersive music interface exploration with direct navigation and a nocturnal aesthetic.',
          'An experience focused on instant discovery, reactive animations and clear hierarchy.',
          'A conceptual dashboard for organizing metrics and turning complex data into quick decisions.'
        ],
        contactEyebrow: 'Have an idea?',
        contactTitle: 'Let us build something<br><em>extraordinary.</em>',
        contactCopy: 'Tell me what you want to build. This form will open your email app with the message ready.',
        fields: ['Your name', 'Your email', 'Tell me about your project'],
        placeholders: ['What is your name?', 'hello@example.com', 'I have an idea for...'],
        submit: 'Prepare message',
        footer: 'Designed and developed with intention.'
      },
      es: {
        htmlLang: 'es',
        languageButton: 'EN',
        nav: ['Perfil', 'Stack', 'Proyectos', 'Galeria', 'Servicios'],
        navCta: 'Hablemos',
        eyebrow: 'Disponible para nuevos desafios',
        heroTitle: 'Diseno ideas.',
        heroCopy: 'Soy <strong>Abel Arriagada</strong>, desarrollador full stack. Transformo problemas complejos en productos digitales claros, rapidos y memorables.',
        heroButtons: ['Explorar trabajo', 'GitHub'],
        code: ['const idea = <b>"impacto"</b>;', 'build(idea, <b>{ detalle: true }</b>);'],
        scroll: 'Scroll',
        sections: ['Perfil', 'Stack tecnologico', 'Proyectos seleccionados'],
        kicker: 'Codigo con intencion. Diseno con personalidad.',
        aboutTitle: 'No construyo solo paginas. Construyo <em>momentos digitales</em> que se recuerdan.',
        aboutCopy: 'Me interesa el punto exacto donde la ingenieria se encuentra con el diseno: interfaces fluidas, logica robusta y pequenos detalles que hacen que una experiencia se sienta viva.',
        principles: [
          ['Claridad', 'Cada elemento tiene una razon para estar.'],
          ['Movimiento', 'Animacion que guia, no que distrae.'],
          ['Calidad', 'Responsive, accesible y mantenible.']
        ],
        skillsTitle: 'Herramientas para convertir una idea en <span>producto.</span>',
        skillsCopy: 'Frontend, backend, datos y automatizacion trabajando como un solo sistema.',
        capabilities: [
          ['Frontend', 'Interfaces responsivas con atencion al detalle, accesibilidad y movimiento.'],
          ['Backend', 'Logica de negocio y aplicaciones construidas sobre bases solidas.'],
          ['Datos & QA', 'Persistencia, consultas y pruebas para entregar software confiable.']
        ],
        projectsTitle: 'Experimentar.<br><span>Construir. Mejorar.</span>',
        projectsCopy: 'Conceptos visuales que exploran productos conocidos desde una mirada personal.',
        projectMeta: ['UI Concept · Frontend', 'Mobile Concept · Interaction', 'Dashboard · Data UI'],
        projectTexts: [
          'Exploracion de una interfaz musical inmersiva con navegacion directa y una estetica nocturna.',
          'Una experiencia enfocada en el descubrimiento instantaneo, animaciones reactivas y jerarquia clara.',
          'Dashboard conceptual para organizar metricas y convertir datos complejos en decisiones rapidas.'
        ],
        contactEyebrow: 'Tienes una idea?',
        contactTitle: 'Hagamos algo<br><em>extraordinario.</em>',
        contactCopy: 'Cuentame que quieres construir. Este formulario abrira tu aplicacion de correo con el mensaje preparado.',
        fields: ['Tu nombre', 'Tu email', 'Cuentame sobre tu proyecto'],
        placeholders: ['Como te llamas?', 'hola@ejemplo.com', 'Tengo una idea para...'],
        submit: 'Preparar mensaje',
        footer: 'Disenado y desarrollado con intencion.'
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
      document.querySelector('.hero .eyebrow').innerHTML = `<span class="status-dot"></span> ${t.eyebrow}`;
      document.querySelector('.hero-title .line:first-child span').textContent = t.heroTitle;
      document.querySelector('.hero-bottom p').innerHTML = t.heroCopy;
      document.querySelectorAll('.hero-actions .button').forEach((button, index) => {
        button.childNodes[0].nodeValue = `${t.heroButtons[index]} `;
      });
      document.querySelectorAll('.hero-code code').forEach((code, index) => code.innerHTML = t.code[index]);
      document.querySelector('.scroll-hint span').textContent = t.scroll;
      document.querySelectorAll('.section-label').forEach((label, index) => {
        if (t.sections[index]) label.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span> ${t.sections[index]}`;
      });
      document.querySelector('.about-copy .kicker').textContent = t.kicker;
      document.querySelector('.about-copy h2').innerHTML = t.aboutTitle;
      document.querySelector('.about-copy > p:not(.kicker)').textContent = t.aboutCopy;
      document.querySelectorAll('.principles > div').forEach((item, index) => {
        item.querySelector('strong').textContent = t.principles[index][0];
        item.querySelector('p').textContent = t.principles[index][1];
      });
      document.querySelector('.skills-heading h2').innerHTML = t.skillsTitle;
      document.querySelector('.skills-heading p').textContent = t.skillsCopy;
      document.querySelectorAll('.capability').forEach((card, index) => {
        card.querySelector('h3').textContent = t.capabilities[index][0];
        card.querySelector('p').textContent = t.capabilities[index][1];
      });
      document.querySelector('.projects-heading h2').innerHTML = t.projectsTitle;
      document.querySelector('.projects-heading p').textContent = t.projectsCopy;
      document.querySelectorAll('.project-card').forEach((card, index) => {
        card.querySelector('.project-info > div > p:first-child').textContent = t.projectMeta[index];
        card.querySelector('.project-info > div > p:last-child').textContent = t.projectTexts[index];
      });
      document.querySelector('.contact .eyebrow').innerHTML = `<span class="status-dot"></span> ${t.contactEyebrow}`;
      document.querySelector('.contact h2').innerHTML = t.contactTitle;
      document.querySelector('.contact-copy').textContent = t.contactCopy;
      document.querySelectorAll('.contact-form label > span').forEach((label, index) => {
        if (t.fields[index]) label.textContent = t.fields[index];
      });
      document.getElementById('nombre').placeholder = t.placeholders[0];
      document.getElementById('email').placeholder = t.placeholders[1];
      document.getElementById('mensaje').placeholder = t.placeholders[2];
      document.querySelector('.contact-form button').innerHTML = `${t.submit} <i class="bi bi-send"></i>`;
      document.querySelector('footer p:first-of-type').textContent = t.footer;
      localStorage.setItem('portfolio-language', language);
      window.dispatchEvent(new CustomEvent('portfolio-language-change', { detail: { language } }));
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
  }
});

function initTypewriter() {
  const container = document.getElementById('typewriterText');
  const target = container?.querySelector('.typewriter-copy');
  if (!container || !target) return;

  const phraseSets = {
    en: {
      desktop: ['Web development.', 'I build interfaces.', 'I create systems.', 'Ideas into code.'],
      mobile: ['Webs.', 'Apps.', 'Ideas.', 'UI.']
    },
    es: {
      desktop: ['Desarrollo web.', 'Creo interfaces.', 'Construyo sistemas.', 'Transformo ideas.'],
      mobile: ['Webs.', 'Apps.', 'Ideas.', 'UI.']
    }
  };
  const mobileQuery = window.matchMedia('(max-width: 600px)');
  let language = localStorage.getItem('portfolio-language') || 'en';
  let phrases = mobileQuery.matches ? phraseSets[language].mobile : phraseSets[language].desktop;
  target.textContent = phrases[0];

  const measureTypewriter = () => {
    const probe = document.createElement('span');
    const styles = getComputedStyle(target);
    probe.style.cssText = `position:absolute;left:-9999px;top:0;display:inline-block;visibility:hidden;white-space:nowrap;font:${styles.font};letter-spacing:${styles.letterSpacing};`;
    document.body.appendChild(probe);

    const maxWidth = phrases.reduce((width, phrase) => {
      probe.textContent = phrase;
      return Math.max(width, probe.getBoundingClientRect().width);
    }, 0);

    probe.remove();
    container.style.setProperty('--typewriter-reserve-px', `${Math.ceil(maxWidth + 12)}px`);
  };

  measureTypewriter();
  document.fonts?.ready.then(measureTypewriter);
  const resetPhrases = nextLanguage => {
    language = nextLanguage || language;
    phrases = mobileQuery.matches ? phraseSets[language].mobile : phraseSets[language].desktop;
    phraseIndex = 0;
    letterIndex = phrases[0].length;
    removing = true;
    target.textContent = phrases[0];
    measureTypewriter();
  };
  mobileQuery.addEventListener?.('change', () => resetPhrases(language));
  addEventListener('portfolio-language-change', event => resetPhrases(event.detail?.language || 'en'));

  let phraseIndex = 0;
  let letterIndex = phrases[0].length;
  let removing = true;

  const tick = () => {
    const phrase = phrases[phraseIndex];
    target.textContent = phrase.slice(0, letterIndex);

    if (removing) {
      letterIndex -= 1;
      if (letterIndex < 0) {
        removing = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        letterIndex = 0;
      }
    } else {
      letterIndex += 1;
      if (letterIndex > phrases[phraseIndex].length) {
        removing = true;
        setTimeout(tick, 1300);
        return;
      }
    }

    setTimeout(tick, removing ? 42 : 78);
  };

  setTimeout(tick, 1200);
}

function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let pointer = { x: -1000, y: -1000 };
  const resize = () => {
    const ratio = Math.min(devicePixelRatio, 2);
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(80, Math.floor(canvas.clientWidth / 18));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      vx: (Math.random() - .5) * .28,
      vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.5 + .5
    }));
  };
  canvas.parentElement.addEventListener('pointermove', e => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });
  canvas.parentElement.addEventListener('pointerleave', () => pointer = { x: -1000, y: -1000 });
  addEventListener('resize', resize);
  resize();
  const draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    particles.forEach((p, index) => {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 120) {
        p.x += dx / distance * .55;
        p.y += dy / distance * .55;
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.clientWidth) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.clientHeight) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(181,225,255,.55)'; ctx.fill();
      for (let j = index + 1; j < particles.length; j++) {
        const other = particles[j];
        const d = Math.hypot(p.x - other.x, p.y - other.y);
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(85,230,255,${.12 * (1 - d / 115)})`; ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };
  draw();
}

