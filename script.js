// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav       = document.getElementById('mainNav');
const header        = document.querySelector('.header');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = header.classList.toggle('mobile-nav-open');
  mobileMenuBtn.classList.toggle('is-open', isOpen);
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('mobile-nav-open');
    mobileMenuBtn.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open menu');
  });
});

// Header scroll opacity
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 60
    ? 'rgba(10, 10, 10, 0.96)'
    : '';
}, { passive: true });

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
const formMessage    = document.getElementById('formMessage');

newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input[type="email"]');
  if (!input.value.trim()) return;

  formMessage.textContent = 'Thank you. You will hear from us soon.';
  input.value = '';

  setTimeout(() => { formMessage.textContent = ''; }, 5000);
});
