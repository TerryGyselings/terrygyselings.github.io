// Défilement : filet sous la barre de navigation dès qu'on a défilé, mise en avant
// du lien de la section en cours de lecture, et apparition progressive des blocs
// marqués .reveal.

const navbar = document.querySelector(".navbar");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

const navLinks = new Map();
document.querySelectorAll('#navMenu a[href^="#"]').forEach((link) => {
  navLinks.set(link.getAttribute("href").slice(1), link);
});

function setActiveLink(id) {
  navLinks.forEach((link, linkId) => {
    const isActive = linkId === id;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// Une section est « en cours » quand elle traverse une bande située dans le tiers
// haut de la fenêtre.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-30% 0px -65% 0px" }
);

navLinks.forEach((link, id) => {
  const section = document.getElementById(id);
  if (section) {
    sectionObserver.observe(section);
  }
});

// Tout en haut de la page, aucune section n'est active
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY < 200) {
      setActiveLink(null);
    }
  },
  { passive: true }
);

// Apparition au défilement : chaque bloc .reveal devient visible la première fois
// qu'il entre à l'écran (le style est dans css/base.css).
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}
