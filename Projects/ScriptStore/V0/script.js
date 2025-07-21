// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
    }
  })
}, observerOptions)

// Observe all animated elements
document.querySelectorAll(".benefit-card, .code-card").forEach((el) => {
  el.style.animationPlayState = "paused"
  observer.observe(el)
})

// Download function for free codes
function downloadCode(codeName, codeUrl) {
  // Show loading state
  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...'
  button.disabled = true

  // Simulate download preparation
  setTimeout(() => {
    // Create a temporary link to trigger download
    const link = document.createElement("a")
    link.href = codeUrl
    link.download = `${codeName.replace(/\s+/g, "_")}_Code.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show modal with instructions
    showDownloadModal()

    // Reset button
    button.innerHTML = originalText
    button.disabled = false

    // Track download event (you can integrate with analytics)
    trackEvent("download", {
      code_name: codeName,
      code_url: codeUrl,
    })
  }, 1500)
}

// WhatsApp contact function for premium codes
function contactWhatsApp(codeName, price) {
  const phoneNumber = "5511999999999" // Replace with actual WhatsApp number
  const message = encodeURIComponent(
    `Olá! Tenho interesse no código "${codeName}" no valor de R$ ${price}. Gostaria de mais informações sobre a compra e como receber o código após o pagamento.`,
  )

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  // Track WhatsApp contact event
  trackEvent("whatsapp_contact", {
    code_name: codeName,
    price: price,
  })

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank")
}

// Show download modal
function showDownloadModal() {
  const modal = document.getElementById("downloadModal")
  modal.style.display = "block"

  // Add fade-in animation
  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)
}

// Close modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("downloadModal")
  const closeBtn = document.querySelector(".close")

  closeBtn.addEventListener("click", () => {
    closeModal()
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  function closeModal() {
    modal.style.opacity = "0"
    setTimeout(() => {
      modal.style.display = "none"
    }, 300)
  }
})

// Event tracking function (integrate with your analytics)
function trackEvent(eventName, eventData) {
  // Example: Google Analytics 4
  const gtag = window.gtag // Declare gtag variable
  if (gtag) {
    gtag("event", eventName, eventData)
  }

  // Example: Facebook Pixel
  const fbq = window.fbq // Declare fbq variable
  if (fbq) {
    fbq("track", eventName, eventData)
  }

  // Console log for development
  console.log("Event tracked:", eventName, eventData)
}

// Lazy loading for iframes
const iframeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const iframe = entry.target
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src
        iframe.removeAttribute("data-src")
        iframeObserver.unobserve(iframe)
      }
    }
  })
})

// Apply lazy loading to iframes
document.querySelectorAll(".code-iframe").forEach((iframe) => {
  iframe.dataset.src = iframe.src
  iframe.src = ""
  iframeObserver.observe(iframe)
})

// Mobile menu toggle (if you want to add mobile menu later)
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  navMenu.classList.toggle("active")
}

// Form validation and enhancement
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to cards
  document.querySelectorAll(".code-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
    })
  })

  // Add click tracking to all buttons
  document.querySelectorAll("button, .cta-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonText = e.target.textContent.trim()
      trackEvent("button_click", {
        button_text: buttonText,
        page_location: window.location.href,
      })
    })
  })
})

// Performance optimization: Preload critical resources
function preloadCriticalResources() {
  const criticalUrls = ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"]

  criticalUrls.forEach((url) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = url
    link.as = "style"
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
preloadCriticalResources()

// Error handling for iframe loading
document.querySelectorAll(".code-iframe").forEach((iframe) => {
  iframe.addEventListener("error", () => {
    const container = iframe.parentElement
    container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; background: #f3f4f6; color: #6b7280;">
                <div style="text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Preview temporariamente indisponível</p>
                </div>
            </div>
        `
  })
})

// Add loading states to buttons
function addLoadingState(button, originalText, loadingText) {
  button.innerHTML = loadingText
  button.disabled = true
  button.classList.add("loading")

  return () => {
    button.innerHTML = originalText
    button.disabled = false
    button.classList.remove("loading")
  }
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("downloadModal")
    if (modal.style.display === "block") {
      modal.style.display = "none"
    }
  }
})

// Initialize tooltips (if needed)
function initTooltips() {
  document.querySelectorAll("[data-tooltip]").forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = e.target.dataset.tooltip
      document.body.appendChild(tooltip)

      const rect = e.target.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px"
    })

    element.addEventListener("mouseleave", () => {
      const tooltip = document.querySelector(".tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    })
  })
}

// Initialize all features when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTooltips()

  // Add entrance animations with delay
  const animatedElements = document.querySelectorAll(".benefit-card, .code-card")
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`
  })
})
