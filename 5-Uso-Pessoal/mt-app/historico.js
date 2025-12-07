// Load data from localStorage
const historico = JSON.parse(localStorage.getItem("historicocorridas")) || []
const config = JSON.parse(localStorage.getItem("corridasConfig")) || {
  gasPrice: 0,
  fuelAvg: 0,
  totalKm: 0,
  appFee: 0,
}

// Load goals from localStorage
const goals = JSON.parse(localStorage.getItem("driverGoals")) || {
  daily: 0,
  weekly: 0,
  monthly: 0,
}

// Current filter
const currentFilter = {
  period: "week",
  startDate: null,
  endDate: null,
}

// Chart settings
const chartSettings = {
  earnings: { type: "bar", mode: "gross" },
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  initializeFilters()
  renderDashboard()
})

// Filter functions
function initializeFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn[data-period]")
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentFilter.period = btn.dataset.period

      if (currentFilter.period === "custom") {
        document.getElementById("custom-range").classList.remove("hidden")
      } else {
        document.getElementById("custom-range").classList.add("hidden")
        renderDashboard()
      }
    })
  })

  // Custom range apply
  document.querySelector("#custom-range .filter-btn").addEventListener("click", () => {
    currentFilter.startDate = document.getElementById("start-date").value
    currentFilter.endDate = document.getElementById("end-date").value
    if (currentFilter.startDate && currentFilter.endDate) {
      renderDashboard()
    }
  })

  // Chart toggles
  document.querySelectorAll(".chart-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chart = btn.dataset.chart
      const type = btn.dataset.type
      const mode = btn.dataset.mode

      if (type) {
        document
          .querySelectorAll(`.chart-toggle[data-chart="${chart}"][data-type]`)
          .forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        chartSettings[chart].type = type
      }

      if (mode) {
        document
          .querySelectorAll(`.chart-toggle[data-chart="${chart}"][data-mode]`)
          .forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        chartSettings[chart].mode = mode
      }

      renderDashboard()
    })
  })
}

// Filter data by period
function filterDataByPeriod(data) {
  const now = new Date()
  let startDate, endDate

  switch (currentFilter.period) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      endDate = now
      break
    case "week":
      startDate = new Date(now - 7 * 24 * 60 * 60 * 1000)
      endDate = now
      break
    case "month":
      startDate = new Date(now - 30 * 24 * 60 * 60 * 1000)
      endDate = now
      break
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1)
      endDate = now
      break
    case "custom":
      if (currentFilter.startDate && currentFilter.endDate) {
        startDate = new Date(currentFilter.startDate)
        endDate = new Date(currentFilter.endDate)
        endDate.setHours(23, 59, 59)
      } else {
        return data
      }
      break
    default:
      return data
  }

  return data.filter((item) => {
    const itemDate = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return itemDate >= startDate && itemDate <= endDate
  })
}

// Main render function
function renderDashboard() {
  const filteredData = filterDataByPeriod(historico)
  renderSummaryCards(filteredData)
  renderEarningsChart(filteredData)
  renderRidesChart(filteredData)
  renderDistanceChart(filteredData)
  renderInsights(filteredData)
  renderComparisons(filteredData)
  renderCategories(filteredData)
  renderKmAnalysis(filteredData)
  renderHeatmap(filteredData)
  renderGoals(filteredData)
  renderRideList(filteredData)
}

