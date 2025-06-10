 const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Definindo o tamanho do canvas para ocupar a tela toda
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Função para atualizar o tamanho caso a janela seja redimensionada
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Criando partículas
    const numParticles = 100;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5
      });
    }

    // Função para desenhar as partículas
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        // Fazer as partículas voltarem para a tela ao saírem
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
    }

    // Função de animação
    function animate() {
      drawParticles();
      requestAnimationFrame(animate);
    }

    animate();