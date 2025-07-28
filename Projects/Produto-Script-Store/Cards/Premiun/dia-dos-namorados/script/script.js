// Função auxiliar para detectar dispositivos touch
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Configuração inicial do mouse/touch
let mouse = { 
  x: null, 
  y: null, 
  radius: isTouchDevice() ? 105 : 70 // Raio 30% menor (150/100 * 0.7)
};

// Animação de texto
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
    setTimeout(cycleParagraphs, 1750); // 2500 * 0.7 = 1750ms
  } else {
    paragraphs.forEach(p => p.classList.remove("show"));
  }
}

// Configuração do canvas do coração
const heartCanvas = document.getElementById("heartCanvas");
const heartCtx = heartCanvas.getContext("2d");
let particles = [];
let interactionEnabled = false;

function resizeHeartCanvas() {
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
  generateParticles();
}

window.addEventListener("resize", resizeHeartCanvas);
resizeHeartCanvas();

// Função matemática para gerar o formato do coração
function heartFunction(t, scale) {
  const x = scale * 16 * Math.pow(Math.sin(t), 3);
  const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x, y };
}

// Geração de partículas
function generateParticles() {
  particles = [];

  const width = heartCanvas.width;
  const height = heartCanvas.height;

  const baseParticles = 800;
  const screenFactor = Math.max(0.2, Math.min(1, width / 600));
  const numParticles = Math.floor(baseParticles * screenFactor);
  const scale = 12 * screenFactor * 0.7; // scale menor 30%

  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < numParticles; i++) {
    const t = Math.random() * Math.PI * 2;
    const { x, y } = heartFunction(t, scale);

    const baseRadius = (1.5 * screenFactor + Math.random()) * 0.7; // menor

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      destX: centerX + x,
      destY: centerY + y,
      radius: baseRadius,
      speed: (0.01 + Math.random() * 0.03) * 0.7,
      floatVx: (Math.random() - 0.5) * 0.35, // 0.5 * 0.7
      floatVy: (Math.random() - 0.5) * 0.35,
      floatTime: Math.random() * Math.PI * 2,
      baseRadius: baseRadius,
      friction: 0.95,
      velocityX: 0,
      velocityY: 0
    });
  }
}

// Variáveis de animação
let animationProgress = 0;
const animationDuration = Math.floor(300 * 0.7); // 210
let explodePhase = false;
let particlesAlpha = 1;
let heartAnimationId;
let animationStarted = false;
let floatingMode = true;

// Função para calcular distância entre pontos
function getDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// Event listeners para interação
heartCanvas.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

heartCanvas.addEventListener('mouseout', function() {
  mouse.x = null;
  mouse.y = null;
});

heartCanvas.addEventListener('touchmove', function(event) {
  event.preventDefault();
  const touch = event.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
}, { passive: false });

heartCanvas.addEventListener('touchend', function() {
  mouse.x = null;
  mouse.y = null;
});

// Função principal de animação
function animateHeart() {
  heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

  if (floatingMode) {
    // Modo flutuação - partículas se movem suavemente
    for (let p of particles) {
      p.floatTime += 0.014; // 0.02 * 0.7
      
      // Movimento de flutuação base
      p.x += Math.sin(p.floatTime) * 0.21 + p.floatVx; // 0.3 * 0.7
      p.y += Math.cos(p.floatTime * 0.8) * 0.14 + p.floatVy; // 0.2 * 0.7

      if (interactionEnabled && mouse.x !== null && mouse.y !== null) {
        const distance = getDistance(p.x, p.y, mouse.x, mouse.y);
        const touchRadius = mouse.radius * (isTouchDevice() ? 1.5 : 1);

        if (distance < touchRadius) {
          const force = (touchRadius - distance) / touchRadius;
          const directionX = p.x - mouse.x;
          const directionY = p.y - mouse.y;

          // Força reduzida para repelir discretamente
          p.velocityX += directionX * force * 0.01;
          p.velocityY += directionY * force * 0.01;
        }
      }
      
      // Aplicar velocidade e fricção
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.velocityX *= p.friction;
      p.velocityY *= p.friction;

      // Manter partículas dentro da tela
      if (p.x < 0) {
        p.x = 0;
        p.floatVx *= -1;
        p.velocityX *= -0.5;
      } else if (p.x > heartCanvas.width) {
        p.x = heartCanvas.width;
        p.floatVx *= -1;
        p.velocityX *= -0.5;
      }
      
      if (p.y < 0) {
        p.y = 0;
        p.floatVy *= -1;
        p.velocityY *= -0.5;
      } else if (p.y > heartCanvas.height) {
        p.y = heartCanvas.height;
        p.floatVy *= -1;
        p.velocityY *= -0.5;
      }

      heartCtx.beginPath();
      heartCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      heartCtx.fillStyle = "red";
      heartCtx.fill();
    }
  } else if (!explodePhase) {
    // Modo formação do coração
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

      heartCtx.beginPath();
      heartCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      heartCtx.fillStyle = "red";
      heartCtx.fill();
    }
  } else {
    // Modo explosão
    let particlesVisible = 0;

    for (let p of particles) {
      p.x += p.vx * 0.7; // 30% menor deslocamento explosão
      p.y += p.vy * 0.7;

      if (p.x >= 0 && p.x <= heartCanvas.width && p.y >= 0 && p.y <= heartCanvas.height) {
        heartCtx.beginPath();
        heartCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        heartCtx.fillStyle = 'rgba(255, 0, 0, 1)';
        heartCtx.fill();
        particlesVisible++;
      }
    }

    if (particlesVisible === 0) {
      cancelAnimationFrame(heartAnimationId);
      heartCanvas.style.display = 'none';
      document.getElementById('teamoCanvas').style.display = 'block';
      document.getElementById('text-container').style.display = 'none';
      startRainLove();
      return;
    }
  }

  heartAnimationId = requestAnimationFrame(animateHeart);
}