// Summary Cards
function renderSummaryCards(data) {
  const container = document.getElementById("dashboard-cards")
  const totalRides = data.length
  const totalGross = data.reduce((sum, item) => sum + item.valor, 0)

  const totalTripKm = data.reduce((sum, item) => sum + (item.tripKm || 0), 0)
  const fuelCost =
    config.fuelAvg > 0 && config.gasPrice > 0
      ? (((totalTripKm / config.fuelAvg) * config.gasPrice) / 10) * totalTripKm
      : 0
  const totalNet = totalGross - fuelCost - config.appFee

  const totalDistance = data.reduce((sum, item) => sum + (item.distanciaTotal || 0), 0)
  const avgPerKm = totalDistance > 0 ? totalGross / totalDistance : 0
  const avgPerRide = totalRides > 0 ? totalGross / totalRides : 0

  const distances = data.map((item) => item.distanciaTotal || 0)
  const longestRide = distances.length > 0 ? Math.max(...distances) : 0
  const shortestRide = distances.length > 0 ? Math.min(...distances) : 0

  const cards = [
    { label: "Total de Corridas", value: totalRides, subtitle: "" },
    { label: "Receita Bruta", value: `R$ ${totalGross.toFixed(2)}`, subtitle: "" },
    { label: "Receita Líquida", value: `R$ ${totalNet.toFixed(2)}`, subtitle: "" },
    { label: "Taxas do App", value: `R$ ${config.appFee.toFixed(2)}`, subtitle: "" },
    { label: "Distância Total", value: `${totalDistance.toFixed(1)} km`, subtitle: "" },
    { label: "Média por KM", value: `R$ ${avgPerKm.toFixed(2)}`, subtitle: "/km" },
    { label: "Média por Corrida", value: `R$ ${avgPerRide.toFixed(2)}`, subtitle: "" },
    { label: "Maior Corrida", value: `${longestRide.toFixed(1)} km`, subtitle: "" },
    { label: "Menor Corrida", value: `${shortestRide.toFixed(1)} km`, subtitle: "" },
  ]

  container.innerHTML = cards
    .map(
      (card) => `
    <div class="summary-card">
      <div class="card-label">${card.label}</div>
      <div class="card-value">${card.value}</div>
      <div class="card-subtitle">${card.subtitle}</div>
    </div>
  `,
    )
    .join("")
}

// Earnings Chart
function renderEarningsChart(data) {
  const container = document.getElementById("earnings-chart")
  const groupedData = groupDataByPeriod(data)
  const { type, mode } = chartSettings.earnings

  const totalTripKm = data.reduce((sum, item) => sum + (item.tripKm || 0), 0)
  const fuelCost =
    config.fuelAvg > 0 && config.gasPrice > 0
      ? (((totalTripKm / config.fuelAvg) * config.gasPrice) / 10) * totalTripKm
      : 0

  const values = Object.entries(groupedData).map(([label, items]) => {
    const gross = items.reduce((sum, item) => sum + item.valor, 0)
    const itemTripKm = items.reduce((sum, item) => sum + (item.tripKm || 0), 0)
    const itemFuelCost =
      config.fuelAvg > 0 && config.gasPrice > 0
        ? (((itemTripKm / config.fuelAvg) * config.gasPrice) / 10) * itemTripKm
        : 0
    const net = gross - itemFuelCost - config.appFee / Object.keys(groupedData).length
    return { label, value: mode === "gross" ? gross : net }
  })

  if (type === "bar") {
    renderBarChart(container, values)
  } else {
    renderLineChart(container, values)
  }
}

// Rides Chart
function renderRidesChart(data) {
  const container = document.getElementById("rides-chart")
  const groupedData = groupDataByPeriod(data)
  const values = Object.entries(groupedData).map(([label, items]) => ({
    label,
    value: items.length,
  }))
  renderBarChart(container, values)
}

// Distance Chart
function renderDistanceChart(data) {
  const container = document.getElementById("distance-chart")
  const groupedData = groupDataByPeriod(data)
  const values = Object.entries(groupedData).map(([label, items]) => ({
    label,
    value: items.reduce((sum, item) => sum + (item.distanciaTotal || 0), 0),
  }))
  renderBarChart(container, values)
}

