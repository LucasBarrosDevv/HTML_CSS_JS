// Dados dos treinos
const workoutData = {
  0: {
    // Domingo - Descanso
    title: "Domingo - Dia de Descanso",
    description: "Hoje é seu dia de descanso! Aproveite para relaxar e se recuperar.",
    exercises: [],
    isRestDay: true,
  },
  1: {
    // Segunda-feira
    title: "Segunda-feira - QUADRÍCEPS/POSTERIOR",
    description: "Foco nos músculos das pernas. Mantenha boa forma e controle o movimento.",
    exercises: [
      {
        name: "Agachamento no Smith",
        reps: "4/12",
        variations: ["Agachamento livre", "Agachamento búlgaro", "Agachamento sumô"],
        tips: "Mantenha o core contraído e desça até 90 graus",
      },
      {
        name: "Afundo",
        reps: "3/10",
        variations: ["Afundo caminhando", "Afundo reverso", "Afundo lateral"],
        tips: "Mantenha o tronco ereto e o joelho alinhado",
      },
      {
        name: "Cadeira Extensora - Drop Set",
        reps: "4/8-12-15-20",
        variations: ["Extensora unilateral", "Extensora com pausa"],
        tips: "Execute o drop set sem descanso entre as repetições",
      },
      {
        name: "Leg Press",
        reps: "4/12",
        variations: ["Leg press 45°", "Leg press horizontal", "Leg press unilateral"],
        tips: "Posicione os pés na largura dos ombros",
      },
      {
        name: "Cadeira Flexora",
        reps: "4/12",
        variations: ["Flexora deitado", "Flexora em pé", "Flexora unilateral"],
        tips: "Controle a fase excêntrica do movimento",
      },
      {
        name: "Stiff Unilateral",
        reps: "3/10",
        variations: ["Stiff com barra", "Stiff com halteres", "Stiff romeno"],
        tips: "Mantenha a coluna neutra e sinta o alongamento",
      },
    ],
  },
  2: {
    // Terça-feira
    title: "Terça-feira - TRÍCEPS, OMBRO E PANTURRILHA",
    description: "Treino focado em membros superiores e panturrilhas. Atenção à técnica!",
    exercises: [
      {
        name: "Elevação Lateral",
        reps: "3/15",
        variations: ["Elevação frontal", "Elevação posterior", "Elevação com cabo"],
        tips: "Mantenha os cotovelos ligeiramente flexionados",
      },
      {
        name: "Puxada na Polia com Corda",
        reps: "4/12",
        variations: ["Puxada com barra", "Puxada unilateral", "Puxada alta"],
        tips: "Abra bem a corda na parte final do movimento",
      },
      {
        name: "Tríceps na Polia com Barra",
        reps: "3/10",
        variations: ["Tríceps com corda", "Tríceps pegada supinada", "Tríceps unilateral"],
        tips: "Mantenha os cotovelos fixos ao lado do corpo",
      },
      {
        name: "Tríceps Francês",
        reps: "4/12",
        variations: ["Francês com halteres", "Francês no cabo", "Francês unilateral"],
        tips: "Cuidado com a articulação do cotovelo",
      },
      {
        name: "Desenvolvimento",
        reps: "4/10",
        variations: ["Desenvolvimento com halteres", "Desenvolvimento militar", "Desenvolvimento Arnold"],
        tips: "Não desça muito a barra para proteger os ombros",
      },
      {
        name: "Panturrilha na Cadeira",
        reps: "3/15",
        variations: ["Panturrilha em pé", "Panturrilha no leg", "Panturrilha unilateral"],
        tips: "Faça amplitude completa do movimento",
      },
      {
        name: "Panturrilha no Leg Horizontal",
        reps: "3/15",
        variations: ["Panturrilha 45°", "Panturrilha com pausa", "Panturrilha explosiva"],
        tips: "Controle bem a fase negativa",
      },
    ],
  },
  3: {
    // Quarta-feira
    title: "Quarta-feira - GLÚTEOS ISOLADO",
    description: "Treino específico para glúteos. Inicie com mobilidade e foque na ativação muscular.",
    exercises: [
      {
        name: "Mobilidade",
        reps: "5 min",
        variations: ["Alongamento dinâmico", "Ativação glútea", "Mobilidade de quadril"],
        tips: "Prepare bem a musculatura antes do treino",
      },
      {
        name: "Elevação Pélvica",
        reps: "4/12",
        variations: ["Elevação unilateral", "Elevação com peso", "Elevação com pausa"],
        tips: "Contraia bem os glúteos no topo do movimento",
      },
      {
        name: "Búlgaro",
        reps: "4/10",
        variations: ["Búlgaro com halteres", "Búlgaro com barra", "Búlgaro lateral"],
        tips: "Mantenha o peso na perna da frente",
      },
      {
        name: "Stiff na Barra",
        reps: "4/12",
        variations: ["Stiff com halteres", "Stiff sumô", "Stiff unilateral"],
        tips: "Sinta o alongamento dos posteriores",
      },
      {
        name: "Levantamento Terra",
        reps: "4/12",
        variations: ["Terra sumô", "Terra romeno", "Terra com trap bar"],
        tips: "Mantenha a coluna neutra durante todo movimento",
      },
      {
        name: "Agachamento Sumô",
        reps: "3/15",
        variations: ["Sumô com peso", "Sumô pliométrico", "Sumô com pausa"],
        tips: "Pés mais afastados, pontas voltadas para fora",
      },
      {
        name: "Coice Cruzado na Polia",
        reps: "3/15",
        variations: ["Coice reto", "Coice lateral", "Coice com caneleira"],
        tips: "Mantenha o core estável durante o movimento",
      },
      {
        name: "Cadeira Abdutora - Drop Set",
        reps: "3/10-12-15-20",
        variations: ["Abdutora em pé", "Abdutora com elástico", "Abdutora unilateral"],
        tips: "Execute sem descanso entre as cargas",
      },
    ],
  },
  4: {
    // Quinta-feira
    title: "Quinta-feira - COSTA E BÍCEPS",
    description: "Treino de puxada focado em costa e bíceps. Atenção à postura e ativação muscular.",
    exercises: [
      {
        name: "Puxada Aberta",
        reps: "4/12",
        variations: ["Puxada fechada", "Puxada com triângulo", "Puxada unilateral"],
        tips: "Puxe com os cotovelos, não com as mãos",
      },
      {
        name: "Remada Baixa",
        reps: "3/12",
        variations: ["Remada alta", "Remada unilateral", "Remada com pegada neutra"],
        tips: "Mantenha o peito estufado e ombros para trás",
      },
      {
        name: "Crucifixo Inverso",
        reps: "3/12",
        variations: ["Crucifixo no cabo", "Crucifixo inclinado", "Crucifixo com halteres"],
        tips: "Foque na contração dos deltoides posteriores",
      },
      {
        name: "Elevação Lateral na Polia",
        reps: "3/10",
        variations: ["Elevação com halteres", "Elevação frontal", "Elevação posterior"],
        tips: "Mantenha tensão constante com o cabo",
      },
      {
        name: "Rosca Alternada",
        reps: "3/15",
        variations: ["Rosca simultânea", "Rosca concentrada", "Rosca inclinada"],
        tips: "Controle bem a fase excêntrica",
      },
      {
        name: "Rosca Martelo Alternada no Banco",
        reps: "3/12",
        variations: ["Martelo em pé", "Martelo com cabo", "Martelo concentrado"],
        tips: "Mantenha os punhos neutros",
      },
      {
        name: "Rosca com Corda no Cross",
        reps: "3/10",
        variations: ["Rosca com barra", "Rosca 21", "Rosca concentrada"],
        tips: "Abra bem a corda na contração",
      },
      {
        name: "Panturrilha no Leg",
        reps: "4/15",
        variations: ["Panturrilha em pé", "Panturrilha sentado", "Panturrilha unilateral"],
        tips: "Amplitude completa do movimento",
      },
      {
        name: "Panturrilha no Leg Horizontal",
        reps: "4/15",
        variations: ["Panturrilha 45°", "Panturrilha com pausa", "Panturrilha explosiva"],
        tips: "Controle a fase negativa",
      },
    ],
  },
  5: {
    // Sexta-feira
    title: "Sexta-feira - QUADRÍCEPS E POSTERIOR",
    description: "Repetição do treino de segunda. Mantenha a intensidade e foque na progressão.",
    exercises: [
      {
        name: "Agachamento no Smith",
        reps: "4/12",
        variations: ["Agachamento livre", "Agachamento búlgaro", "Agachamento sumô"],
        tips: "Mantenha o core contraído e desça até 90 graus",
      },
      {
        name: "Afundo",
        reps: "3/10",
        variations: ["Afundo caminhando", "Afundo reverso", "Afundo lateral"],
        tips: "Mantenha o tronco ereto e o joelho alinhado",
      },
      {
        name: "Cadeira Extensora - Drop Set",
        reps: "4/8-12-15-20",
        variations: ["Extensora unilateral", "Extensora com pausa"],
        tips: "Execute o drop set sem descanso entre as repetições",
      },
      {
        name: "Leg Press",
        reps: "4/12",
        variations: ["Leg press 45°", "Leg press horizontal", "Leg press unilateral"],
        tips: "Posicione os pés na largura dos ombros",
      },
      {
        name: "Cadeira Flexora",
        reps: "4/12",
        variations: ["Flexora deitado", "Flexora em pé", "Flexora unilateral"],
        tips: "Controle a fase excêntrica do movimento",
      },
      {
        name: "Stiff Unilateral",
        reps: "3/10",
        variations: ["Stiff com barra", "Stiff com halteres", "Stiff romeno"],
        tips: "Mantenha a coluna neutra e sinta o alongamento",
      },
    ],
  },
  6: {
    // Sábado
    title: "Sábado - GLÚTEO E ABDOMEN",
    description: "Treino de glúteos e core. Finalize a semana com foco na estabilização.",
    exercises: [
      {
        name: "Mobilidade",
        reps: "5 min",
        variations: ["Alongamento dinâmico", "Ativação glútea", "Mobilidade de quadril"],
        tips: "Prepare bem a musculatura antes do treino",
      },
      {
        name: "Elevação Pélvica",
        reps: "4/12",
        variations: ["Elevação unilateral", "Elevação com peso", "Elevação com pausa"],
        tips: "Contraia bem os glúteos no topo do movimento",
      },
      {
        name: "Búlgaro",
        reps: "4/10",
        variations: ["Búlgaro com halteres", "Búlgaro com barra", "Búlgaro lateral"],
        tips: "Mantenha o peso na perna da frente",
      },
      {
        name: "Agachamento Sumô",
        reps: "3/15",
        variations: ["Sumô com peso", "Sumô pliométrico", "Sumô com pausa"],
        tips: "Pés mais afastados, pontas voltadas para fora",
      },
      {
        name: "Coice Cruzado na Polia",
        reps: "3/15",
        variations: ["Coice reto", "Coice lateral", "Coice com caneleira"],
        tips: "Mantenha o core estável durante o movimento",
      },
      {
        name: "Cadeira Abdutora - Drop Set",
        reps: "3/10-12-15-20",
        variations: ["Abdutora em pé", "Abdutora com elástico", "Abdutora unilateral"],
        tips: "Execute sem descanso entre as cargas",
      },
      {
        name: "Abdominal Remador",
        reps: "3/12",
        variations: ["Remador com peso", "Remador isométrico", "Remador alternado"],
        tips: "Mantenha as pernas estendidas e contraia o abdome",
      },
      {
        name: "Prancha",
        reps: "3x até a falha",
        variations: ["Prancha lateral", "Prancha com elevação", "Prancha dinâmica"],
        tips: "Mantenha o corpo alinhado da cabeça aos pés",
      },
      {
        name: "Abdominal Bicicleta",
        reps: "3/30",
        variations: ["Bicicleta lenta", "Bicicleta rápida", "Bicicleta com peso"],
        tips: "Alterne os cotovelos tocando os joelhos opostos",
      },
      {
        name: "Abdominal Oblíquo Tocando os Pés",
        reps: "2/30",
        variations: ["Oblíquo lateral", "Oblíquo com peso", "Oblíquo isométrico"],
        tips: "Mantenha as pernas estendidas e toque os pés alternadamente",
      },
      {
        name: "Abdominal Infra",
        reps: "3/15",
        variations: ["Infra com peso", "Infra na barra", "Infra isométrico"],
        tips: "Eleve as pernas controladamente sem balançar",
      },
    ],
  },
}

