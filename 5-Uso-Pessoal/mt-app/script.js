const pickupGrid = document.getElementById("pickup-grid")
const kmGrid = document.getElementById("km-grid")
const valorGrid = document.getElementById("valor-grid")
const pickupSection = document.getElementById("pickup-section")
const kmSection = document.getElementById("km-section")
const valorSection = document.getElementById("valor-section")
const calculoSection = document.getElementById("calculo-section")
const historicoSection = document.getElementById("historico-section")
const historicoLista = document.getElementById("historico-lista")
const configSection = document.getElementById("config-section")

const pickupOpcoes = [0.1, 0.2, 0.3, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]
const pickupLabels = {
  0.1: "100m",
  0.2: "200m",
  0.3: "300m",
  0.5: "500m",
  1.0: "1.0 km",
  1.5: "1.5 km",
  2.0: "2.0 km",
  2.5: "2.5 km",
  3.0: "3.0 km",
  3.5: "3.5 km",
  4.0: "4.0 km",
}

const kmOpcoes = [0.1, 0.2, 0.3, 0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 12.0, 15.0, 16.0, 18.0, 20.0]

const kmValores = {
  0.1: [3, 4, 5, 6, 7, 8],
  0.2: [3, 4, 5, 6, 7, 8],
  0.3: [4, 5, 6, 7, 8, 9],
  0.5: [5, 6, 7, 8, 9, 10],
  1: [5, 6, 7, 8, 9, 10],
  2: [5, 7, 8, 10, 11, 12],
  3: [5, 8, 10, 12, 14, 15],
  4: [7, 9, 11, 13, 14, 15],
  5: [8, 10, 12, 14, 15, 18],
  6: [10, 12, 15, 18, 20, 25],
  7: [12, 15, 18, 20, 30, 35],
  8: [12, 16, 20, 25, 30, 35],
  9: [12, 18, 22, 26, 30, 36],
  10: [15, 18, 22, 26, 30, 38],
  12: [15, 20, 25, 30, 35, 40],
  15: [20, 25, 30, 35, 40, 45],
  16: [20, 25, 30, 35, 45, 50],
  18: [22, 28, 33, 38, 48, 55],
  20: [25, 30, 35, 40, 50, 60],
}

const historico = JSON.parse(localStorage.getItem("historicocorridas")) || []
let pickupSelecionado = null
let kmSelecionado = null

let editingIndex = null
let editingItem = null
let editSteps = []
let currentEditStep = 0

let pickerType = null
let pickerValues = []
const pickerCallback = null
let longPressTimer = null
let isPickerDragging = false
let pickerDragStartY = 0
let pickerScrollStartTop = 0

function salvarHistorico() {
  localStorage.setItem("historicocorridas", JSON.stringify(historico))
}

function salvarConfig() {
  localStorage.setItem("corridasConfig", JSON.stringify(config))
}

function renderPickup() {
  pickupGrid.innerHTML = ""
  pickupOpcoes.forEach((km, index) => {
    const el = document.createElement("div")
    el.className = "bubble pickup-bubble"
    el.innerHTML = `
            <div>${pickupLabels[km] || km.toFixed(1) + " km"}</div>
            <div class="bubble-label">busca</div>
        `

    if (index >= 6) el.classList.add("hidden")

    el.addEventListener("click", () => selecionarPickup(km))
    el.addEventListener("touchstart", (e) => {
      handleLongPress(e, km, "pickup")
    })
    el.addEventListener("mousedown", (e) => handleLongPress(e, km, "pickup"))
    el.addEventListener("touchend", cancelLongPress)
    el.addEventListener("mouseup", cancelLongPress)
    el.addEventListener("mouseleave", cancelLongPress)

    pickupGrid.appendChild(el)
  })
}