// Group data by period for charts
function groupDataByPeriod(data) {
  const grouped = {}

  data.forEach((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    let key

    switch (currentFilter.period) {
      case "today":
        key = `${date.getHours()}h`
        break
      case "week":
        key = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][date.getDay()]
        break
      case "month":
        key = `${date.getDate()}/${date.getMonth() + 1}`
        break
      case "year":
        key = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][date.getMonth()]
        break
      default:
        key = `${date.getDate()}/${date.getMonth() + 1}`
    }

    if (!grouped[key]) grouped[key] = []
    grouped[key].push(item)
  })

  return grouped
}

// Render Bar Chart
function renderBarChart(container, data) {
  if (data.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Sem dados para exibir</p>'
    return
  }

  const maxValue = Math.max(...data.map((d) => d.value))
  const bars = data
    .map((d) => {
      const height = maxValue > 0 ? (d.value / maxValue) * 100 : 0
      const displayValue = typeof d.value === "number" ? d.value.toFixed(d.value < 10 ? 1 : 0) : d.value
      return `
      <div class="bar" style="height: ${height}%">
        <div class="bar-value">${displayValue}</div>
        <div class="bar-label">${d.label}</div>
      </div>
    `
    })
    .join("")

  container.innerHTML = `<div class="bar-chart">${bars}</div>`
}

// Render Line Chart (simplified)
function renderLineChart(container, data) {
  if (data.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Sem dados para exibir</p>'
    return
  }

  const maxValue = Math.max(...data.map((d) => d.value))
  const bars = data
    .map((d) => {
      const height = maxValue > 0 ? (d.value / maxValue) * 100 : 0
      const displayValue = typeof d.value === "number" ? d.value.toFixed(d.value < 10 ? 1 : 0) : d.value
      return `
      <div class="bar" style="height: ${height}%; border-radius: 50%; width: 20px;">
        <div class="bar-value">${displayValue}</div>
        <div class="bar-label">${d.label}</div>
      </div>
    `
    })
    .join("")

  container.innerHTML = `<div class="bar-chart">${bars}</div>`
}

// Insights Module
function renderInsights(data) {
  const container = document.getElementById("insights-grid")

  if (data.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Sem dados para análise</p>'
    return
  }

  // Most profitable hours
  const hourlyEarnings = {}
  data.forEach((item) => {
    const hour = Number.parseInt(item.timestamp.split(" ")[1].split(":")[0])
    if (!hourlyEarnings[hour]) hourlyEarnings[hour] = 0
    hourlyEarnings[hour] += item.valor
  })
  const bestHour = Object.entries(hourlyEarnings).sort((a, b) => b[1] - a[1])[0]

  // Most profitable days
  const dailyEarnings = {}
  data.forEach((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    const day = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][date.getDay()]
    if (!dailyEarnings[day]) dailyEarnings[day] = 0
    dailyEarnings[day] += item.valor
  })
  const bestDay = Object.entries(dailyEarnings).sort((a, b) => b[1] - a[1])[0]

  // Average earnings per hour
  const totalEarnings = data.reduce((sum, item) => sum + item.valor, 0)
  const daysActive = new Set(data.map((item) => item.timestamp.split(",")[0])).size
  const avgPerDay = daysActive > 0 ? totalEarnings / daysActive : 0

  // Real profit
  const totalTripKm = data.reduce((sum, item) => sum + (item.tripKm || 0), 0)
  const fuelCost =
    config.fuelAvg > 0 && config.gasPrice > 0
      ? (((totalTripKm / config.fuelAvg) * config.gasPrice) / 10) * totalTripKm
      : 0
  const realProfit = totalEarnings - fuelCost - config.appFee

  const insights = [
    {
      title: "🕐 Horário Mais Lucrativo",
      value: bestHour ? `${bestHour[0]}h - ${bestHour[1].toFixed(2)}` : "N/A",
      trend: "Foco neste horário",
    },
    {
      title: "📅 Dia Mais Lucrativo",
      value: bestDay ? `${bestDay[0]} - R$ ${bestDay[1].toFixed(2)}` : "N/A",
      trend: "Melhor performance",
    },
    {
      title: "💰 Média por Dia",
      value: `R$ ${avgPerDay.toFixed(2)}`,
      trend: `${daysActive} dias ativos`,
    },
    {
      title: "💎 Lucro Real",
      value: `R$ ${realProfit.toFixed(2)}`,
      trend: realProfit > 0 ? "Positivo" : "Negativo",
    },
  ]

  container.innerHTML = insights
    .map(
      (insight) => `
    <div class="insight-card">
      <div class="insight-title">${insight.title}</div>
      <div class="insight-value">${insight.value}</div>
      <div class="insight-trend ${realProfit > 0 ? "trend-up" : "trend-down"}">${insight.trend}</div>
    </div>
  `,
    )
    .join("")
}

