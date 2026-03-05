const menuToggle = document.querySelector(".menu-toggle");
const navBar = document.querySelector(".nav-bar");
const overlay = document.querySelector(".overlay");

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
