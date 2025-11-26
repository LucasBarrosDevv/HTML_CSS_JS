// scripts/renderCards.js

function renderCards() {
  const container = document.querySelector(".codes-grid");
  container.innerHTML = "";

  cardsData.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = `code-card ${card.tipo}`;

    cardEl.innerHTML = `
      <div class="code-preview-container">
        <iframe data-src="${card.preview}" class="code-iframe" loading="lazy"></iframe>
        <div class="preview-overlay">
          <i class="fas fa-eye"></i>
          <span>Preview Interativo</span>
        </div>
      </div>
      <div class="code-info">
        <h4 class="code-name">${card.nome}</h4>
        <div class="code-tags">
          ${card.tags.map(tag => `
            <span class="tag" style="background:${tag.cor};color:${tag.texto}">${tag.nome}</span>
          `).join("")}
        </div>
        <div class="code-price">
          ${typeof card.preco === "string"
            ? card.preco
            : `
              ${card.preco.de ? `<span style="text-decoration: line-through; color: #888; font-size: 0.9em;">${card.preco.de}</span>` : ""}
              <span style="color:#00cc00;font-weight:bold;">${card.preco.por}</span>
            `
          }
        </div>
        <div class="code-extra-info">
          <p class="code-description">${card.descricao}</p>
          <div class="botoes">
            ${card.download
              ? `<button class="download-btn" style="color:#000;" onclick="downloadCode('${card.download}')"><i class="fas fa-download"></i> Baixar Código</button>`
              : ""}
            ${card.whatsapp
              ? `<button class="whatsapp-btn" onclick="window.open('https://wa.me/5599991299667?text=${encodeURIComponent(card.whatsapp)}', '_blank')"><i class="fab fa-whatsapp"></i> Pedir no WhatsApp</button>`
              : ""}
            ${card.tiktok
              ? `<button class="tiktok-btn" onclick="window.open('${card.tiktok}', '_blank')"><i class="fab fa-tiktok"></i> Ver no TikTok</button>`
              : ""}
          </div>
        </div>
        <button class="toggle-btn" onclick="toggleCard(this)">Ver mais</button>
      </div>
    `;
    container.appendChild(cardEl);
  });
}

document.addEventListener("DOMContentLoaded", renderCards);