function renderKm() {
  kmGrid.innerHTML = ""
  kmOpcoes.forEach((km, index) => {
    const el = document.createElement("div")
    el.className = "bubble"

    const displayText = km < 1 ? `${(km * 1000).toFixed(0)}m` : `${km.toFixed(1)} km`

    el.innerHTML = `
            <div>${displayText}</div>
            <div class="bubble-label">corrida</div>
        `

    if (index >= 6) el.classList.add("hidden")

    el.addEventListener("click", () => selecionarKm(km))
    el.addEventListener("touchstart", (e) => {
      handleLongPress(e, km, "trip")
    })
    el.addEventListener("mousedown", (e) => handleLongPress(e, km, "trip"))
    el.addEventListener("touchend", cancelLongPress)
    el.addEventListener("mouseup", cancelLongPress)
    el.addEventListener("mouseleave", cancelLongPress)

    kmGrid.appendChild(el)
  })
}

function handleLongPress(e, value, type) {
  longPressTimer = setTimeout(() => {
    showPicker(value, type)
  }, 500)
}

function cancelLongPress() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

function showPicker(initialValue, type) {
  pickerType = type
  const overlay = document.getElementById("picker-overlay")
  const wheel = document.getElementById("picker-wheel")
  const title = document.getElementById("picker-title")

  if (type === "pickup") {
    title.textContent = "🚗 Distância de Busca"
    pickerValues = []
    for (let i = 1; i <= 100; i++) {
      pickerValues.push(i * 0.1)
    }
  } else if (type === "trip") {
    title.textContent = "📍 Distância da Corrida"
    pickerValues = []
    for (let i = 1; i <= 500; i++) {
      pickerValues.push(i * 0.1)
    }
  }

  wheel.innerHTML = '<div class="picker-highlight"></div>'

  for (let i = 0; i < 4; i++) {
    const padding = document.createElement("div")
    padding.className = "picker-item"
    wheel.appendChild(padding)
  }

  pickerValues.forEach((val, idx) => {
    const item = document.createElement("div")
    item.className = "picker-item"
    if (val < 1) {
      item.textContent = `${(val * 1000).toFixed(0)}m`
    } else {
      item.textContent = val.toFixed(1) + " km"
    }
    item.dataset.value = val
    item.dataset.index = idx
    wheel.appendChild(item)
  })

  for (let i = 0; i < 4; i++) {
    const padding = document.createElement("div")
    padding.className = "picker-item"
    wheel.appendChild(padding)
  }

  overlay.classList.remove("hidden")

  setTimeout(() => {
    const targetIndex = pickerValues.findIndex((v) => v >= initialValue)
    const actualIndex = targetIndex >= 0 ? targetIndex : pickerValues.length - 1
    const itemHeight = 40
    wheel.scrollTop = actualIndex * itemHeight
    updatePickerHighlight()
  }, 50)

  wheel.addEventListener("scroll", updatePickerHighlight)

  setupPickerDrag(wheel)
}

function setupPickerDrag(wheel) {
  const handleDragStart = (e) => {
    isPickerDragging = true
    pickerDragStartY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY
    pickerScrollStartTop = wheel.scrollTop
    wheel.style.scrollBehavior = "auto"
  }

  const handleDragMove = (e) => {
    if (!isPickerDragging) return
    e.preventDefault()

    const currentY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY
    const deltaY = pickerDragStartY - currentY

    // Apply drag with reduced speed for better control
    wheel.scrollTop = pickerScrollStartTop + deltaY * 0.8
  }

  const handleDragEnd = () => {
    if (!isPickerDragging) return
    isPickerDragging = false
    wheel.style.scrollBehavior = "smooth"

    snapToNearestItem(wheel)
  }

  wheel.addEventListener("touchstart", handleDragStart, { passive: true })
  wheel.addEventListener("mousedown", handleDragStart)

  wheel.addEventListener("touchmove", handleDragMove, { passive: false })
  wheel.addEventListener("mousemove", handleDragMove)

  wheel.addEventListener("touchend", handleDragEnd)
  wheel.addEventListener("mouseup", handleDragEnd)
  wheel.addEventListener("mouseleave", handleDragEnd)
}