// Comparisons Module
function renderComparisons(data) {
  const container = document.getElementById("comparison-grid")
  const now = new Date()

  // This week vs last week
  const thisWeekStart = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const lastWeekStart = new Date(now - 14 * 24 * 60 * 60 * 1000)

  const thisWeek = historico.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return date >= thisWeekStart
  })

  const lastWeek = historico.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return date >= lastWeekStart && date < thisWeekStart
  })

  const thisWeekEarnings = thisWeek.reduce((sum, item) => sum + item.valor, 0)
  const lastWeekEarnings = lastWeek.reduce((sum, item) => sum + item.valor, 0)
  const weekChange = lastWeekEarnings > 0 ? ((thisWeekEarnings - lastWeekEarnings) / lastWeekEarnings) * 100 : 0

  // This month vs last month
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const thisMonth = historico.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return date >= thisMonthStart
  })

  const lastMonth = historico.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return date >= lastMonthStart && date < thisMonthStart
  })

  const thisMonthEarnings = thisMonth.reduce((sum, item) => sum + item.valor, 0)
  const lastMonthEarnings = lastMonth.reduce((sum, item) => sum + item.valor, 0)
  const monthChange = lastMonthEarnings > 0 ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100 : 0

  const comparisons = [
    {
      period: "Esta Semana",
      value: `R$ ${thisWeekEarnings.toFixed(2)}`,
      change: weekChange,
    },
    {
      period: "Semana Passada",
      value: `R$ ${lastWeekEarnings.toFixed(2)}`,
      change: -weekChange,
    },
    {
      period: "Este Mês",
      value: `R$ ${thisMonthEarnings.toFixed(2)}`,
      change: monthChange,
    },
    {
      period: "Mês Passado",
      value: `R$ ${lastMonthEarnings.toFixed(2)}`,
      change: -monthChange,
    },
  ]

  container.innerHTML = comparisons
    .map(
      (comp) => `
    <div class="comparison-card">
      <div class="comparison-period">${comp.period}</div>
      <div class="comparison-value">${comp.value}</div>
      <div class="comparison-change ${comp.change >= 0 ? "trend-up" : "trend-down"}">
        ${comp.change >= 0 ? "↑" : "↓"} ${Math.abs(comp.change).toFixed(1)}%
      </div>
    </div>
  `,
    )
    .join("")
}

// Categories Module
function renderCategories(data) {
  const container = document.getElementById("category-grid")

  const categories = {
    short: { name: "Corridas Curtas", count: 0, earnings: 0, condition: (item) => item.tripKm < 5 },
    long: { name: "Corridas Longas", count: 0, earnings: 0, condition: (item) => item.tripKm >= 5 && item.tripKm < 20 },
    intercity: { name: "Intermunicipais", count: 0, earnings: 0, condition: (item) => item.tripKm >= 20 },
    highDemand: { name: "Alta Demanda", count: 0, earnings: 0, condition: (item) => item.precoPorKm > 2.5 },
  }

  data.forEach((item) => {
    Object.values(categories).forEach((cat) => {
      if (cat.condition(item)) {
        cat.count++
        cat.earnings += item.valor
      }
    })
  })

  container.innerHTML = Object.values(categories)
    .map(
      (cat) => `
    <div class="category-card">
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count}</div>
      <div class="category-earnings">R$ ${cat.earnings.toFixed(2)}</div>
    </div>
  `,
    )
    .join("")
}

