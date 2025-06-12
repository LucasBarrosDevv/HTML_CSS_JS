 const canvas = document.getElementById('fireCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * -3 - 1;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 50}, 100%, 50%)`;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.size > 0.2) this.size -= 0.05;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function handleParticles() {
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    }

    animate();