function snapToNearestItem(wheel) {
  const itemHeight = 40
  const scrollTop = wheel.scrollTop
  const nearestIndex = Math.round(scrollTop / itemHeight)

  wheel.scrollTo({
    top: nearestIndex * itemHeight,
    behavior: "smooth",
  })

  setTimeout(() => updatePickerHighlight(), 100)
}

function updatePickerHighlight() {
  const wheel = document.getElementById("picker-wheel")
  const items = wheel.querySelectorAll(".picker-item[data-value]")
  const wheelRect = wheel.getBoundingClientRect()
  const centerY = wheelRect.top + wheelRect.height / 2

  let closestItem = null
  let closestDistance = Number.POSITIVE_INFINITY

  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect()
    const itemCenterY = itemRect.top + itemRect.height / 2
    const distance = Math.abs(centerY - itemCenterY)

    if (distance < closestDistance) {
      closestDistance = distance
      closestItem = item
    }

    item.classList.remove("active")
  })

  if (closestItem) {
    closestItem.classList.add("active")
  }
}

document.getElementById("picker-close").onclick = () => {
  document.getElementById("picker-overlay").classList.add("hidden")
}

document.getElementById("picker-confirm").onclick = () => {
  const wheel = document.getElementById("picker-wheel")
  const activeItem = wheel.querySelector(".picker-item.active")

  if (activeItem && activeItem.dataset.value) {
    const selectedValue = Number.parseFloat(activeItem.dataset.value)

    if (pickerType === "pickup") {
      if (editingIndex !== null && editSteps.includes("pickup")) {
        editingItem.pickupKm = selectedValue
        proceedToNextEditStep()
      } else {
        selecionarPickup(selectedValue)
      }
    } else if (pickerType === "trip") {
      if (editingIndex !== null && editSteps.includes("trip")) {
        editingItem.tripKm = selectedValue
        proceedToNextEditStep()
      } else {
        selecionarKm(selectedValue)
      }
    }
  }

  document.getElementById("picker-overlay").classList.add("hidden")
}

function selecionarPickup(km) {
  pickupSelecionado = km
  pickupSection.classList.add("hidden")
  kmSection.classList.remove("hidden")
  kmSection.classList.add("fade-in")
}

function selecionarKm(km) {
  kmSelecionado = km
  kmSection.classList.add("hidden")
  valorSection.classList.remove("hidden")
  valorSection.classList.add("fade-in")

  valorGrid.innerHTML = ""
  const valores = kmValores[Math.round(km * 10) / 10] || kmValores[Math.round(km)] || [5, 10, 15, 20, 25, 30]

  valores.forEach((v) => {
    const el = document.createElement("div")
    el.className = "bubble valor-bubble"
    el.innerHTML = `
            <div>R$ ${v}</div>
            <div class="bubble-label">corrida</div>
        `
    el.onclick = () => selecionarValor(v)
    valorGrid.appendChild(el)
  })

  document.getElementById("valor-manual-btn").classList.remove("hidden")
}

document.getElementById("mostrar-mais-pickup").onclick = () => {
  const hiddenBubbles = document.querySelectorAll("#pickup-grid .bubble.hidden")
  const btn = document.getElementById("mostrar-mais-pickup")

  if (hiddenBubbles.length > 0) {
    // Show all hidden bubbles
    hiddenBubbles.forEach((b) => {
      b.classList.remove("hidden")
    })
    btn.textContent = "👆 Mostrar Menos"
    document.getElementById("pickup-manual-box").classList.remove("hidden")
  } else {
    // Hide bubbles after index 5
    document.querySelectorAll("#pickup-grid .bubble").forEach((b, idx) => {
      if (idx >= 6) b.classList.add("hidden")
    })
    btn.textContent = "👇 Mostrar Mais"
    document.getElementById("pickup-manual-box").classList.add("hidden")
  }
}

document.getElementById("pickup-manual-confirm").onclick = () => {
  const pickupCustom = Number.parseFloat(document.getElementById("pickup-manual").value)
  if (pickupCustom > 0) selecionarPickup(pickupCustom)
}