// KM Analysis Module
function renderKmAnalysis(data) {
  const container = document.getElementById("km-analysis")
  const chartContainer = document.getElementById("km-chart")

  const realTotalKm = config.totalKm || 0
  const tripKm = data.reduce((sum, item) => sum + (item.tripKm || 0), 0)
  const deadKm = realTotalKm - tripKm
  const efficiency = realTotalKm > 0 ? (tripKm / realTotalKm) * 100 : 0

  const insights = [
    { title: "📏 KM Real Total", value: `${realTotalKm.toFixed(1)} km`, trend: "Hodômetro" },
    { title: "💰 KM Pagos", value: `${tripKm.toFixed(1)} km`, trend: "Corridas" },
    { title: "❌ KM Mortos", value: `${deadKm.toFixed(1)} km`, trend: "Sem ganhos" },
    { title: "✅ Eficiência", value: `${efficiency.toFixed(1)}%`, trend: "Taxa de aproveitamento" },
  ]

  container.innerHTML = insights
    .map(
      (insight) => `
    <div class="insight-card">
      <div class="insight-title">${insight.title}</div>
      <div class="insight-value">${insight.value}</div>
      <div class="insight-trend">${insight.trend}</div>
    </div>
  `,
    )
    .join("")

  // Simple bar comparison
  const chartData = [
    { label: "KM Pagos", value: tripKm },
    { label: "KM Mortos", value: deadKm },
  ]
  renderBarChart(chartContainer, chartData)
}

// Heatmap Module
function renderHeatmap(data) {
  const container = document.getElementById("heatmap")

  const hourlyData = Array.from({ length: 24 }, () => ({ count: 0, earnings: 0 }))

  data.forEach((item) => {
    const hour = Number.parseInt(item.timestamp.split(" ")[1].split(":")[0])
    hourlyData[hour].count++
    hourlyData[hour].earnings += item.valor
  })

  const topHours = hourlyData
    .map((data, hour) => ({ hour, earnings: data.earnings }))
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 6)

  container.innerHTML = topHours
    .map(
      (data) => `
    <div class="heatmap-cell">
      <div class="heatmap-hour">${data.hour}h</div>
      <div class="heatmap-value">R$ ${data.earnings.toFixed(0)}</div>
    </div>
  `,
    )
    .join("")
}

// Goals Module
function renderGoals(data) {
  const container = document.getElementById("goals-container")

  const totalEarnings = data.reduce((sum, item) => sum + item.valor, 0)
  const now = new Date()

  // Daily goal
  const today = data.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return (
      date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    )
  })
  const dailyEarnings = today.reduce((sum, item) => sum + item.valor, 0)
  const dailyProgress = goals.daily > 0 ? (dailyEarnings / goals.daily) * 100 : 0

  // Weekly goal
  const weekStart = new Date(now - 7 * 24 * 60 * 60 * 1000)
  const thisWeek = data.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return date >= weekStart
  })
  const weeklyEarnings = thisWeek.reduce((sum, item) => sum + item.valor, 0)
  const weeklyProgress = goals.weekly > 0 ? (weeklyEarnings / goals.weekly) * 100 : 0

  // Monthly goal
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisMonth = data.filter((item) => {
    const date = new Date(item.timestamp.split(",")[0].split("/").reverse().join("-"))
    return date >= monthStart
  })
  const monthlyEarnings = thisMonth.reduce((sum, item) => sum + item.valor, 0)
  const monthlyProgress = goals.monthly > 0 ? (monthlyEarnings / goals.monthly) * 100 : 0

  const goalsData = [
    { label: "Meta Diária", current: dailyEarnings, goal: goals.daily, progress: dailyProgress, key: "daily" },
    { label: "Meta Semanal", current: weeklyEarnings, goal: goals.weekly, progress: weeklyProgress, key: "weekly" },
    { label: "Meta Mensal", current: monthlyEarnings, goal: goals.monthly, progress: monthlyProgress, key: "monthly" },
  ]

  container.innerHTML = goalsData
    .map(
      (goal) => `
    <div class="goal-item">
      <div class="goal-header">
        <div class="goal-label">${goal.label}</div>
        <div class="goal-percentage">${Math.min(goal.progress, 100).toFixed(0)}%</div>
      </div>
      <div class="goal-progress-bar">
        <div class="goal-progress-fill" style="width: ${Math.min(goal.progress, 100)}%"></div>
      </div>
      <div class="card-subtitle">R$ ${goal.current.toFixed(2)} / R$ ${goal.goal.toFixed(2)}</div>
      <div class="goal-input-group">
        <input type="number" id="goal-${goal.key}" placeholder="Nova meta" step="10" value="${goal.goal}">
        <button onclick="saveGoal('${goal.key}')">Salvar</button>
      </div>
    </div>
  `,
    )
    .join("")
}

