// Slide do carrossel
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");

function moveToSlide(n) {
  slideIndex = n;
  slides.forEach((slide, i) => {
    slide.style.display = i === n ? "block" : "none";
    dots[i].classList.toggle("active", i === n);
  });
}
moveToSlide(0);

// Temporizador para contagem regressiva
const targetDate = new Date("2026-06-25T00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("dias").innerHTML = `${dias}<span>Dias</span>`;
  document.getElementById("horas").innerHTML = `${horas}<span>Horas</span>`;
  document.getElementById("minutos").innerHTML = `${minutos}<span>Minutos</span>`;
  document.getElementById("segundos").innerHTML = `${segundos}<span>Segundos</span>`;
}, 1000);

// Efeito de áudio suave
window.addEventListener("load", () => {
  document.querySelectorAll('.audio').forEach(el => {
    setTimeout(() => el.classList.add('show'), 1000);
  });
});

// Confetes com intensidade reduzida
function criarConfetes() {
  const container = document.getElementById("confetes-container");
  for (let i = 0; i < 30; i++) {
    const confete = document.createElement("div");
    confete.className = "confete";
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.animationDuration = 3 + Math.random() * 2 + "s";
    confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confete.style.opacity = 0.5; // Mais translúcido
    confete.style.width = "6px";
    confete.style.height = "6px";
    container.appendChild(confete);
    setTimeout(() => confete.remove(), 6000);
  }
}
setInterval(criarConfetes, 3000); // Cria confetes a cada 3 segundos
