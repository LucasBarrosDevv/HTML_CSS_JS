// Expande/recolhe card manualmente
function toggleCard(button) {
  const card = button.closest(".code-card");
  card.classList.toggle("expanded");
  button.textContent = card.classList.contains("expanded") ? "Ver menos" : "Ver mais";
}

// Observa se cards expandidos saem da viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const card = entry.target;
    
    // Se o card saiu totalmente da viewport e está expandido
    if (!entry.isIntersecting && card.classList.contains("expanded")) {
      card.classList.remove("expanded");

      // Atualiza botão, se existir
      const button = card.querySelector(".toggle-button");
      if (button) button.textContent = "Ver mais";
    }
  });
}, {
  threshold: 0 // Aciona assim que o card começa a sair da tela
});

// Ativa observador nos cards
document.querySelectorAll(".code-card").forEach(card => {
  observer.observe(card);
});


// Redireciona para página de download
function downloadCode(codeName) {
  const pageMap = {
    "Fire Dynamic": "codes-free/download-fire.html",
    "Particulas": "codes-free/download-particles.html",
  };

  const page = pageMap[codeName];
  if (page) {
    window.open(page, "_blank"); // Abre em nova aba
  } else {
    alert("Página de download não encontrada para: " + codeName);
  }
}



// Abre conversa WhatsApp
function contactWhatsApp(codeName, price) {
  const url = `https://wa.me/5500000000000?text=Olá! Tenho interesse no código "${codeName}" por R$ ${price}`;
  window.open(url, "_blank");
}

// Abre/fecha menu de filtros
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuToggle = document.querySelector('.menu-toggle'); 

    sideMenu.classList.toggle('open');
    menuOverlay.classList.toggle('show');

    // Adicione a lógica para ocultar/mostrar o menu-toggle
    if (sideMenu.classList.contains('open')) {
        menuToggle.style.display = 'none'; 
    } else {
        menuToggle.style.display = 'block'; 
    }
}

// Função de filtragem principal
function applyFilter(tagToFilter) {
  document.querySelectorAll(".tag-button").forEach((b) => b.classList.remove("active"));

  const correspondingMenuButton = document.querySelector(`.side-menu .tag-button[data-tag="${tagToFilter}"]`);
  if (correspondingMenuButton) {
    correspondingMenuButton.classList.add("active");
  } else if (tagToFilter === "all") {
    document.querySelector('.side-menu .tag-button[data-tag="all"]').classList.add("active");
  }


  document.querySelectorAll(".code-card").forEach((card, index) => {
    const tags = Array.from(card.querySelectorAll(".tag")).map((el) => el.dataset.tag);
    const shouldShow = tagToFilter === "all" || tags.includes(tagToFilter);

    card.classList.remove("animating");

    if (shouldShow) {
      card.classList.remove("hidden");
      setTimeout(() => {
        card.classList.add("animating");
      }, index * 100);
    } else {
      card.classList.remove("animating");
      card.classList.add("hidden");
    }
  });

  toggleMenu(); 
}


// Filtra por tag com animação (Botoes do menu)
document.querySelectorAll(".side-menu .tag-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;
    applyFilter(tag);
  });
});

// Adiciona evento de clique às tags dentro dos cards
document.querySelectorAll(".code-card .tag").forEach((tagSpan) => {
    tagSpan.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede que o clique no card seja acionado
        const tag = tagSpan.dataset.tag;
        applyFilter(tag);
    });
});


// Lazy load dos iframes
document.addEventListener("DOMContentLoaded", () => {
  const iframes = document.querySelectorAll("iframe[data-src]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const iframe = entry.target;
      if (entry.isIntersecting && !iframe.src) {
        iframe.src = iframe.dataset.src;
      } else if (!entry.isIntersecting) {
        iframe.removeAttribute("src");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "200px",
  });

  iframes.forEach((iframe) => observer.observe(iframe));
});