document.getElementById("pickup-manual").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const pickupCustom = Number.parseFloat(e.target.value)
    if (pickupCustom > 0) selecionarPickup(pickupCustom)
  }
})

document.getElementById("mostrar-mais-km").onclick = () => {
  document.querySelectorAll("#km-grid .bubble.hidden").forEach((b) => {
    b.classList.remove("hidden")
  })
  document.getElementById("mostrar-mais-km").classList.add("hidden")
  document.getElementById("km-manual-box").classList.remove("hidden")
}

document.getElementById("km-manual-confirm").onclick = () => {
  const kmCustom = Number.parseFloat(document.getElementById("km-manual").value)
  if (kmCustom > 0) selecionarKm(kmCustom)
}

document.getElementById("km-manual").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const kmCustom = Number.parseFloat(e.target.value)
    if (kmCustom > 0) selecionarKm(kmCustom)
  }
})

function calcularCustos() {
  const totalKmViajado = historico.reduce((acc, item) => acc + item.distanciaTotal, 0)

  const totalTripKm = historico.reduce((acc, item) => acc + (item.tripKm || item.km || 0), 0)

  // Use trip km (calculated km) for fuel calculation
  const realTotalKm = totalTripKm
  const fuelConsumed = config.fuelAvg > 0 && realTotalKm > 0 ? realTotalKm / config.fuelAvg : 0
  const fuelCost = fuelConsumed * config.gasPrice

  const totalAppFee = config.appFee || 0

  return {
    totalKmViajado,
    totalTripKm,
    realTotalKm: config.totalKm || 0,
    fuelConsumed,
    fuelCost,
    totalAppFee,
    totalCost: fuelCost + totalAppFee,
  }
}

function selecionarValor(valor) {
  const calculo = calcularPrecoPorKm(pickupSelecionado, kmSelecionado, valor)

  const item = {
    pickupKm: pickupSelecionado,
    tripKm: kmSelecionado,
    valor: valor,
    precoPorKm: calculo.precoPorKm,
    timestamp: new Date().toLocaleString("pt-BR"),
    distanciaTotal: calculo.distanciaTotal,
  }

  if (editingIndex !== null) {
    historico[editingIndex] = item
    editingIndex = null
    editingItem = null
    editSteps = []
    currentEditStep = 0
  } else {
    historico.unshift(item)
  }

  salvarHistorico()

  showCalculoToast(calculo, valor)

  renderHistorico()
  historicoSection.classList.remove("hidden")
  historicoSection.classList.add("fade-in")

  setTimeout(() => {
    resetarApp()
  }, 5000)
}

function showCalculoToast(calculo, valor) {
  const toast = document.getElementById("calculo-toast")

  const pickupDisplay =
    pickupSelecionado < 1 ? `${(pickupSelecionado * 1000).toFixed(0)}m` : `${pickupSelecionado.toFixed(1)}km`
  const tripDisplay = kmSelecionado < 1 ? `${(kmSelecionado * 1000).toFixed(0)}m` : `${kmSelecionado.toFixed(1)}km`

  document.getElementById("preco-por-km").textContent = `R$ ${calculo.precoPorKm.toFixed(2)}/km`
  document.getElementById("calculo-detalhes").innerHTML = `
    🚗 Busca: ${pickupDisplay} + 📍 Corrida: ${tripDisplay}<br>
    💵 Valor: R$ ${valor.toFixed(2)}<br>
    <span class="destaque">Distância total percorrida:</span> ${calculo.distanciaTotal.toFixed(1)}km
  `

  toast.classList.remove("hidden", "fade-out")

  // Auto hide after 4 seconds
  setTimeout(() => {
    toast.classList.add("fade-out")
    setTimeout(() => {
      toast.classList.add("hidden")
    }, 400)
  }, 4000)
}

function calcularPrecoPorKm(pickupKm, tripKm, valor) {
  const distanciaTotal = pickupKm + tripKm
  const precoPorKm = valor / distanciaTotal

  return {
    precoPorKm: precoPorKm,
    distanciaTotal: distanciaTotal,
    pickupKm: pickupKm,
    tripKm: tripKm,
  }
}

