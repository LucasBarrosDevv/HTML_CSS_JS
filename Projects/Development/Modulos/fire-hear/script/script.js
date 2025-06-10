
class AmorEmPixels {
      constructor() {
        this.activeSection = 0;
        this.sections = document.querySelectorAll('.carousel-section');
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        
        this.init();
      }

      init() {
        this.createParticles();
        this.setupIntersectionObserver();
        this.setupScrollIndicator();
      }

      createParticles() {
        this.sections.forEach(section => {
          const particles = section.querySelector('.particles');
          for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (3 + Math.random() * 4) + 's';
            particles.appendChild(particle);
          }
        });
      }
      
      setupIntersectionObserver() {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const sectionIndex = parseInt(entry.target.dataset.section);
                this.updateActiveSection(sectionIndex);
              }
            });
          },
          {
            threshold: 0.5,
            rootMargin: '0px'
          }
        );

        this.sections.forEach(section => {
          observer.observe(section);
        });
      }

      setupScrollIndicator() {
        // Esconder indicador após primeiro scroll
        let hasScrolled = false;
        document.getElementById('container').addEventListener('scroll', () => {
          if (!hasScrolled) {
            this.scrollIndicator.classList.remove('visible');
            hasScrolled = true;
          }
        });
      }

      updateActiveSection(newIndex) {
        if (this.activeSection === newIndex) return;

        const oldIndex = this.activeSection;
        this.activeSection = newIndex;

        // Atualizar indicadores de progresso
        this.progressDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === newIndex);
        });

        // Aplicar transformações e efeitos
        this.sections.forEach((section, index) => {
          const offset = Math.max(0, (index - newIndex) * 10);
          const overlay = section.querySelector('.section-overlay');
          const title = section.querySelector('.section-title');
          const subtitle = section.querySelector('.section-subtitle');

          // Transformação da seção
          section.style.transform = `translateY(${offset}px)`;
          section.style.boxShadow = index > newIndex ? 
            '0 -10px 30px rgba(0,0,0,0.3)' : 'none';

          // Overlay para profundidade
          if (overlay) {
            overlay.style.opacity = index > newIndex ? '0.1' : '0';
          }

          // Animações do texto
          if (title) {
            title.style.transform = `translateY(${(index - newIndex) * 20}px)`;
            title.style.opacity = index === newIndex ? '1' : '0.7';
          }

          if (subtitle) {
            subtitle.style.transform = `translateY(${(index - newIndex) * 30}px)`;
            subtitle.style.opacity = index === newIndex ? '1' : '0.5';
          }
        });
      }
    }

    // Inicializar quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', () => {
      new AmorEmPixels();
    });

    // Prevenir zoom em dispositivos móveis
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });

    document.addEventListener('gesturechange', function (e) {
      e.preventDefault();
    });

    document.addEventListener('gestureend', function (e) {
      e.preventDefault();
    });