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

// dark mode e controle de temas
const btnTemaEscuro = document.getElementById("modo-escuro");
const btnAltoContraste = document.getElementById("alto-contraste");
const body = document.body;

window.addEventListener("DOMContentLoaded", () => {
  const contrasteSalvo = localStorage.getItem("alto-contraste");
  const temaAtual = localStorage.getItem("tema");

  if (contrasteSalvo === "true") {
    body.classList.add("alto-contraste");
  } else if (temaAtual === "dark") {
    body.classList.add("modo-escuro");
  }
});

btnAltoContraste.addEventListener("click", () => {
  body.classList.toggle("alto-contraste");

  if (body.classList.contains("alto-contraste")) {
    body.classList.remove("modo-escuro");
    localStorage.setItem("tema", "light");
  }

  const isContraste = body.classList.contains("alto-contraste");
  localStorage.setItem("alto-contraste", isContraste);
});

btnTemaEscuro.addEventListener("click", () => {
  body.classList.toggle("modo-escuro");

  if (body.classList.contains("modo-escuro")) {
    body.classList.remove("alto-contraste");
    localStorage.setItem("alto-contraste", "false");
  }

  if (body.classList.contains("modo-escuro")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

const form = document.getElementById("form-contato");
const btnWhatsapp = document.getElementById("btn-whatsapp");

// Mapeamento dos campos para facilitar a manutenção
const camposConfig = [
  { id: "nome", erroId: "error-nome", msg: "Digite seu nome completo." },
  { id: "email", erroId: "error-email", msg: "Informe um e-mail válido." },
  {
    id: "mensagem",
    erroId: "error-mensagem",
    msg: "Escreva uma breve descrição.",
  },
];

// Função para limpar o erro de um campo específico
function limparErro(input, erroSpan) {
  input.classList.remove("input-error");
  erroSpan.style.display = "none";
  erroSpan.textContent = "";
}

camposConfig.forEach((campo) => {
  const input = document.getElementById(campo.id);
  const erroSpan = document.getElementById(campo.erroId);

  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      if (campo.id === "email") {
        if (input.validity.valid) limparErro(input, erroSpan);
      } else {
        limparErro(input, erroSpan);
      }
    }
  });
});

function validarFormulario() {
  let statusValido = true;

  camposConfig.forEach((campo) => {
    const input = document.getElementById(campo.id);
    const erroSpan = document.getElementById(campo.erroId);

    if (
      !input.value.trim() ||
      (campo.id === "email" && !input.validity.valid)
    ) {
      input.classList.add("input-error");
      erroSpan.textContent = campo.msg;
      erroSpan.style.display = "block";
      statusValido = false;
    } else {
      limparErro(input, erroSpan);
    }
  });

  return statusValido;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validarFormulario()) {
    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const emailDestino = "contato@iflowgroup.com";

    const assunto = encodeURIComponent(
      "Contato via Landing Page - IFlow Group",
    );
    const corpo = encodeURIComponent(
      `Olá, sou ${nome}.\n\nDescrição:\n${mensagem}`,
    );

    window.location.href = `mailto:${emailDestino}?subject=${assunto}&body=${corpo}`;
    this.reset();
  }
});

btnWhatsapp.addEventListener("click", function () {
  if (validarFormulario()) {
    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const numeroTelefone = "5500000000000";

    const texto = `Olá, sou ${nome}. ${mensagem}`;
    const msgCodificada = encodeURIComponent(texto);

    window.open(
      `https://wa.me/${numeroTelefone}?text=${msgCodificada}`,
      "_blank",
    );
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
// ==================== i18n ====================
const langBtns = document.querySelectorAll(".lang-btn");
let currentLang = localStorage.getItem("lang") || "pt";
let translations = {};

async function loadTranslations(lang) {
    const res = await fetch(`./js/i18n/${lang}.json`);
    return await res.json();
}

async function setLanguage(lang) {
    translations = await loadTranslations(lang);
    currentLang = lang;
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) el.textContent = translations[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[key]) el.placeholder = translations[key];
    });

    document.documentElement.lang = lang;
    loadFaq(lang);
    loadMembros(lang);    langBtns.forEach(btn => {
        const isActive = btn.getAttribute("data-lang") === lang;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });
}

