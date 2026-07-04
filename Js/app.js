document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const progress = document.querySelector('.scroll-progress');
  const glow = document.querySelector('.cursor-glow');

  document.getElementById('year').textContent = new Date().getFullYear();

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
    nav.classList.toggle('scrolled', scrollY > 30);
  };
  addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open);
    menuButton.innerHTML = `<i class="bi bi-${open ? 'x-lg' : 'list'}"></i>`;
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<i class="bi bi-list"></i>';
  }));

  if (!reducedMotion) {
    addEventListener('pointermove', event => {
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
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };
  const validateField = field => {
    const small = field.parentElement.querySelector('small');
    let message = '';
    if (!field.value.trim()) message = 'Este campo es obligatorio.';
    else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Ingresa un correo válido.';
    else if (field.value.trim().length < Number(field.minLength || 0)) message = `Escribe al menos ${field.minLength} caracteres.`;
    small.textContent = message;
    field.setAttribute('aria-invalid', Boolean(message));
    return !message;
  };
  form.querySelectorAll('input, textarea, select').forEach(field => field.addEventListener('blur', () => validateField(field)));
  form.addEventListener('submit', event => {
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
    showToast('Abriendo tu aplicación de correo…');
    setTimeout(() => location.href = `mailto:?subject=${subject}&body=${body}`, 450);
  });

  if (!reducedMotion) initParticles();
});

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