function renderHistorico() {
  historicoLista.innerHTML = ""

  const totalKmViajado = historico.reduce((acc, item) => acc + item.distanciaTotal, 0)
  document.getElementById("total-km-traveled").textContent = `${totalKmViajado.toFixed(1)} km`

  const custos = calcularCustos()

  const realKmText = `${custos.realTotalKm.toFixed(1)} km`
  const fuelInfoHTML =
    custos.fuelConsumed > 0
      ? `<div class="fuel-info">
        <span>⛽ ${custos.fuelConsumed.toFixed(1)}L consumidos</span>
        <span>💰 R$ ${custos.fuelCost.toFixed(2)}</span>
      </div>`
      : ""

  document.getElementById("total-real-km").innerHTML = `${realKmText}${fuelInfoHTML}`

  historico.forEach((item, index) => {
    const el = document.createElement("div")
    el.className = "historico-item"

    const pickupDisplay =
      item.pickupKm < 1 ? `🚗 ${(item.pickupKm * 1000).toFixed(0)}m + ` : `🚗 ${item.pickupKm.toFixed(1)}km + `
    const tripDisplay =
      (item.tripKm || item.km) < 1
        ? `${((item.tripKm || item.km) * 1000).toFixed(0)}m`
        : `${(item.tripKm || item.km).toFixed(1)}km`

    const contentDiv = document.createElement("div")
    contentDiv.innerHTML = `
            <button class="edit-btn" data-index="${index}">✏️ Editar</button>
            <button class="delete-btn" data-index="${index}">🗑️ Excluir</button>
            <div class="historico-item-header">
                <span class="historico-km">${pickupDisplay}📍 ${tripDisplay}</span>
                <span class="historico-valor">R$ ${item.valor.toFixed(2)}</span>
            </div>
            <div class="historico-detalhes">
                💰 <span class="destaque">R$ ${item.precoPorKm.toFixed(2)}/km</span> • 📏 ${item.distanciaTotal.toFixed(1)}km total • 🕒 ${item.timestamp}
            </div>
        `

    el.appendChild(contentDiv)

    const editBtn = el.querySelector(".edit-btn")
    editBtn.onclick = () => showEditModal(index)

    const deleteBtn = el.querySelector(".delete-btn")
    deleteBtn.onclick = () => deletarItem(index)

    historicoLista.appendChild(el)
  })

  document.getElementById("total-corridas").textContent = historico.length
  const ganhoTotal = historico.reduce((acc, item) => acc + item.valor, 0)
  document.getElementById("ganho-total").textContent = `R$ ${ganhoTotal.toFixed(2)}`

  const ganhoLiquido = ganhoTotal - custos.totalCost

  const netDisplay = document.getElementById("ganho-liquido")
  if (custos.totalCost > 0) {
    const breakdown = []
    if (custos.fuelCost > 0) {
      breakdown.push(`Combustível: R$ ${custos.fuelCost.toFixed(2)}`)
    }
    if (custos.totalAppFee > 0) {
      breakdown.push(`Taxa do app: R$ ${custos.totalAppFee.toFixed(2)}`)
    }

    netDisplay.innerHTML = `
            Lucro Líquido: <strong>R$ ${ganhoLiquido.toFixed(2)}</strong><br>
            <span style="font-size: 10px;">${breakdown.join(" + ")}</span>
        `
  } else {
    netDisplay.innerHTML = `
            Lucro Líquido: <strong>R$ ${ganhoLiquido.toFixed(2)}</strong>
        `
  }
}

function showEditModal(index) {
  editingIndex = index
  editingItem = { ...historico[index] }

  const modal = document.getElementById("edit-modal")
  modal.classList.remove("hidden")

  // Reset checkboxes
  document.getElementById("edit-pickup-check").checked = false
  document.getElementById("edit-trip-check").checked = false
  document.getElementById("edit-value-check").checked = false
}

