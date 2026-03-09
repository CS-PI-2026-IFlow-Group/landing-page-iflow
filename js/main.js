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
