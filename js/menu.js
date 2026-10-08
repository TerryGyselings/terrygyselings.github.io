// Menu mobile : ouverture / fermeture avec le bouton burger.

const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");

function setMenuOpen(open) {
  navMenu.classList.toggle("active", open);
  burger.setAttribute("aria-expanded", String(open));
}

burger.addEventListener("click", () => {
  setMenuOpen(!navMenu.classList.contains("active"));
});

// Un clic sur un lien ferme le menu
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// La touche Échap aussi
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("active")) {
    setMenuOpen(false);
    burger.focus();
  }
});
