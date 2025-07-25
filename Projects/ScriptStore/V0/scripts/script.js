/**
 * ===================================
 * SCRIPT PARA PÁGINA DE CÓDIGOS PRONTOS
 * ===================================
 *
 * Funcionalidades:
 * - Toggle de cards expandíveis
 * - Download de códigos
 * - Contato via WhatsApp
 * - Animações e interações
 *
 * Autor: Códigos Prontos
 * Data: 2024
 */

// ===================================
// CONFIGURAÇÕES GLOBAIS
// ===================================

const CONFIG = {
  whatsappNumber: "5500000000000", // Substitua pelo número real
  downloadDelay: 1500, // Delay para simular preparação do download
  animationDuration: 400, // Duração das animações em ms
}

// Declaração da variável gtag para evitar erros de lint
const gtag = window.gtag || (() => {})

// ===================================
// FUNÇÃO PRINCIPAL - TOGGLE DE CARDS
// ===================================

/**
 * Alterna entre estado expandido e contraído do card
 * @param {HTMLElement} button - Botão que foi clicado
 */
function toggleCard(button) {
  try {
    const card = button.closest(".code-card")
    const isExpanded = card.classList.contains("expanded")

    // Adiciona classe de transição
    card.classList.add("transitioning")

    // Toggle da classe expanded
    card.classList.toggle("expanded")

    // Atualiza texto do botão com animação
    updateButtonText(button, !isExpanded)

    // Scroll suave para o card se estiver expandindo
    if (!isExpanded) {
      setTimeout(() => {
        scrollToCard(card)
      }, CONFIG.animationDuration / 2)
    }

    // Remove classe de transição após animação
    setTimeout(() => {
      card.classList.remove("transitioning")
    }, CONFIG.animationDuration)

    // Analytics (opcional)
    trackCardToggle(card, !isExpanded)
  } catch (error) {
    console.error("Erro ao alternar card:", error)
    showNotification("Erro ao expandir card", "error")
  }
}

/**
 * Atualiza o texto do botão com animação suave
 * @param {HTMLElement} button - Botão a ser atualizado
 * @param {boolean} isExpanded - Estado expandido
 */
function updateButtonText(button, isExpanded) {
  button.style.opacity = "0.5"

  setTimeout(() => {
    button.textContent = isExpanded ? "Ver menos" : "Ver mais"
    button.style.opacity = "1"
  }, 150)
}

/**
 * Faz scroll suave até o card
 * @param {HTMLElement} card - Card para fazer scroll
 */
function scrollToCard(card) {
  const cardRect = card.getBoundingClientRect()
  const offset = window.pageYOffset + cardRect.top - 100

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  })
}

// ===================================
// FUNÇÃO DE DOWNLOAD
// ===================================

/**
 * Simula o download de um código
 * @param {string} codeName - Nome do código
 * @param {string} codeUrl - URL do código
 */
function downloadCode(codeName, codeUrl) {
  try {
    const button = event.target.closest(".download-btn")
    const originalContent = button.innerHTML

    // Validação dos parâmetros
    if (!codeName || !codeUrl) {
      throw new Error("Parâmetros inválidos para download")
    }

    // Estado de loading
    setButtonLoading(button, true)

    // Simula preparação do download
    setTimeout(() => {
      try {
        // Cria link temporário para download
        const downloadLink = createDownloadLink(codeName, codeUrl)

        // Executa o download
        executeDownload(downloadLink)

        // Restaura botão
        setButtonLoading(button, false, originalContent)

        // Feedback de sucesso
        showNotification(`Download de "${codeName}" iniciado!`, "success")

        // Analytics
        trackDownload(codeName, codeUrl)
      } catch (downloadError) {
        console.error("Erro no download:", downloadError)
        setButtonLoading(button, false, originalContent)
        showNotification("Erro ao baixar código", "error")
      }
    }, CONFIG.downloadDelay)
  } catch (error) {
    console.error("Erro geral no download:", error)
    showNotification("Erro inesperado no download", "error")
  }
}

/**
 * Define estado de loading do botão
 * @param {HTMLElement} button - Botão
 * @param {boolean} isLoading - Estado de loading
 * @param {string} originalContent - Conteúdo original (opcional)
 */
function setButtonLoading(button, isLoading, originalContent = null) {
  if (isLoading) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...'
    button.disabled = true
    button.style.opacity = "0.8"
  } else {
    button.innerHTML = originalContent || '<i class="fas fa-download"></i> Baixar Código'
    button.disabled = false
    button.style.opacity = "1"
  }
}

/**
 * Cria link de download
 * @param {string} codeName - Nome do código
 * @param {string} codeUrl - URL do código
 * @returns {HTMLElement} Link de download
 */
