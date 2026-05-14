const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

/* =========================
   REVEAL ON SCROLL
========================= */

const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

/* =========================
   ACTIVE NAV LINK
========================= */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');

  if (href === currentPage || (href === 'index.html' && currentPage === '')) {
    link.classList.add('active');
  }
});

/* =========================
   SMOOTH BUTTON HOVER GLOW
========================= */

const buttons = document.querySelectorAll('.btn');

buttons.forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  });
});