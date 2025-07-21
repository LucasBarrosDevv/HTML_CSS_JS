document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animações com Intersection Observer
    const animateElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-main, .section-title, .benefit-item, .code-card, .featured-code-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate__animated'); // Exemplo se usar Animate.css
                // Adicione classes de animação específicas aqui, como 'animate__fadeInUp'
                // Para este exemplo, usaremos as animações CSS definidas no style.css
                if (entry.target.classList.contains('hero-title') || entry.target.classList.contains('hero-subtitle')) {
                    entry.target.style.animation = 'slideInLeft 1s ease-out forwards';
                } else if (entry.target.classList.contains('cta-main')) {
                    entry.target.style.animation = 'pulse 2s infinite';
                } else {
                    entry.target.style.animation = 'fadeIn 1s ease-out forwards';
                }
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // Ajuste o threshold conforme necessário

    animateElements.forEach(element => {
        element.style.animationPlayState = 'paused'; // Pausa a animação até estar visível
        observer.observe(element);
    });


    // Lógica do Modal de Download
    const downloadModal = document.getElementById('download-modal');
    const closeButton = document.querySelector('.close-button');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCodeName = document.getElementById('modal-code-name');
    const modalDownloadLink = document.getElementById('modal-download-link');

    document.querySelectorAll('.btn-download').forEach(button => {
        button.addEventListener('click', function() {
            const codeName = this.dataset.codeName;
            const downloadUrl = this.dataset.downloadUrl;

            modalCodeName.textContent = codeName;
            modalDownloadLink.href = downloadUrl;
            downloadModal.style.display = 'flex'; // Exibe o modal
        });
    });

    closeButton.addEventListener('click', () => {
        downloadModal.style.display = 'none'; // Oculta o modal
    });

    modalCloseBtn.addEventListener('click', () => {
        downloadModal.style.display = 'none'; // Oculta o modal
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === downloadModal) {
            downloadModal.style.display = 'none';
        }
    });

    // Exemplo de interação: mudança de cor de fundo ao scroll (opcional)
    // Isso é um exemplo simples, para animações mais complexas, use bibliotecas como GSAP ou scroll-based animations.
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Ajuste estes valores para controlar quando a cor muda
        if (scrollY > 300) {
            document.body.style.backgroundColor = '#0f0f1d';
        } else {
            document.body.style.backgroundColor = 'var(--color-dark-background)';
        }
    });
});