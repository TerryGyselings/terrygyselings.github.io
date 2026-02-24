const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".project-slide");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;
let autoScroll;

// Fonction pour afficher une slide
function showSlide(i) {
  const containerWidth = carousel.clientWidth;
  const slideWidth = slides[i].offsetWidth + 40;
  const offset = slideWidth * i - (containerWidth - slides[i].offsetWidth) / 2;
  carousel.style.transform = `translateX(${-offset}px)`;
  updateDots();
}

// Met à jour les points
function updateDots() {
  const dots = document.querySelectorAll(".carousel-dots span");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

// Crée les points
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === index) dot.classList.add("active");
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
    pauseAutoScroll(); // Pause auto scroll quand on clique sur un dot
  });
  dotsContainer.appendChild(dot);
});

slides.forEach((slide, i) => {
  slide.addEventListener("click", (e) => {
    const containerRect = carousel.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const slideCenter = slideRect.left + slideRect.width / 2;

    // Si on clique sur la moitié droite de la slide
    if (e.clientX > slideCenter) {
      index = (index - 1) % slides.length;
      showSlide(index);
      pauseAutoScroll();
    } 
    // Si on clique sur la moitié gauche de la slide
    else if (e.clientX < slideCenter) {
      index = (index + 1 + slides.length) % slides.length;
      showSlide(index);
      pauseAutoScroll();
    }
  });
});

// Flèches
nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide(index);
  pauseAutoScroll();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
  pauseAutoScroll();
});

// Scroll automatique
function startAutoScroll() {
  autoScroll = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 6000);
}

function pauseAutoScroll() {
  clearInterval(autoScroll);
}

// Démarre le scroll automatique
startAutoScroll();

// Pause auto-scroll au survol du carousel
carousel.addEventListener("mouseenter", pauseAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

// Affiche la première slide
showSlide(index);
