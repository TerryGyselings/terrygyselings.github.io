// Frise du parcours : place le repère « aujourd'hui » à la date du jour.
// La frise couvre les années 2011 à 2028 (voir .trajectory dans css/hero.css).

const START_YEAR = 2011;
const END_YEAR = 2028;

const today = document.getElementById("trajToday");

if (today) {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);
  const yearProgress = (now - startOfYear) / (startOfNextYear - startOfYear);
  const position = (now.getFullYear() + yearProgress - START_YEAR) / (END_YEAR - START_YEAR);

  // Après 2028, le repère sortirait de la frise : on ne l'affiche plus
  if (position >= 0 && position <= 1) {
    today.style.setProperty("--today", position.toFixed(4));
    today.hidden = false;
  }
}
