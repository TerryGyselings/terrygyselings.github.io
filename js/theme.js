// Thème clair / sombre.
// Le thème initial est appliqué par le petit script en ligne dans <head> (pour éviter
// un flash au chargement) : choix enregistré, sinon préférence du système.

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function syncThemeUI() {
  const isDark = root.classList.contains("dark");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#0b1b26" : "#f3f6f8");
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {
    // stockage indisponible (navigation privée, etc.) : le choix ne sera pas mémorisé
  }
  syncThemeUI();
});

syncThemeUI();
