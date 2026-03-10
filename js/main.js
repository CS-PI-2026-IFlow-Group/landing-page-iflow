const menuToggle = document.querySelector(".menu-toggle");
const navBar = document.querySelector(".nav-bar");
const overlay = document.querySelector(".overlay");

// variaveis para as imgs
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("expandedImg");
const closeModal = document.getElementById("closeModal");
const carouselImages = document.querySelectorAll(".carrossel-img");

const track = document.getElementById("track");
const prevBtn = document.querySelector(".carrossel-btn.prev");
const nextBtn = document.querySelector(".carrossel-btn.next");

function toggleMenu() {
  menuToggle.classList.toggle("active");
  navBar.classList.toggle("active");
  overlay.classList.toggle("active");
}

menuToggle.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

let fontSize = 16;
const htmlElement = document.documentElement;

document.getElementById("aumentar-fonte").addEventListener("click", () => {
  if (fontSize < 24) {
    fontSize += 2;
    htmlElement.style.fontSize = fontSize + "px";
  }
});

document.getElementById("diminuir-fonte").addEventListener("click", () => {
  if (fontSize > 12) {
    fontSize -= 2;
    htmlElement.style.fontSize = fontSize + "px";
  }
});

const btnContraste = document.getElementById("alto-contraste");
btnContraste.addEventListener("click", () => {
  document.body.classList.toggle("alto-contraste");

  const isContraste = document.body.classList.contains("alto-contraste");
  localStorage.setItem("alto-contraste", isContraste);
});

window.addEventListener("DOMContentLoaded", () => {
  const contrastSaved = localStorage.getItem("alto-contraste");
  if (contrastSaved === "true") {
    document.body.classList.add("alto-contraste");
  }
});

// tratamento do scroll das imagens
carouselImages.forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    modalImg.src = this.src;

    clearInterval(autoPlayInterval);
  });
});

function closeImageModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
  startAutoPlay();
}

closeModal.addEventListener("click", closeImageModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeImageModal();
});

let currentIndex = 0;
let autoPlayInterval;
const delay = 4000;

function updateCarousel() {
  if (carouselImages.length === 0) return;

  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  if (currentIndex >= carouselImages.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateCarousel();
}

function prevSlide() {
  if (currentIndex <= 0) {
    currentIndex = carouselImages.length - 1;
  } else {
    currentIndex--;
  }
  updateCarousel();
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoPlay();
});

function startAutoPlay() {
  clearInterval(autoPlayInterval);

  autoPlayInterval = setInterval(nextSlide, delay);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

track.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
track.addEventListener("mouseleave", startAutoPlay);

window.addEventListener("resize", updateCarousel);

startAutoPlay();