function createDownloadLink(codeName, codeUrl) {
  const link = document.createElement("a")
  link.href = codeUrl
  link.download = `${sanitizeFileName(codeName)}_Code.zip`
  link.style.display = "none"

  return link
}

/**
 * Executa o download
 * @param {HTMLElement} downloadLink - Link de download
 */
function executeDownload(downloadLink) {
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

/**
 * Sanitiza nome do arquivo
 * @param {string} fileName - Nome do arquivo
 * @returns {string} Nome sanitizado
 */
function sanitizeFileName(fileName) {
  return fileName
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "_") // Substitui espaços por underscore
    .toLowerCase()
}

// ===================================
// FUNÇÃO DE CONTATO WHATSAPP
// ===================================

/**
 * Abre conversa no WhatsApp com mensagem pré-definida
 * @param {string} codeName - Nome do código
 * @param {string} price - Preço do código
 */
function contactWhatsApp(codeName, price) {
  try {
    // Validação dos parâmetros
    if (!codeName || !price) {
      throw new Error("Parâmetros inválidos para WhatsApp")
    }

    // Cria mensagem personalizada
    const message = createWhatsAppMessage(codeName, price)

    // Cria URL do WhatsApp
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`

    // Abre WhatsApp em nova aba
    const newWindow = window.open(whatsappUrl, "_blank")

    // Verifica se a janela foi aberta (bloqueador de popup)
    if (!newWindow) {
      throw new Error("Popup bloqueado")
    }

    // Feedback visual
    showNotification("Redirecionando para WhatsApp...", "info")

    // Analytics
    trackWhatsAppContact(codeName, price)
  } catch (error) {
    console.error("Erro ao abrir WhatsApp:", error)

    if (error.message === "Popup bloqueado") {
      showNotification("Por favor, permita popups para abrir o WhatsApp", "warning")
    } else {
      showNotification("Erro ao abrir WhatsApp", "error")
    }
  }
}

/**
 * Cria mensagem personalizada para WhatsApp
 * @param {string} codeName - Nome do código
 * @param {string} price - Preço do código
 * @returns {string} Mensagem formatada
 */
function createWhatsAppMessage(codeName, price) {
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const currentTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return `🚀 *Interesse em Código Premium*

📋 *Código:* ${codeName}
💰 *Valor:* R$ ${price}
📅 *Data:* ${currentDate}
🕐 *Horário:* ${currentTime}

Olá! Tenho interesse no código "${codeName}" por R$ ${price}.

Poderia me fornecer mais informações sobre:
• Arquivos inclusos
• Documentação
• Suporte técnico
• Forma de pagamento

Aguardo retorno! 😊`
}

// ===================================
// SISTEMA DE NOTIFICAÇÕES
// ===================================

/**
 * Exibe notificação para o usuário
 * @param {string} message - Mensagem da notificação
 * @param {string} type - Tipo da notificação (success, error, warning, info)
 */
function showNotification(message, type = "info") {
  // Remove notificação existente
  removeExistingNotification()

  // Cria nova notificação
  const notification = createNotificationElement(message, type)

  // Adiciona ao DOM
  document.body.appendChild(notification)

  // Animação de entrada
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Remove automaticamente após 4 segundos
  setTimeout(() => {
    removeNotification(notification)
  }, 4000)
}

/**
 * Cria elemento de notificação
 * @param {string} message - Mensagem
 * @param {string} type - Tipo
 * @returns {HTMLElement} Elemento da notificação
 */
function createNotificationElement(message, type) {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const icon = getNotificationIcon(type)

  notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="removeNotification(this.parentElement)">
            <i class="fas fa-times"></i>
        </button>
    `

  // Adiciona estilos inline (caso o CSS não esteja carregado)
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "10000",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  })

  // Cores por tipo
  const colors = {
    success: "#27ae60",
    error: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
  }

  notification.style.backgroundColor = colors[type] || colors.info

  return notification
}

/**
 * Retorna ícone baseado no tipo de notificação
 * @param {string} type - Tipo da notificação
 * @returns {string} Classe do ícone
 */
function getNotificationIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  return icons[type] || icons.info
}

/**
 * Remove notificação existente
 */
function removeExistingNotification() {
  const existing = document.querySelector(".notification")
  if (existing) {
    removeNotification(existing)
  }
}

/**
 * Remove notificação específica
 * @param {HTMLElement} notification - Elemento da notificação
 */
function removeNotification(notification) {
  if (notification && notification.parentElement) {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      if (notification.parentElement) {
        notification.parentElement.removeChild(notification)
      }
    }, 300)
  }
}

// ===================================
// ANALYTICS E TRACKING (OPCIONAL)
// ===================================

/**
 * Rastreia toggle de card
 * @param {HTMLElement} card - Card
 * @param {boolean} isExpanded - Estado expandido
 */
