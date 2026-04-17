// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Header scroll opacity
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.style.backgroundColor = window.scrollY > 60
    ? 'rgba(10, 9, 8, 0.98)'
    : 'rgba(10, 9, 8, 0.92)';
}, { passive: true });

// Newsletter form
const form        = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!email) return;

  formMessage.textContent = 'Thank you. You will hear from us soon.';
  form.reset();

  setTimeout(() => { formMessage.textContent = ''; }, 5000);
});
