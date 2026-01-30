const slider = document.querySelector('[data-slider]');
const buttons = document.querySelectorAll('.slider-btn');
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

const toggleHeader = () => {
  if (!header) return;
  header.classList.toggle('is-floating', window.scrollY > 40);
};

toggleHeader();
window.addEventListener('scroll', toggleHeader);

const closeMenu = () => {
  if (!header || !navToggle || !mobileMenu) return;
  header.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
};

if (navToggle && header && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!slider) return;
    const direction = button.dataset.direction === 'next' ? 1 : -1;
    slider.scrollBy({ left: direction * 260, behavior: 'smooth' });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

const revealItems = document.querySelectorAll('section, .card, .service-card, .shot, .mini-card');
revealItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});
