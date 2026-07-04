document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('servicio');
  document.querySelectorAll('[data-plan]').forEach(link => {
    link.addEventListener('click', () => {
      if (serviceSelect) serviceSelect.value = link.dataset.plan;
    });
  });
});