langBtns.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
});

setLanguage(currentLang);
closeModal.addEventListener("click", closeImageModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeImageModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeImageModal();
  }
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




const faqContainer = document.getElementById("faq-container");

function renderFaq(faqLista) {
    faqContainer.innerHTML = "";

    faqLista.forEach(item => {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        const p = document.createElement("p");
        const img = document.createElement("img");
        img.src = "assets/svg/caret-faq.svg";
        img.alt = "seta para abrir pergunta";
        img.classList.add("caret-faq-icon");

        summary.textContent = item.pergunta;
        summary.append(img);
        p.textContent = item.resposta;

        details.append(summary);
        details.append(p);
        faqContainer.append(details);
    });

    document.querySelectorAll("details").forEach(details => {
        details.addEventListener("toggle", () => {
            if (details.open) {
                document.querySelectorAll("details").forEach(outro => {
                    if (details !== outro) outro.removeAttribute("open");
                });
            }
        });
    });
}

function loadFaq(lang) {
    const arquivo = lang === "en" ? "json/faq-en.json" : "json/faq.json";
    fetch(arquivo)
        .then(res => res.json())
        .then(renderFaq);
}

loadFaq(currentLang);



const quemSomos = document.querySelector(".container-membros");

function loadMembros(lang) {
    fetch("./json/membros.json")
        .then(resposta => resposta.json())
        .then(membrosLista => {
            quemSomos.innerHTML = "";
            membrosLista.forEach(item => {
        const nomeMembro = document.createElement("h1");
        const cargo = document.createElement("p");
        const descricaoCargo = document.createElement("h3");
        const foto = document.createElement("img");
        const membroUnico = document.createElement("div");

      const botaoGit = document.createElement("a");
      const botaoLinkedin = document.createElement("a");
      const iconeGit = document.createElement("img");
      const iconeLinkedin = document.createElement("img");
      const contatoPessoal = document.createElement("div");

      membroUnico.classList.add("membro-unico-container");

      contatoPessoal.classList.add("contato-pessoal");

      foto.src = item.foto;
      foto.alt = item.descricaoFoto;
      foto.classList.add("foto-membro");

      iconeGit.src = "assets/svg/github.svg";
      iconeGit.alt = "ícone do GitHub";

      iconeLinkedin.src = "assets/svg/linkedin.svg";
      iconeLinkedin.alt = "ícone do LinkedIn";

        nomeMembro.textContent = item.nome;
                cargo.textContent = lang === "en" && item.cargo_en ? item.cargo_en : item.cargo;
        descricaoCargo.textContent = item.descricaoCargo;

      botaoGit.href = item.linkGit;
      botaoGit.target = "_blank";

      botaoLinkedin.href = item.botaoLinkedin;
      botaoLinkedin.target = "_blank";

      botaoLinkedin.appendChild(iconeLinkedin);
      botaoGit.appendChild(iconeGit);
      contatoPessoal.appendChild(botaoGit);
      contatoPessoal.appendChild(botaoLinkedin);

      membroUnico.appendChild(foto);
      membroUnico.appendChild(nomeMembro);
      membroUnico.appendChild(cargo);
      membroUnico.appendChild(descricaoCargo);
      membroUnico.appendChild(contatoPessoal);

                quemSomos.appendChild(membroUnico);
            });
        });
}

loadMembros(currentLang);

const menuAcessibilidade = document.getElementById("menu-acessibilidade");
const btnToggleAcessibilidade = document.getElementById(
  "btn-toggle-acessibilidade",
);

if (btnToggleAcessibilidade && menuAcessibilidade) {
  btnToggleAcessibilidade.addEventListener("click", () => {
    menuAcessibilidade.classList.toggle("aberta");
  });
}
