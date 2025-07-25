const cardBtn = document.querySelector('.seletor-card');
const listaBtn = document.querySelector('.seletor-lista');

// Aplica o modo padrão ao carregar
window.addEventListener('DOMContentLoaded', () => {
  cardBtn.classList.add('active');
});

// Alternar para modo Card
cardBtn.addEventListener('click', () => {
  document.body.classList.remove('lista');
  cardBtn.classList.add('active');
  listaBtn.classList.remove('active');

  // Remover CSS e JS do modo lista se estiverem carregados
  removeDynamicAssets('lista.css');
  removeDynamicAssets('lista.js');
});

// Alternar para modo Lista
listaBtn.addEventListener('click', () => {
  document.body.classList.add('lista');
  cardBtn.classList.remove('active');
  listaBtn.classList.add('active');

  // Carregar CSS e JS externos do modo lista
  loadCSS('/styles/lista.css');
  loadJS('/scripts/lista.js');
});

// Função para carregar CSS dinamicamente
function loadCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

// Função para carregar JS dinamicamente
function loadJS(src) {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  }
}

// Função para remover CSS/JS já carregados
function removeDynamicAssets(file) {
  const el = document.querySelector(`link[href$="${file}"], script[src$="${file}"]`);
  if (el) el.remove();
}

// Toggle "Ver mais"/"Ver menos" para modo Card
document.querySelectorAll('.toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.code-card');
    const previewContainer = card.querySelector('.code-preview-container');
    const isExpanded = card.classList.contains('expanded');

    if (!isExpanded) {
      // Expandir
      card.classList.add('expanded');
      btn.textContent = 'Ver menos';

      if (!previewContainer.querySelector('iframe')) {
        const iframeSrc = previewContainer.getAttribute('data-src');
        if (iframeSrc) {
          const iframe = document.createElement('iframe');
          iframe.src = iframeSrc;
          iframe.loading = 'lazy';
          iframe.setAttribute('allowfullscreen', '');
          previewContainer.appendChild(iframe);
        }
      }
    } else {
      // Fechar
      card.classList.remove('expanded');
      btn.textContent = 'Ver mais';

      const iframe = previewContainer.querySelector('iframe');
      if (iframe) iframe.remove();
    }
  });
});

/* ===== Melhorias para o modo lista ===== */
document.addEventListener("DOMContentLoaded", () => {
  function restructureCardsForList() {
    const cards = document.querySelectorAll(".code-card");

    cards.forEach((card) => {
      // Verificar se já foi reestruturado
      if (card.querySelector(".code-card-header")) return;

      const codeInfo = card.querySelector(".code-info");
      const codeName = card.querySelector(".code-name");
      const codeTags = card.querySelector(".code-tags");
      const codePrice = card.querySelector(".code-price");
      const toggleBtn = card.querySelector(".toggle-btn");
      const previewContainer = card.querySelector(".code-preview-container");
      const extraInfo = card.querySelector(".code-extra-info");

      // Criar nova estrutura
      const cardHeader = document.createElement("div");
      cardHeader.className = "code-card-header";

      const cardLeft = document.createElement("div");
      cardLeft.className = "code-card-left";

      const cardRight = document.createElement("div");
      cardRight.className = "code-card-right";

      const expandedContent = document.createElement("div");
      expandedContent.className = "code-expanded-content";

      // Reorganizar elementos
      cardLeft.appendChild(codeName.cloneNode(true));
      cardLeft.appendChild(codeTags.cloneNode(true));

      cardRight.appendChild(codePrice.cloneNode(true));
      cardRight.appendChild(toggleBtn.cloneNode(true));

      cardHeader.appendChild(cardLeft);
      cardHeader.appendChild(cardRight);

      expandedContent.appendChild(previewContainer.cloneNode(true));
      expandedContent.appendChild(extraInfo.cloneNode(true));

      // Limpar card e adicionar nova estrutura
      card.innerHTML = "";
      card.appendChild(cardHeader);
      card.appendChild(expandedContent);

      // Animação de entrada com delay
      const index = Array.from(cards).indexOf(card);
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  function setupCardToggle() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("toggle-btn") || e.target.closest(".toggle-btn")) {
        e.preventDefault();
        e.stopPropagation();

        const btn = e.target.classList.contains("toggle-btn") ? e.target : e.target.closest(".toggle-btn");
        const card = btn.closest(".code-card");
        const expandedContent = card.querySelector(".code-expanded-content");
        const previewContainer = card.querySelector(".code-preview-container");
        const isExpanded = card.classList.contains("expanded");

        if (!isExpanded) {
          // Expandir
          card.classList.add("expanded");
          btn.textContent = "Ver menos";

          // Carregar iframe se não existir
          const iframe = previewContainer.querySelector("iframe");
          if (!iframe) {
            const iframeSrc = previewContainer.getAttribute("data-src");
            if (iframeSrc) {
              const newIframe = document.createElement("iframe");
              newIframe.src = iframeSrc;
              newIframe.loading = "lazy";
              newIframe.setAttribute("allowfullscreen", "");
              previewContainer.appendChild(newIframe);
            }
          }

          // Scroll suave para o card expandido
          setTimeout(() => {
            card.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }, 200);
        } else {
          // Contrair
          card.classList.remove("expanded");
          btn.textContent = "Ver mais";

          // Remover iframe para economizar recursos
          const iframe = previewContainer.querySelector("iframe");
          if (iframe) {
            iframe.remove();
          }
        }
      }
    });
  }

  function applyVisualEffects() {
    const cards = document.querySelectorAll(".code-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });
  }

  function optimizePerformance() {
    const iframes = document.querySelectorAll("iframe[data-src]");

    const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          if (iframe.getAttribute("data-src") && !iframe.src) {
            iframe.src = iframe.getAttribute("data-src");
            iframeObserver.unobserve(iframe);
          }
        }
      });
    });

    iframes.forEach((iframe) => {
      iframeObserver.observe(iframe);
    });
  }

  function initListMode() {
    if (document.body.classList.contains("lista")) {
      restructureCardsForList();
      setupCardToggle();
      applyVisualEffects();
      optimizePerformance();
    }
  }

  // Observer para detectar mudanças na classe body (modo lista)
  const bodyObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (document.body.classList.contains("lista")) {
          setTimeout(initListMode, 100);
        }
      }
    });
  });

  bodyObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Inicializa se já estiver no modo lista
  initListMode();

  // Responsividade para iframes no modo lista
  window.addEventListener("resize", () => {
    if (document.body.classList.contains("lista")) {
      const expandedCards = document.querySelectorAll(".code-card.expanded");
      expandedCards.forEach((card) => {
        const iframe = card.querySelector("iframe");
        if (iframe) {
          iframe.style.height = "0px";
          setTimeout(() => {
            iframe.style.height = window.innerWidth <= 768 ? "250px" : "300px";
          }, 10);
        }
      });
    }
  });
});
document.querySelectorAll('.code-iframe').forEach((iframe) => {
  iframe.addEventListener('click', (e) => {
    const card = iframe.closest('.code-card');
    card.classList.add('show-info');
  });
});
