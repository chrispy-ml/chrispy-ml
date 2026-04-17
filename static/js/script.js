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

// Newsletter form — posts to Django subscribe endpoint
const newsletterForm = document.getElementById('newsletterForm');
const formMessage    = document.getElementById('formMessage');

newsletterForm.addEventListener('submit', async e => {
  e.preventDefault();

  const csrf  = newsletterForm.querySelector('[name=csrfmiddlewaretoken]').value;
  const email = newsletterForm.querySelector('input[type="email"]').value.trim();

  if (!email) return;

  try {
    const res  = await fetch('/subscribe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrf,
      },
      body: new URLSearchParams({ email }),
    });

    const data = await res.json();
    formMessage.textContent = data.message;
    formMessage.style.color = data.ok ? '' : '#e57373';

    if (data.ok) newsletterForm.reset();
  } catch {
    formMessage.textContent = 'Something went wrong. Please try again.';
    formMessage.style.color = '#e57373';
  }

  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.style.color = '';
  }, 5000);
});
