document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const progress = document.querySelector('.scroll-progress');
  const glow = document.querySelector('.cursor-glow');
  const year = document.getElementById('year');
  const filterBar = document.querySelector('.gallery-filters');
  const indicator = document.querySelector('.filter-indicator');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.gallery-card')];

  if (year) year.textContent = new Date().getFullYear();

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