document.getElementById("edit-modal-close").onclick = () => {
  document.getElementById("edit-modal").classList.add("hidden")
  editingIndex = null
  editingItem = null
  editSteps = []
  currentEditStep = 0
}

document.getElementById("edit-modal-confirm").onclick = () => {
  const editPickup = document.getElementById("edit-pickup-check").checked
  const editTrip = document.getElementById("edit-trip-check").checked
  const editValue = document.getElementById("edit-value-check").checked

  if (!editPickup && !editTrip && !editValue) {
    alert("Por favor, selecione pelo menos uma opção para editar.")
    return
  }

  editSteps = []
  if (editPickup) editSteps.push("pickup")
  if (editTrip) editSteps.push("trip")
  if (editValue) editSteps.push("value")

  currentEditStep = 0

  document.getElementById("edit-modal").classList.add("hidden")

  // Start editing flow
  proceedToNextEditStep()
}

function proceedToNextEditStep() {
  if (currentEditStep >= editSteps.length) {
    // Finished all edits, save the item
    const calculo = calcularPrecoPorKm(editingItem.pickupKm, editingItem.tripKm, editingItem.valor)
    editingItem.precoPorKm = calculo.precoPorKm
    editingItem.distanciaTotal = calculo.distanciaTotal
    editingItem.timestamp = new Date().toLocaleString("pt-BR")

    historico[editingIndex] = editingItem
    salvarHistorico()

    showCalculoToast(calculo, editingItem.valor)

    renderHistorico()

    editingIndex = null
    editingItem = null
    editSteps = []
    currentEditStep = 0

    return
  }

  const step = editSteps[currentEditStep]
  currentEditStep++

  if (step === "pickup") {
    showPicker(editingItem.pickupKm, "pickup")
  } else if (step === "trip") {
    showPicker(editingItem.tripKm, "trip")
  } else if (step === "value") {
    showValueEditor()
  }
}

function showValueEditor() {
  pickupSelecionado = editingItem.pickupKm
  kmSelecionado = editingItem.tripKm

  // Hide other sections and show valor section for editing
  historicoSection.classList.add("hidden")
  pickupSection.classList.add("hidden")
  kmSection.classList.add("hidden")
  valorSection.classList.remove("hidden")

  // Render valor grid with current trip distance
  renderValor()

  // Add temporary cancel button for editing
  const existingCancelBtn = document.getElementById("cancel-edit-valor-btn")
  if (existingCancelBtn) existingCancelBtn.remove()

  const cancelBtn = document.createElement("button")
  cancelBtn.id = "cancel-edit-valor-btn"
  cancelBtn.className = "button voltar-btn"
  cancelBtn.textContent = "❌ Cancelar Edição"
  cancelBtn.onclick = () => {
    // Cancel editing
    valorSection.classList.add("hidden")
    historicoSection.classList.remove("hidden")
    cancelBtn.remove()

    editingIndex = null
    editingItem = null
    editSteps = []
    currentEditStep = 0
  }

  valorSection.appendChild(cancelBtn)
}

function renderValor() {
  valorGrid.innerHTML = ""
  const valores = kmValores[Math.round(kmSelecionado * 10) / 10] ||
    kmValores[Math.round(kmSelecionado)] || [5, 10, 15, 20, 25, 30]

  valores.forEach((v) => {
    const el = document.createElement("div")
    el.className = "bubble valor-bubble"
    el.innerHTML = `
            <div>R$ ${v}</div>
            <div class="bubble-label">corrida</div>
        `
    el.onclick = () => selecionarValor(v)
    valorGrid.appendChild(el)
  })

  document.getElementById("valor-manual-btn").classList.remove("hidden")
}

document.getElementById("voltar-pickup-btn").onclick = () => {
  pickupSelecionado = null
  pickupSection.classList.remove("hidden")
  kmSection.classList.add("hidden")

  document.getElementById("km-manual").value = ""
  document.getElementById("km-manual-box").classList.add("hidden")
  document.getElementById("mostrar-mais-km").classList.remove("hidden")

  document.querySelectorAll("#km-grid .bubble").forEach((b, idx) => {
    if (idx >= 6) b.classList.add("hidden")
  })
}

