function showDownloadModal() {
  const modal = document.getElementById("downloadModal")
  modal.style.display = "block"
  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)
}

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
