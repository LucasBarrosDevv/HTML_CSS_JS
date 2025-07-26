// Expande/recolhe card
function toggleCard(button) {
  const card = button.closest(".code-card");
  card.classList.toggle("expanded");
  button.textContent = card.classList.contains("expanded") ? "Ver menos" : "Ver mais";
}

// Simula download com animação
function downloadCode(codeName, codeUrl) {
  const button = event.target;
  const originalText = button.innerHTML;

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
  button.disabled = true;

  setTimeout(() => {
    const link = document.createElement("a");
    link.href = codeUrl;
    link.download = `${codeName.replace(/\s+/g, "_")}_Code.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    button.innerHTML = originalText;
    button.disabled = false;
  }, 1500);
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
