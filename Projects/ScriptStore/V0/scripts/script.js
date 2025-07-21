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

document.querySelectorAll(".benefit-card, .code-card").forEach((el) => {
  el.style.animationPlayState = "paused"
  observer.observe(el)
})

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

document.querySelectorAll(".code-iframe").forEach((iframe) => {
  iframe.dataset.src = iframe.src
  iframe.src = ""
  iframeObserver.observe(iframe)
})

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

function trackEvent(eventName, eventData) {
  const gtag = window.gtag
  if (gtag) gtag("event", eventName, eventData)

  const fbq = window.fbq
  if (fbq) fbq("track", eventName, eventData)

  console.log("Event tracked:", eventName, eventData)
}