// Animação da borda deslizante + troca de estilos (Cards <-> Screen)
document.addEventListener("DOMContentLoaded", () => {
  const cardsBtn = document.getElementById('cardsViewBtn');
  const screenBtn = document.getElementById('screenViewBtn');
  const slider = document.querySelector('.slider-indicator');
  const codesSection = document.querySelector('.codes');
  let screenStylesheet = null;

  function updateSliderPosition(target) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');

    const index = target === screenBtn ? 1 : 0;
    slider.style.transform = `translateX(${index * 100}%)`;
  }

  // Verificar se o screenBtn existe antes de adicionar o event listener
  if (cardsBtn) {
    cardsBtn.addEventListener('click', () => {
      updateSliderPosition(cardsBtn);
      if (screenStylesheet) {
        screenStylesheet.remove();
        screenStylesheet = null;
      }
      codesSection.classList.remove('screen-mode');
    });
  }

  // Verificar se o screenBtn existe antes de adicionar o event listener
  if (screenBtn) {
    screenBtn.addEventListener('click', () => {
      updateSliderPosition(screenBtn);
      if (!screenStylesheet) {
        screenStylesheet = document.createElement('link');
        screenStylesheet.rel = 'stylesheet';
        screenStylesheet.href = 'styles/screen.css';
        document.head.appendChild(screenStylesheet);
      }
      codesSection.classList.add('screen-mode');
    });
  }
});


// Reduz o header ao rolar
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 60) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
});

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 50) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");

  if (currentScroll > lastScroll && sideMenu.classList.contains("open")) {
    // Fecha o menu como se o usuário tivesse clicado
    sideMenu.classList.remove("open");
    overlay.classList.remove("show");
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

// Função para lidar com o scroll e o menu-toggle
function handleScrollAndMenuToggle() {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.getElementById('sideMenu'); 

    // Lógica para o header encolher (que você já deve ter)
    if (window.scrollY > 50) { 
        header.classList.add('shrink');
        // Se o menu estiver fechado E o header encolheu, o menu-toggle deve aparecer
        if (!sideMenu.classList.contains('open')) {
            menuToggle.style.display = 'block';
            menuToggle.style.opacity = '1'; 
        }
    } else {
        header.classList.remove('shrink');
        // Se o menu estiver fechado E a página no topo, o menu-toggle deve aparecer
        if (!sideMenu.classList.contains('open')) {
            menuToggle.style.display = 'block';
            menuToggle.style.opacity = '1'; 
        }
    }

    // Se o menu lateral estiver aberto, o menu-toggle deve sumir
    if (sideMenu.classList.contains('open')) {
        menuToggle.style.display = 'none';
        menuToggle.style.opacity = '0'; 
    }
}

// Modifique sua função toggleMenu para apenas abrir/fechar o menu e overlay
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuToggle = document.querySelector('.menu-toggle');

    sideMenu.classList.toggle('open');
    menuOverlay.classList.toggle('show');

    // Ao abrir/fechar o menu, sempre chame handleScrollAndMenuToggle
    // para reajustar a visibilidade do botão de filtro
    handleScrollAndMenuToggle(); 
}

// Adicione este ouvinte de evento para chamar a função de scroll
window.addEventListener('scroll', handleScrollAndMenuToggle);

// Chame a função uma vez ao carregar a página para definir o estado inicial
document.addEventListener('DOMContentLoaded', handleScrollAndMenuToggle);

document.querySelectorAll(".whatsapp-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Detecta se está no navegador do TikTok
    const ua = navigator.userAgent.toLowerCase();
    const isTikTok = ua.includes("tiktok");

    if (isTikTok) {
      // Redireciona para página de aviso
      window.location.href = "tiktok-warning.html";
    } else {
      // Abre WhatsApp normalmente
      const link = this.getAttribute("href");
      window.open(link, "_blank");
    }
  });
});