function getThermometerClass(precoPorKm) {
  if (precoPorKm < 1.0) return "temp-red"
  if (precoPorKm < 1.5) return "temp-orange"
  if (precoPorKm < 2.0) return "temp-yellow"
  if (precoPorKm < 2.5) return "temp-light-green"
  if (precoPorKm < 3.0) return "temp-dark-green"
  return "temp-blue"
}

function deletarItem(index) {
  if (confirm("Deseja excluir esta corrida do histórico?")) {
    historico.splice(index, 1)
    salvarHistorico()
    renderHistorico()
  }
}

document.getElementById("config-btn").onclick = () => {
  historicoSection.classList.add("hidden")
  configSection.classList.remove("hidden")
  configSection.classList.add("fade-in")

  document.getElementById("gas-price").value = config.gasPrice || ""
  document.getElementById("fuel-avg").value = config.fuelAvg || ""
  document.getElementById("total-km").value = config.totalKm || ""
  document.getElementById("app-fee").value = config.appFee || ""
}

document.getElementById("save-config").onclick = () => {
  const gasPrice = Number.parseFloat(document.getElementById("gas-price").value) || 0
  const fuelAvg = Number.parseFloat(document.getElementById("fuel-avg").value) || 0
  const totalKm = Number.parseFloat(document.getElementById("total-km").value) || 0
  const appFee = Number.parseFloat(document.getElementById("app-fee").value) || 0

  config.gasPrice = gasPrice
  config.fuelAvg = fuelAvg
  config.totalKm = totalKm
  config.appFee = appFee

  salvarConfig()

  configSection.classList.add("hidden")
  renderHistorico()
  historicoSection.classList.remove("hidden")
}

document.getElementById("edit-real-km-btn").onclick = () => {
  const currentKm = config.totalKm || 0
  const newKm = prompt(`📏 Digite o novo Total KM Real:\n\n(Valor atual: ${currentKm.toFixed(1)} km)`, currentKm)

  if (newKm !== null && newKm !== "") {
    const parsedKm = Number.parseFloat(newKm)
    if (!isNaN(parsedKm) && parsedKm >= 0) {
      config.totalKm = parsedKm
      salvarConfig()
      renderHistorico()
    } else {
      alert("Por favor, digite um valor válido.")
    }
  }
}

document.getElementById("reset-real-km-btn").onclick = () => {
  if (
    confirm("⚠️ Tem certeza que deseja resetar o Total KM Real para 0?\n\nO histórico de corridas não será afetado.")
  ) {
    config.totalKm = 0
    salvarConfig()
    renderHistorico()
  }
}

function resetarApp() {
  pickupSection.classList.remove("hidden")
  kmSection.classList.add("hidden")
  valorSection.classList.add("hidden")

  editingIndex = null
  editingItem = null
  editSteps = []
  currentEditStep = 0

  renderPickup()
  renderKm()
  valorGrid.innerHTML = ""

  document.getElementById("pickup-manual").value = ""
  document.getElementById("km-manual").value = ""
  document.getElementById("valor-manual").value = ""
  document.getElementById("pickup-manual-box").classList.add("hidden")
  document.getElementById("km-manual-box").classList.add("hidden")
  document.getElementById("valor-manual-box").classList.add("hidden")
  document.getElementById("mostrar-mais-pickup").classList.remove("hidden")
  document.getElementById("mostrar-mais-km").classList.remove("hidden")
}

function atualizarTotais() {
  // Function to update totals, if needed
}

const config = JSON.parse(localStorage.getItem("corridasConfig")) || {
  gasPrice: 0,
  fuelAvg: 0,
  totalKm: 0,
  appFee: 0,
}

if (historico.length > 0) {
  renderHistorico()
  historicoSection.classList.remove("hidden")
}

// Initialization at the end to ensure pickup grid renders on page load
atualizarTotais()
renderPickup()
renderKm()
console.log("[v0] App initialized - pickup grid should be visible")
