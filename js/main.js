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
const form = document.getElementById('form-contato');
const btnWhatsapp = document.getElementById('btn-whatsapp');

// Mapeamento dos campos para facilitar a manutenção
const camposConfig = [
  { id: 'nome', erroId: 'error-nome', msg: 'Digite seu nome completo.' },
  { id: 'email', erroId: 'error-email', msg: 'Informe um e-mail válido.' },
  { id: 'mensagem', erroId: 'error-mensagem', msg: 'Escreva uma breve descrição.' }
];

// Função para limpar o erro de um campo específico
function limparErro(input, erroSpan) {
  input.classList.remove('input-error');
  erroSpan.style.display = 'none';
  erroSpan.textContent = '';
}

camposConfig.forEach(campo => {
  const input = document.getElementById(campo.id);
  const erroSpan = document.getElementById(campo.erroId);

  input.addEventListener('input', () => {
    if (input.value.trim() !== "") {
      if (campo.id === 'email') {
        if (input.validity.valid) limparErro(input, erroSpan);
      } else {
        limparErro(input, erroSpan);
      }
    }
  });
});

function validarFormulario() {
  let statusValido = true;

  camposConfig.forEach(campo => {
    const input = document.getElementById(campo.id);
    const erroSpan = document.getElementById(campo.erroId);

    if (!input.value.trim() || (campo.id === 'email' && !input.validity.valid)) {
      input.classList.add('input-error');
      erroSpan.textContent = campo.msg;
      erroSpan.style.display = 'block';
      statusValido = false;
    } else {
      limparErro(input, erroSpan);
    }
  });

  return statusValido;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validarFormulario()) {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const emailDestino = "contato@iflowgroup.com";

    const assunto = encodeURIComponent("Contato via Landing Page - IFlow Group");
    const corpo = encodeURIComponent(`Olá, sou ${nome}.\n\nDescrição:\n${mensagem}`);

    window.location.href = `mailto:${emailDestino}?subject=${assunto}&body=${corpo}`;
    this.reset();
  }
});

btnWhatsapp.addEventListener('click', function() {
  if (validarFormulario()) {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const numeroTelefone = "5500000000000";

    const texto = `Olá, sou ${nome}. ${mensagem}`;
    const msgCodificada = encodeURIComponent(texto);

    window.open(`https://wa.me/${numeroTelefone}?text=${msgCodificada}`, '_blank');
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




const faq = document.getElementById("faq-container");

fetch("json/faq.json")
    .then(resposta => resposta.json())
    .then(faqLista =>{
        faqLista.forEach(item =>{
            const details = document.createElement("details");
            const summary = document.createElement("summary");
            const p = document.createElement("p");
            const img = document.createElement("img");
            img.src = "assets/svg/caret-faq.svg"
            img.alt = "seta para abrir pergunta"
            img.classList.add("caret-faq-icon");


            summary.textContent = item.pergunta;
            summary.append(img);
            p.textContent = item.resposta;

            details.append(summary);
            details.append(p);

            faq.append(details);
    });


const todasTagsDetails = document.querySelectorAll("details");

todasTagsDetails.forEach((details)=>{
    details.addEventListener("toggle", () => {
    if(details.open){
        todasTagsDetails.forEach((outro)=>{

            if(details !== outro){
                   outro.removeAttribute("open");
            }
        }
        )
    }



})


});






});

const quemSomos = document.querySelector(".container-membros");

fetch("json/membros.json")
    .then(resposta => resposta.json())
    .then(membrosLista => {
        membrosLista.forEach(item => {
        const nomeMembro = document.createElement("h1");
        const cargo = document.createElement("p");
        const descricaoCargo = document.createElement("h3");
        const foto = document.createElement("img");
        const membroUnico = document.createElement("div");
        const botaoGit = document.createElement("a");
        const botaoLinkedin = document.createElement("a");


        membroUnico.classList.add("membro-unico-container");

        foto.src = item.foto;
        foto.alt = item.descricaoFoto;
        foto.classList.add("foto-membro");

        nomeMembro.textContent = item.nome;
        cargo.textContent = item.cargo;
        descricaoCargo.textContent = item.descricaoCargo;

        botaoGit.href = item.linkGit;
        botaoGit.contextText =

        membroUnico.appendChild(foto);
        membroUnico.appendChild(nomeMembro);
        membroUnico.appendChild(cargo);
        membroUnico.appendChild(descricaoCargo);

        quemSomos.appendChild(membroUnico);


        })




    })