// Classe para explosões na tela de rain love
class Explosion {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.particles = [];
    this.particleCount = Math.floor((15 + Math.random() * 10) * 0.7);
    this.color = '#FF1493';
    this.lifespan = Math.floor(60 * 0.7);
    this.currentFrame = 0;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.5 + Math.random() * 2) * 0.7;
      const size = (1 + Math.random() * 2) * 0.7;
      const life = (30 + Math.random() * 30) * 0.7;
      
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        alpha: 1,
        life: life,
        maxLife: life
      });
    }
  }

  update() {
    this.currentFrame++;
    
    if (this.currentFrame >= this.lifespan) {
      return false;
    }

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.alpha = p.life / p.maxLife;
      
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        i--;
        continue;
      }
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 20, 147, ${p.alpha})`;
      this.ctx.fill();
    }
    
    return true;
  }
}

// Função para iniciar a chuva de "TeAmo"
function startRainLove() {
  const canvas = document.getElementById('teamoCanvas');
  const ctx = canvas.getContext('2d');

  const phrase = "TeAmo";
  const baseFontSize = 18;
  const scaleFactor = Math.max(0.3, Math.min(1, window.innerWidth / 600));
  const fontSize = baseFontSize * scaleFactor * 0.7; // 30% menor
  
  let columns;
  let drops;
  let explosions = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = `${fontSize}px Arial`;

    const colWidth = fontSize;
    columns = Math.floor(canvas.width / colWidth);
    drops = new Array(columns).fill(0);
  }

  resizeCanvas();
  const heartColor = '#F52420';

  // Event listener para toque/click (explosões)
  canvas.addEventListener('click', function(event) {
    explosions.push(new Explosion(event.clientX, event.clientY, ctx));
  });

  canvas.addEventListener('touchstart', function(event) {
    event.preventDefault();
    const touch = event.touches[0];
    explosions.push(new Explosion(touch.clientX, touch.clientY, ctx));
  }, { passive: false });

  function drawLove() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < explosions.length; i++) {
      const isActive = explosions[i].update();
      if (!isActive) {
        explosions.splice(i, 1);
        i--;
      }
    }

    ctx.fillStyle = heartColor;
    ctx.font = fontSize + 'px monospace';

    const colWidth = ctx.measureText(phrase).width;

    for (let i = 0; i < columns; i++) {
      const x = i * colWidth;
      const y = drops[i] * fontSize;

      ctx.fillText(phrase, x, y);
      drops[i]++;

      if (y > canvas.height && Math.random() > 0.960) {
        drops[i] = 0;
      }
    }
  }

  setInterval(drawLove, 45); // 65 * 0.7 = 45
  window.addEventListener('resize', resizeCanvas);
}

// Iniciar animação
animateHeart();

// Event listener para o botão de início
document.getElementById('startButton').addEventListener('click', () => {
  if (animationStarted) return;
  animationStarted = true;

  // Iniciar música
  document.getElementById('myAudio').play();

  // Mostrar mensagens centrais
  setTimeout(() => {
    showCentralMessages();
  }, 1400); // 2000 * 0.7 = 1400ms

  // Esconder o botão
  const button = document.getElementById('startButton');
  button.classList.add('fade-out');
  setTimeout(() => {
    button.style.display = 'none';
  }, 560); // 800 * 0.7

  // Habilitar interação
  interactionEnabled = true;

  // Sequência de animações
  setTimeout(() => {
    floatingMode = false;
    interactionEnabled = false;
    animationProgress = 0;
    
    setTimeout(() => {
      cycleParagraphs();
    }, 3150); // 4500 * 0.7

    setTimeout(() => {
      explodePhase = true;
      for (let p of particles) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = (2 + Math.random() * 3) * 0.7;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
      }
    }, 9100); // 13000 * 0.7
  }, 9100); // 13000 * 0.7
});

// Função para mostrar mensagens centrais
function showCentralMessages() {
  const centralMessage = document.getElementById("central-message");
  const msgs = centralMessage.querySelectorAll("p");
  let idx = 0;
  centralMessage.style.display = "block";

  function showNext() {
    if (idx < msgs.length) {
      msgs[idx].classList.add("show");
      setTimeout(() => {
        msgs[idx].classList.remove("show");
        idx++;
        setTimeout(showNext, 1400); // 2000 * 0.7
      }, 1400);
    } else {
      setTimeout(() => {
        centralMessage.style.display = "none";
      }, 1050); // 1500 * 0.7
    }
  }

  setTimeout(showNext, 1050); // 1500 * 0.7
}
