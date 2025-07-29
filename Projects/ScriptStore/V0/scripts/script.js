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
    "Fire Dynamic": "download-fire.html",
    "Particulas": "download-particles.html",
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
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");
  menu.classList.toggle("open");
  overlay.classList.toggle("show");
}

// Filtra por tag com animação
document.querySelectorAll(".tag-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tag-button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tag = btn.dataset.tag;

    document.querySelectorAll(".code-card").forEach((card, index) => {
      const tags = Array.from(card.querySelectorAll(".tag")).map((el) => el.dataset.tag);
      const shouldShow = tag === "all" || tags.includes(tag);

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

  cardsBtn.addEventListener('click', () => {
    updateSliderPosition(cardsBtn);
    if (screenStylesheet) {
      screenStylesheet.remove();
      screenStylesheet = null;
    }
    codesSection.classList.remove('screen-mode');
  });

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
