// MENU MOBILE

const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// DARK MODE

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// LANGUE

let currentLang = "fr";

const langToggle = document.getElementById("langToggle");
const langFlag = document.getElementById("langFlag");

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "en" : "fr";
  langFlag.src = currentLang === "fr"
    ? "images/flags/fr.png"
    : "images/flags/en.png";

  document.querySelectorAll("[data-fr]").forEach(el => {
    el.textContent = el.getAttribute("data-" + currentLang);
  });
});

// ANIMATION AU SCROLL

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll("section, .project-card, .skill").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ANIMATION COMPÉTENCES

const skillBars = document.querySelectorAll(".skill-level");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const level = bar.getAttribute("data-level");
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = level + "%";
      }, 200);
    }
  });
});

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
