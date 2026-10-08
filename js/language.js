// Français / anglais.
//
// Le français est écrit directement dans index.html ; la traduction est portée par
// des attributs sur le même élément :
//   data-en          -> texte de l'élément
//   data-en-label    -> attribut aria-label
//   data-en-alt      -> attribut alt d'une image
//   data-en-content  -> attribut content d'une balise <meta>
//   data-en-href     -> attribut href d'un lien (ex. le CV, différent selon la langue)
// Le texte français d'origine est mémorisé au premier passage pour pouvoir y revenir.

const langToggle = document.getElementById("langToggle");

const ATTRIBUTES = [
  { data: "enLabel", attr: "aria-label", store: "frLabel" },
  { data: "enAlt", attr: "alt", store: "frAlt" },
  { data: "enContent", attr: "content", store: "frContent" },
  { data: "enHref", attr: "href", store: "frHref" },
];

function readSavedLang() {
  try {
    return localStorage.getItem("lang");
  } catch (error) {
    return null;
  }
}

// Langue de départ : choix enregistré, sinon langue du navigateur
let currentLang =
  readSavedLang() || (navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-en]").forEach((el) => {
    if (el.dataset.fr === undefined) {
      el.dataset.fr = el.textContent.replace(/\s+/g, " ").trim();
    }
    el.textContent = lang === "en" ? el.dataset.en : el.dataset.fr;
  });

  ATTRIBUTES.forEach(({ data, attr, store }) => {
    const selector = "[data-" + data.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()) + "]";
    document.querySelectorAll(selector).forEach((el) => {
      if (el.dataset[store] === undefined) {
        el.dataset[store] = el.getAttribute(attr) || "";
      }
      el.setAttribute(attr, lang === "en" ? el.dataset[data] : el.dataset[store]);
    });
  });

  langToggle.querySelectorAll("[data-lang]").forEach((el) => {
    el.classList.toggle("current", el.dataset.lang === lang);
  });
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "en" : "fr";
  try {
    localStorage.setItem("lang", currentLang);
  } catch (error) {
    // stockage indisponible : le choix ne sera pas mémorisé
  }
  applyLanguage(currentLang);
});

// La page est écrite en français : rien à faire tant qu'on reste en français
if (currentLang !== "fr") {
  applyLanguage(currentLang);
}