// Variáveis globais
let currentDay = new Date().getDay()
let workoutStarted = false
let timerInterval

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
})

function initializeApp() {
  loadWorkout(currentDay)
  updateDayButtons()
}

function setupEventListeners() {
  // Botões dos dias da semana
  document.querySelectorAll(".day-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const day = Number.parseInt(this.dataset.day)
      currentDay = day
      loadWorkout(day)
      updateDayButtons()
    })
  })

  // Botão iniciar treino
  document.getElementById("start-workout").addEventListener("click", startWorkout)

  // Botão de descanso
  document.getElementById("rest-timer").addEventListener("click", startRestTimer)

  // Botão cancelar timer
  document.getElementById("cancel-timer").addEventListener("click", cancelTimer)
}

function loadWorkout(day) {
  const workout = workoutData[day]
  const container = document.getElementById("exercises-container")

  // Atualizar título e descrição
  document.getElementById("workout-title").textContent = workout.title
  document.getElementById("workout-description").textContent = workout.description

  // Limpar container
  container.innerHTML = ""

  if (workout.isRestDay) {
    container.innerHTML = `
            <div class="rest-day">
                <h2>🏖️ Dia de Descanso</h2>
                <p>Aproveite para relaxar, fazer alongamentos leves ou uma caminhada.</p>
                <p>A recuperação é tão importante quanto o treino!</p>
            </div>
        `
    document.getElementById("start-workout").style.display = "none"
    return
  }

  document.getElementById("start-workout").style.display = "block"

  // Criar exercícios
  workout.exercises.forEach((exercise, index) => {
    const exerciseElement = createExerciseElement(exercise, index)
    container.appendChild(exerciseElement)
  })
}