function trackCardToggle(card, isExpanded) {
  try {
    const cardName = card.querySelector(".code-name")?.textContent || "Unknown"
    const action = isExpanded ? "expand" : "collapse"

    // Google Analytics (se disponível)
    if (typeof gtag !== "undefined") {
      gtag("event", "card_toggle", {
        event_category: "engagement",
        event_label: cardName,
        custom_parameter: action,
      })
    }

    // Console log para debug
    console.log(`Card ${action}: ${cardName}`)
  } catch (error) {
    console.warn("Erro no tracking de card:", error)
  }
}

/**
 * Rastreia download
 * @param {string} codeName - Nome do código
 * @param {string} codeUrl - URL do código
 */
function trackDownload(codeName, codeUrl) {
  try {
    // Google Analytics (se disponível)
    if (typeof gtag !== "undefined") {
      gtag("event", "download", {
        event_category: "engagement",
        event_label: codeName,
        value: 1,
      })
    }

    // Console log para debug
    console.log(`Download iniciado: ${codeName}`)
  } catch (error) {
    console.warn("Erro no tracking de download:", error)
  }
}

/**
 * Rastreia contato WhatsApp
 * @param {string} codeName - Nome do código
 * @param {string} price - Preço
 */
function trackWhatsAppContact(codeName, price) {
  try {
    // Google Analytics (se disponível)
    if (typeof gtag !== "undefined") {
      gtag("event", "whatsapp_contact", {
        event_category: "conversion",
        event_label: codeName,
        value: Number.parseFloat(price.replace(",", ".")),
      })
    }

    // Console log para debug
    console.log(`Contato WhatsApp: ${codeName} - R$ ${price}`)
  } catch (error) {
    console.warn("Erro no tracking de WhatsApp:", error)
  }
}

// ===================================
// INICIALIZAÇÃO E EVENT LISTENERS
// ===================================

/**
 * Inicializa a aplicação quando o DOM estiver carregado
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Página de Códigos Prontos carregada!")

  // Inicializa componentes
  initializeComponents()

  // Adiciona event listeners globais
  addGlobalEventListeners()

  // Verifica se há parâmetros na URL
  checkUrlParameters()
})

/**
 * Inicializa componentes da página
 */
function initializeComponents() {
  // Adiciona animação de entrada aos cards
  const cards = document.querySelectorAll(".code-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Lazy loading para iframes
  setupLazyLoading()

  console.log(`✅ ${cards.length} cards inicializados`)
}

/**
 * Adiciona event listeners globais
 */
function addGlobalEventListeners() {
  // Listener para tecla ESC (fechar cards expandidos)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllExpandedCards()
    }
  })

  // Listener para cliques fora dos cards (opcional)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("codes")) {
      // Clicou no fundo, pode fechar cards se desejar
    }
  })

  console.log("✅ Event listeners globais adicionados")
}

/**
 * Configura lazy loading para iframes
 */
function setupLazyLoading() {
  const iframes = document.querySelectorAll('.code-iframe[loading="lazy"]')

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target
          // Iframe já tem src, apenas observamos para analytics
          observer.unobserve(iframe)
        }
      })
    })

    iframes.forEach((iframe) => observer.observe(iframe))
  }
}

/**
 * Verifica parâmetros na URL
 */
function checkUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search)
  const cardId = urlParams.get("card")

  if (cardId) {
    // Expande card específico se especificado na URL
    const targetCard = document.querySelector(`[data-card-id="${cardId}"]`)
    if (targetCard) {
      const toggleButton = targetCard.querySelector(".toggle-btn")
      if (toggleButton) {
        setTimeout(() => {
          toggleCard(toggleButton)
          scrollToCard(targetCard)
        }, 500)
      }
    }
  }
}

/**
 * Fecha todos os cards expandidos
 */
function closeAllExpandedCards() {
  const expandedCards = document.querySelectorAll(".code-card.expanded")
  expandedCards.forEach((card) => {
    const toggleButton = card.querySelector(".toggle-btn")
    if (toggleButton) {
      toggleCard(toggleButton)
    }
  })
}

// ===================================
// UTILITÁRIOS ADICIONAIS
// ===================================

/**
 * Debounce function para otimizar performance
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função com debounce
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function para otimizar performance
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função com throttle
 */
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===================================
// TRATAMENTO DE ERROS GLOBAIS
// ===================================

window.addEventListener("error", (e) => {
  console.error("Erro global capturado:", e.error)
  // Aqui você pode enviar erros para um serviço de monitoramento
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejeitada não tratada:", e.reason)
  // Aqui você pode enviar erros para um serviço de monitoramento
})

// ===================================
// EXPORTAÇÕES (SE NECESSÁRIO)
// ===================================

// Se estiver usando módulos ES6, descomente as linhas abaixo:
// export { toggleCard, downloadCode, contactWhatsApp, showNotification };

console.log("📄 Script carregado com sucesso!")
