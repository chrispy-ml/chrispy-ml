// ─── Header scroll state ────────────────────────────────────
const siteHeader = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Mobile full-screen menu ─────────────────────────────────
const burgerBtn  = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  burgerBtn.classList.toggle('is-open', isOpen);
  burgerBtn.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    burgerBtn.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// ─── Scroll reveal (Intersection Observer) ───────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px',
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Newsletter form → Django /subscribe/ endpoint ───────────
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
    formMessage.style.color = data.ok ? '' : '#c47a7a';
    if (data.ok) newsletterForm.reset();
  } catch {
    formMessage.textContent = 'Something went wrong. Please try again.';
    formMessage.style.color = '#c47a7a';
  }

  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.style.color = '';
  }, 6000);
});