function createExerciseElement(exercise, index) {
  const div = document.createElement("div")
  div.className = "exercise-item"
  div.innerHTML = `
        <div class="exercise-header" onclick="toggleExerciseDetails(${index})">
            <div class="exercise-name">${exercise.name}</div>
            <div class="exercise-reps">${exercise.reps}</div>
            <div class="expand-arrow" id="arrow-${index}">▼</div>
        </div>
        <div class="exercise-details" id="details-${index}">
            <div class="exercise-image">🏋️</div>
            <div class="exercise-tips">
                <strong>Dica:</strong> ${exercise.tips}
            </div>
            <div class="exercise-variations">
                <h4>Variações:</h4>
                <ul>
                    ${exercise.variations.map((variation) => `<li>${variation}</li>`).join("")}
                </ul>
            </div>
        </div>
    `
  return div
}

function toggleExerciseDetails(index) {
  const details = document.getElementById(`details-${index}`)
  const arrow = document.getElementById(`arrow-${index}`)

  if (details.classList.contains("expanded")) {
    details.classList.remove("expanded")
    arrow.classList.remove("expanded")
  } else {
    details.classList.add("expanded")
    arrow.classList.add("expanded")
  }
}

function updateDayButtons() {
  document.querySelectorAll(".day-btn").forEach((btn) => {
    btn.classList.remove("active")
    if (Number.parseInt(btn.dataset.day) === currentDay) {
      btn.classList.add("active")
    }
  })
}

function startWorkout() {
  if (!workoutStarted) {
    workoutStarted = true
    document.getElementById("start-workout").textContent = "Treino Iniciado"
    document.getElementById("start-workout").style.background = "#38a169"
    document.getElementById("rest-timer").style.display = "inline-block"

    // Contagem regressiva inicial
    showTimer("Preparando para o treino...", 3, () => {
      alert("Bom treino! 💪")
    })
  }
}

function startRestTimer() {
  showTimer("Tempo de descanso", 60, () => {
    alert("Descanso terminado! Próxima série! 🔥")
  })
}

function showTimer(title, seconds, callback) {
  const modal = document.getElementById("timer-modal")
  const titleElement = document.getElementById("timer-title")
  const displayElement = document.getElementById("timer-display")

  titleElement.textContent = title
  displayElement.textContent = seconds
  modal.style.display = "flex"

  let timeLeft = seconds

  timerInterval = setInterval(() => {
    timeLeft--
    displayElement.textContent = timeLeft

    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      modal.style.display = "none"
      if (callback) callback()
    }
  }, 1000)
}

function cancelTimer() {
  clearInterval(timerInterval)
  document.getElementById("timer-modal").style.display = "none"
}