// Save goal
function saveGoal(key) {
  const value = Number.parseFloat(document.getElementById(`goal-${key}`).value) || 0
  goals[key] = value
  localStorage.setItem("driverGoals", JSON.stringify(goals))
  renderDashboard()
}

// Ride List Module
function renderRideList(data) {
  const container = document.getElementById("ride-list-container")

  if (data.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary);">Nenhuma corrida neste período</p>'
    return
  }

  container.innerHTML = data
    .map(
      (item) => `
    <div class="ride-item">
      <div class="ride-header">
        <div class="ride-date">🕒 ${item.timestamp}</div>
        <div class="ride-value">R$ ${item.valor.toFixed(2)}</div>
      </div>
      <div class="ride-details">
        🚗 ${item.pickupKm.toFixed(1)}km busca + 📍 ${item.tripKm.toFixed(1)}km corrida • 
        💰 R$ ${item.precoPorKm.toFixed(2)}/km • 
        📏 ${item.distanciaTotal.toFixed(1)}km total
      </div>
    </div>
  `,
    )
    .join("")
}

// Export to PDF (simplified - generates text report)
function exportPDF(type) {
  let filteredData
  const now = new Date()

  switch (type) {
    case "daily":
      currentFilter.period = "today"
      break
    case "weekly":
      currentFilter.period = "week"
      break
    case "monthly":
      currentFilter.period = "month"
      break
    default:
      currentFilter.period = "week"
  }

  filteredData = filterDataByPeriod(historico)

  // Generate text report
  const totalEarnings = filteredData.reduce((sum, item) => sum + item.valor, 0)
  const totalRides = filteredData.length
  const totalDistance = filteredData.reduce((sum, item) => sum + item.distanciaTotal, 0)

  const report = `
=== RELATÓRIO DE CORRIDAS ${type.toUpperCase()} ===
Data: ${now.toLocaleDateString("pt-BR")}

RESUMO:
- Total de Corridas: ${totalRides}
- Receita Total: R$ ${totalEarnings.toFixed(2)}
- Distância Total: ${totalDistance.toFixed(1)} km
- Média por Corrida: R$ ${(totalEarnings / totalRides || 0).toFixed(2)}

DETALHES:
${filteredData
  .map(
    (item, i) => `
${i + 1}. ${item.timestamp}
   Valor: R$ ${item.valor.toFixed(2)} | Distância: ${item.distanciaTotal.toFixed(1)}km | Preço/km: R$ ${item.precoPorKm.toFixed(2)}`,
  )
  .join("\n")}

=================================
  `.trim()

  // Create downloadable text file
  const blob = new Blob([report], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `relatorio_${type}_${now.getTime()}.txt`
  a.click()
  URL.revokeObjectURL(url)

  alert("Relatório exportado com sucesso!")
}
