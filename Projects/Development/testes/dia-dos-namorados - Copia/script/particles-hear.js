 // Animação dos parágrafos
    const paragraphs = document.querySelectorAll("#text-container p");
    let currentIndex = 0;

    function showParagraph(index) {
      paragraphs.forEach((p, i) => {
        if (i === index) {
          p.classList.add("show");
        } else {
          p.classList.remove("show");
        }
      });
    }

  function cycleParagraphs() {
  if (currentIndex < paragraphs.length) {
    showParagraph(currentIndex);
    currentIndex++;
    setTimeout(cycleParagraphs, 2500);
  } else {
    // Quando terminar todos, esconde o último parágrafo
    paragraphs.forEach(p => p.classList.remove("show"));
  }
}



   setTimeout(() => {
  cycleParagraphs();
}, 5000); // 5000 ms = 5 segundos

    // Código das partículas

    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateParticles();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function heartFunction(t, scale) {
      const x = scale * 16 * Math.pow(Math.sin(t), 3);
      const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x, y };
    }

    function generateParticles() {
      particles = [];
      const numParticles = 800;
      const scale = 12;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < numParticles; i++) {
        const t = Math.random() * Math.PI * 2;
        const { x, y } = heartFunction(t, scale);

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          destX: centerX + x,
          destY: centerY + y,
          radius: 1.5 + Math.random(),
          speed: 0.01 + Math.random() * 0.03
        });
      }
    }

 let animationProgress = 0; // progresso da animação de "ir para o coração"
const animationDuration = 300; // duração em frames (~5 segundos a 60fps)

let explodePhase = false; // fase em que as partículas voam para fora
let particlesAlpha = 1; // opacidade das partículas na fase de explosão

// Depois de 7 segundos começa a fase de "explosão"
setTimeout(() => {
  explodePhase = true;

  // Define velocidades aleatórias para cada partícula
  for (let p of particles) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = 2 + Math.random() * 3;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
  }
}, 16000);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!explodePhase) {
    // Animação normal, partículas vão para o coração
    if (animationProgress < 1) {
      animationProgress += 1 / animationDuration;
      if (animationProgress > 1) animationProgress = 1;
    }

    for (let p of particles) {
      const dx = p.destX - p.x;
      const dy = p.destY - p.y;

      const currentSpeed = p.speed * animationProgress;

      p.x += dx * currentSpeed;
      p.y += dy * currentSpeed;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  } else {
    // Fase explosão: partículas voam para fora e somem

    particlesAlpha -= 0.01; // reduz opacidade gradualmente
    if (particlesAlpha < 0) particlesAlpha = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 0, ${particlesAlpha})`;
      ctx.fill();
    }
  }

  requestAnimationFrame(animate);
}



    animate();