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

let historico = JSON.parse(localStorage.getItem("historicocorridas")) || []
let pickupSelecionado = null
let kmSelecionado = null

let editingIndex = null

let pickerType = null
let pickerValues = []
const pickerCallback = null
let longPressTimer = null

const config = JSON.parse(localStorage.getItem("corridasConfig")) || {
  gasPrice: 0,
  fuelAvg: 0,
  totalKm: 0,
  appFee: 0,
}

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
    // Generate values from 0.1 (100m) to 10.0 in 0.1 increments
    pickerValues = []
    for (let i = 1; i <= 100; i++) {
      pickerValues.push(i * 0.1)
    }
  } else if (type === "trip") {
    title.textContent = "📍 Distância da Corrida"
    // Generate values from 0.1 (100m) to 50 in 0.1 increments (100-meter support)
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
    const itemHeight = 40
    wheel.scrollTop = targetIndex * itemHeight
    updatePickerHighlight()
  }, 50)

  wheel.addEventListener("scroll", updatePickerHighlight)
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
      selecionarPickup(selectedValue)
    } else if (pickerType === "trip") {
      selecionarKm(selectedValue)
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

renderPickup()
renderKm()

document.getElementById("mostrar-mais-pickup").onclick = () => {
  document.querySelectorAll("#pickup-grid .bubble.hidden").forEach((b) => {
    b.classList.remove("hidden")
  })
  document.getElementById("mostrar-mais-pickup").classList.add("hidden")
  document.getElementById("pickup-manual-box").classList.remove("hidden")
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

document.getElementById("valor-manual-btn").onclick = () => {
  document.getElementById("valor-manual-box").classList.remove("hidden")
}

document.getElementById("valor-manual").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const valorCustom = Number.parseFloat(e.target.value)
    if (valorCustom > 0) selecionarValor(valorCustom)
  }
})

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

function calcularCustos() {
  const totalKmViajado = historico.reduce((acc, item) => acc + item.distanciaTotal, 0)
  // Use real total km from config for fuel calculation
  const realTotalKm = config.totalKm || 0
  const fuelConsumed = config.fuelAvg > 0 && realTotalKm > 0 ? realTotalKm / config.fuelAvg : 0
  const fuelCost = fuelConsumed * config.gasPrice
  const totalAppFee = config.appFee * historico.length

  return {
    totalKmViajado,
    realTotalKm,
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
  } else {
    historico.unshift(item)
  }

  salvarHistorico()

  calculoSection.classList.remove("hidden")
  calculoSection.classList.add("fade-in")

  const pickupDisplay =
    pickupSelecionado < 1 ? `${(pickupSelecionado * 1000).toFixed(0)}m` : `${pickupSelecionado.toFixed(1)}km`
  const tripDisplay = kmSelecionado < 1 ? `${(kmSelecionado * 1000).toFixed(0)}m` : `${kmSelecionado.toFixed(1)}km`

  document.getElementById("preco-por-km").textContent = `R$ ${calculo.precoPorKm.toFixed(2)}/km`
  document.getElementById("calculo-detalhes").innerHTML = `
        🚗 Busca: ${pickupDisplay} + 📍 Corrida: ${tripDisplay}<br>
        💵 Valor: R$ ${valor.toFixed(2)}<br>
        <span class="destaque">Distância total percorrida:</span> ${calculo.distanciaTotal.toFixed(1)}km
    `

  renderHistorico()
  historicoSection.classList.remove("hidden")
  historicoSection.classList.add("fade-in")

  setTimeout(() => {
    resetarApp()
  }, 5000)
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

function renderHistorico() {
  historicoLista.innerHTML = ""

  const totalKmViajado = historico.reduce((acc, item) => acc + item.distanciaTotal, 0)
  document.getElementById("total-km-traveled").textContent = `${totalKmViajado.toFixed(1)} km`

  // Display real total km (manual input)
  document.getElementById("total-real-km").textContent = `${(config.totalKm || 0).toFixed(1)} km`

  historico.forEach((item, index) => {
    const el = document.createElement("div")
    el.className = "historico-item"

    const thermometerClass = getThermometerClass(item.precoPorKm)
    const thermometer = document.createElement("div")
    thermometer.className = `thermometer ${thermometerClass}`
    el.appendChild(thermometer)

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
    editBtn.onclick = () => editarItem(index)

    const deleteBtn = el.querySelector(".delete-btn")
    deleteBtn.onclick = () => deletarItem(index)

    historicoLista.appendChild(el)
  })

  document.getElementById("total-corridas").textContent = historico.length
  const ganhoTotal = historico.reduce((acc, item) => acc + item.valor, 0)
  document.getElementById("ganho-total").textContent = `R$ ${ganhoTotal.toFixed(2)}`

  const custos = calcularCustos()
  const ganhoLiquido = ganhoTotal - custos.totalCost

  const netDisplay = document.getElementById("ganho-liquido")
  if (custos.totalCost > 0) {
    netDisplay.innerHTML = `
            Líquido: <strong>R$ ${ganhoLiquido.toFixed(2)}</strong><br>
            (- R$ ${custos.fuelCost.toFixed(2)} combustível<br>
            - R$ ${custos.totalAppFee.toFixed(2)} taxa app)
        `
  } else {
    netDisplay.innerHTML = ""
  }
}

function editarItem(index) {
  const item = historico[index]

  editingIndex = index

  pickupSelecionado = item.pickupKm
  kmSelecionado = item.tripKm

  historicoSection.classList.add("hidden")
  calculoSection.classList.add("hidden")

  pickupSection.classList.add("hidden")
  kmSection.classList.add("hidden")
  valorSection.classList.remove("hidden")
  valorSection.classList.add("fade-in")

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

document.getElementById("limpar-historico").onclick = () => {
  if (confirm("Deseja limpar todo o histórico?")) {
    historico = []
    salvarHistorico()
    renderHistorico()
  }
}

function resetarApp() {
  pickupSection.classList.remove("hidden")
  kmSection.classList.add("hidden")
  valorSection.classList.add("hidden")
  calculoSection.classList.add("hidden")

  editingIndex = null

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

  document.querySelectorAll("#pickup-grid .bubble").forEach((b, idx) => {
    if (idx >= 6) b.classList.add("hidden")
  })
  document.querySelectorAll("#km-grid .bubble").forEach((b, idx) => {
    if (idx >= 6) b.classList.add("hidden")
  })
}

if (historico.length > 0) {
  renderHistorico()
  historicoSection.classList.remove("hidden")
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
  // Overwrite totalKm (not cumulative)
  config.gasPrice = Number.parseFloat(document.getElementById("gas-price").value) || 0
  config.fuelAvg = Number.parseFloat(document.getElementById("fuel-avg").value) || 0
  config.totalKm = Number.parseFloat(document.getElementById("total-km").value) || 0
  config.appFee = Number.parseFloat(document.getElementById("app-fee").value) || 0

  salvarConfig()

  configSection.classList.add("hidden")
  renderHistorico()
  historicoSection.classList.remove("hidden")

  // Alert removed for silent save
}
