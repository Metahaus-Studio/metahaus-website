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

const popup = document.getElementById("offerPopup");
const closeBtn = document.getElementById("offerClose");
const viewPackagesBtn = document.getElementById("viewPackagesBtn");

window.addEventListener("load", () => {
  setTimeout(() => {
    popup.classList.add("show");
  }, 1200);
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("show");
});

viewPackagesBtn.addEventListener("click", () => {
  popup.classList.remove("show");
});