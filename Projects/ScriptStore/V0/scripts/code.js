function downloadCode(codeName, codeUrl) {
  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...'
  button.disabled = true

  setTimeout(() => {
    const link = document.createElement("a")
    link.href = codeUrl
    link.download = `${codeName.replace(/\s+/g, "_")}_Code.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showDownloadModal()
    button.innerHTML = originalText
    button.disabled = false

    trackEvent("download", {
      code_name: codeName,
      code_url: codeUrl,
    })
  }, 1500)
}

function contactWhatsApp(codeName, price) {
  const phoneNumber = "5511999999999"
  const message = encodeURIComponent(`Olá! Tenho interesse no código "${codeName}" no valor de R$ ${price}. Gostaria de mais informações sobre a compra e como receber o código após o pagamento.`)

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  trackEvent("whatsapp_contact", {
    code_name: codeName,
    price: price,
  })

  window.open(whatsappUrl, "_blank")
}

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
