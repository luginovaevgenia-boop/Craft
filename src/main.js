const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Открыть меню');
  nav.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const dialog = document.querySelector('#join-dialog');
document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#selected-plan').textContent = button.dataset.plan;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
dialog.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

// Optional reveal motion is progressive: content remains visible without JavaScript.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.section-heading, .about-top, .about-bottom, .people-intro, .people-tags, .activity-grid article, .event, .price-card, .founder-photo, .founder-copy, .faq-intro, .faq-list, .final-inner');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach(target => {
    target.classList.add('reveal-item');
    revealObserver.observe(target);
  });
  document.documentElement.classList.add('motion-ready');
  const revealAll = () => {
    targets.forEach(target => target.classList.add('is-visible'));
    revealObserver.disconnect();
  };
  reduceMotion.addEventListener('change', event => { if (event.matches) revealAll(); });
  window.addEventListener('beforeprint', revealAll);
}
