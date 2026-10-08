// Carrousel des projets.
//
// Le défilement lui-même est assuré par le navigateur (CSS scroll-snap, voir
// css/projects.css) : ce script ne déplace jamais les cartes « à la main ».
// Il ajoute :
//   - les flèches et les points de navigation ;
//   - la mise en avant de la carte centrée (.is-active) ;
//   - les flèches gauche / droite du clavier ;
//   - une lecture automatique, qui s'arrête dès que le visiteur prend la main.

const AUTOPLAY_DELAY = 7000; // millisecondes entre deux projets

const carousel = document.getElementById("projectCarousel");

if (carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.querySelectorAll(".project-slide"));
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current = 0;
  let autoplayTimer = null;
  let autoplayStopped = reducedMotion; // pas de lecture auto si l'animation est réduite
  let isHovered = false;
  let isOnScreen = false;

  carousel.style.setProperty("--autoplay-delay", AUTOPLAY_DELAY + "ms");

  // --- Points de navigation -------------------------------------------------

  const dots = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", slide.querySelector("h3").textContent.trim());
    dot.addEventListener("click", () => {
      stopAutoplay();
      goTo(i);
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  // --- Déplacement ----------------------------------------------------------

  // Position de défilement qui centre la carte i dans la piste
  function scrollPositionOf(i) {
    const slide = slides[i];
    return slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
  }

  function goTo(i) {
    const index = (i + slides.length) % slides.length; // boucle aux deux extrémités
    track.scrollTo({
      left: scrollPositionOf(index),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  // --- Carte active ---------------------------------------------------------

  // La carte active est celle dont le centre est le plus proche du centre de la piste
  function findCenteredSlide() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  }

  function setActive(i) {
    current = i;
    slides.forEach((slide, index) => slide.classList.toggle("is-active", index === i));
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === i);
      if (index === i) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  let scrollFrame = null;
  track.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        const centered = findCenteredSlide();
        if (centered !== current) {
          setActive(centered);
          restartAutoplay(); // repart pour un délai complet sur le nouveau projet
        }
      });
    },
    { passive: true }
  );

  // --- Lecture automatique --------------------------------------------------

  function pauseAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
    carousel.classList.remove("is-playing");
  }

  function restartAutoplay() {
    pauseAutoplay();
    if (autoplayStopped || isHovered || !isOnScreen || document.hidden) return;
    // forcer le navigateur à relancer l'animation du point actif
    void carousel.offsetWidth;
    carousel.classList.add("is-playing");
    autoplayTimer = setTimeout(() => goTo(current + 1), AUTOPLAY_DELAY);
  }

  // Arrêt définitif : le visiteur a pris la main
  function stopAutoplay() {
    autoplayStopped = true;
    pauseAutoplay();
  }

  prevBtn.addEventListener("click", () => {
    stopAutoplay();
    goTo(current - 1);
  });

  nextBtn.addEventListener("click", () => {
    stopAutoplay();
    goTo(current + 1);
  });

  // Glisser au doigt, molette, clic ou tabulation dans une carte : on arrête
  ["pointerdown", "wheel", "touchstart"].forEach((type) => {
    track.addEventListener(type, stopAutoplay, { passive: true });
  });
  track.addEventListener("focusin", stopAutoplay);

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      stopAutoplay();
      goTo(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  // Simple pause au survol, reprise quand la souris sort
  carousel.addEventListener("mouseenter", () => {
    isHovered = true;
    pauseAutoplay();
  });
  carousel.addEventListener("mouseleave", () => {
    isHovered = false;
    restartAutoplay();
  });

  // La lecture ne tourne que si le carrousel est visible à l'écran
  new IntersectionObserver(
    (entries) => {
      isOnScreen = entries[0].isIntersecting;
      restartAutoplay();
    },
    { threshold: 0.4 }
  ).observe(carousel);

  document.addEventListener("visibilitychange", restartAutoplay);

  // --- Démarrage ------------------------------------------------------------

  setActive(0);
  carousel.classList.add("is-ready");
}
