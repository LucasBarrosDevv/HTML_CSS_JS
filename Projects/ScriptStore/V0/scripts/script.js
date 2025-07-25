// Função para expandir/recolher um card
function toggleCard(button) {
  const card = button.closest(".code-card");
  card.classList.toggle("expanded");
  button.textContent = card.classList.contains("expanded")
    ? "Ver menos"
    : "Ver mais";
}

// Simula o download de um código com botão de carregamento
function downloadCode(button, codeName, codeUrl) {
  const originalText = button.innerHTML;

  // Animação de carregamento
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
  button.disabled = true;

  setTimeout(() => {
    const link = document.createElement("a");
    link.href = codeUrl;
    link.download = `${codeName.replace(/\s+/g, "_")}_Code.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Restaura botão
    button.innerHTML = originalText;
    button.disabled = false;
  }, 1500);
}

// Abre conversa no WhatsApp com mensagem personalizada
function contactWhatsApp(codeName, price) {
  const url = `https://wa.me/5500000000000?text=Olá! Tenho interesse no código "${codeName}" por R$ ${price}`;
  window.open(url, "_blank");
}

// Abre/fecha o menu lateral de tags
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");
  const isOpen = menu.classList.contains("open");

  if (isOpen) {
    menu.classList.remove("open");
    overlay.classList.remove("show");
  } else {
    menu.classList.add("open");
    overlay.classList.add("show");
  }
}

// Atualiza os cards com animação suave ao filtrar por tag
document.querySelectorAll(".tag-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Marca o botão como ativo
    document.querySelectorAll(".tag-button").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    const tag = btn.dataset.tag;

    document.querySelectorAll(".code-card").forEach((card, index) => {
      const tags = Array.from(card.querySelectorAll(".tag")).map(
        (el) => el.dataset.tag
      );

      const shouldShow = tag === "all" || tags.includes(tag);

      // Remove classes para resetar animação
      card.classList.remove("animating");

      if (shouldShow) {
        // Remove hidden para poder animar
        card.classList.remove("hidden");

        // Adiciona a animação com pequeno delay para criar efeito em cascata
        setTimeout(() => {
          card.classList.add("animating");
        }, index * 100);
      } else {
        // Remove animação e aplica classe hidden
        card.classList.remove("animating");
        card.classList.add("hidden");
      }
    });

    toggleMenu(); // Fecha o menu após filtrar
  });
});
