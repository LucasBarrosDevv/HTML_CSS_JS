// Workout data
const workoutData = [
  {
    day: "Domingo",
    title: "DESCANSO",
    focus: "Recuperação e Mobilidade",
  },
  {
    day: "Segunda-feira",
    title: "QUADRÍCEPS / POSTERIOR",
    exercises: [
      {
        name: "Agachamento no Smith",
        sets: "4/12",
        details: "Exercício fundamental para quadríceps e glúteos",
        variations: ["Smith tradicional", "Smith com pausa", "Smith sumô"],
        tips: ["Mantenha o core contraído", "Desça até 90 graus", "Controle a descida"],
        image:
          "https://img.freepik.com/vetores-premium/homem-realizando-exercicio-de-agachamento-com-barra-para-treinamento-de-forca-em-ilustracao-vetorial-de-ginastica_126712-40199.jpg",
          completed: false
      },
      {
        name: "Afundo",
        sets: "3/10",
        details: "Trabalha quadríceps, glúteos e estabilização",
        variations: ["Afundo estático", "Afundo caminhando", "Afundo búlgaro"],
        tips: ["Não deixe o joelho passar da ponta do pé", "Mantenha o tronco ereto"],
        image:
          "https://img.freepik.com/vetores-premium/jovem-bela-jovem-em-roupas-esportivas-fazendo-alongamento-em-pe-na-frente-da-janela-no-ginasio_667085-355.jpg?semt=ais_hybrid&w=740&q=80",
          completed: false
      },
      {
        name: "Cadeira Extensora - Drop Set",
        sets: "4/8-12-15-20",
        details: "Isolamento do quadríceps com técnica avançada",
        variations: ["Unilateral", "Bilateral", "Com pausa"],
        tips: ["Execute a descida controlada", "Pare apenas para reduzir peso"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwaW0OGgOw_ucZAkU_lCIOAAT904BSxnPxwQ&s",
        completed: false
      },
      {
        name: "Leg Press",
        sets: "4/12",
        details: "Exercício composto para membros inferiores",
        variations: ["Pés altos", "Pés baixos", "Pegada estreita"],
        tips: ["Não destrave completamente", "Amplitude total do movimento"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/t1/17582392-mulher-fazendo-exercicio-leg-press-na-maquina-ilustracaoial-plana-isolada-no-fundo-branco-vetor.jpg",
          completed: false
      },
      {
        name: "Cadeira Flexora",
        sets: "4/12",
        details: "Isolamento dos isquiotibiais",
        variations: ["Sentada", "Deitada", "Em pé"],
        tips: ["Controle a fase excêntrica", "Não balance o corpo"],
        image: "https://static.wixstatic.com/media/52de9e_dbd28b649d4e4f53b88a622126ab7358.gif",
        completed: false
      },
      {
        name: "Stiff Unilateral",
        sets: "3/10",
        details: "Trabalha posterior e glúteos unilateralmente",
        variations: ["Com halteres", "Com barra", "Com kettlebell"],
        tips: ["Mantenha a coluna neutra", "Sinta o alongamento do posterior"],
        image: "https://vitat.com.br/wp-content/uploads/2024/04/stiff-unilateral-1.jpg",
        completed: false
      },
    ],
    focus: "Força e Hipertrofia",
    duration: "1h 15m",
    difficulty: "Moderada-Alta",
  },
  {
    day: "Terça-feira",
    title: "TRÍCEPS / OMBRO / PANTURRILHA",
    exercises: [
      {
        name: "Elevação Lateral",
        sets: "3/15",
        details: "Isolamento do deltóide medial",
        variations: ["Com halteres", "Na polia", "Sentado"],
        tips: ["Controle o movimento", "Não balance o corpo", "Foque na contração"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/p1/16138026-mulher-fazendo-exercicio-de-elevacao-lateral-ou-lateral-de-braco-duplo-levante-ambos-os-bracos-lateralmente-ate-a-horizontal-ilustracaoial-plana-isolada-no-fundo-branco-vetor.jpg",
          completed: false
      },
      {
        name: "Puxada na Polia com Corda",
        sets: "4/12",
        details: "Trabalha tríceps com ênfase na cabeça lateral",
        variations: ["Corda", "Barra reta", "Barra W"],
        tips: ["Mantenha os cotovelos fixos", "Abra a corda na descida"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/p1/8056918-homem-fazendo-corda-puxada-exercicio-plano-ilustracao-isolado-em-fundo-branco-vetor.jpg",
        completed: false
      },
      {
        name: "Tríceps na Polia com Barra",
        sets: "3/10",
        details: "Isolamento do tríceps com barra",
        variations: ["Barra reta", "Barra W", "Pegada inversa"],
        tips: ["Cotovelos colados ao corpo", "Extensão completa"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/p1/16138035-mulher-fazendo-cabo-corda-triceps-puxar-para-baixo-ou-empurrar-o-exercicio-ilustracaoial-plana-isolada-no-fundo-branco-vetor.jpg",
        completed: false
      },
      {
        name: "Tríceps Francês",
        sets: "4/12",
        details: "Trabalha principalmente a cabeça longa do tríceps",
        variations: ["Deitado", "Sentado", "Em pé"],
        tips: ["Mantenha os cotovelos fixos", "Amplitude total"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/p1/6417641-mulher-fazendo-sentado-tricep-press-overhead-extensions-exercise-flat-vector-illustration-isolated-on-white-background-vetor.jpg",
        completed: false
      },
      {
        name: "Desenvolvimento",
        sets: "4/10",
        details: "Exercício composto para ombros",
        variations: ["Militar", "Com halteres", "Atrás da cabeça"],
        tips: ["Core contraído", "Trajetória vertical", "Não hiperextenda a lombar"],
        image:
          "https://thumbs.dreamstime.com/b/homem-fazer-exerc%C3%ADcio-de-press%C3%A3o-no-ombro-vetor-plano-ilustra%C3%A7%C3%A3o-isolada-em-fundo-branco-conjunto-caracteres-treinamento-234336805.jpg",
        completed: false
      },
      {
        name: "Panturrilha na Cadeira",
        sets: "3/15",
        details: "Trabalha o sóleo (panturrilha profunda)",
        variations: ["Sentada", "Unilateral", "Com pausa"],
        tips: ["Amplitude total", "Pausa de 1s no topo", "Descida controlada"],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5OA7S3Id2vur16AuZi3O2TfHD0YYoyR2SvyRteKDb7Um7Kli9kh-3GBqG_2w4kQejEvs&usqp=CAU",
        completed: false
      },
      {
        name: "Panturrilha no Leg Horizontal",
        sets: "3/15",
        details: "Trabalha gastrocnêmio e sóleo",
        variations: ["Bilateral", "Unilateral", "Pés para dentro/fora"],
        tips: ["Pés na ponta da plataforma", "Máxima amplitude"],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ4o-R_CrdbJkpVnP7pPCrJxY4D8pA22VedA&s",
        completed: false
      },
    ],
    focus: "Definição e Força",
    duration: "1h 10m",
    difficulty: "Moderada",
  },
  {
    day: "Quarta-feira",
    title: "GLÚTEOS ISOLADO",
    exercises: [
      {
        name: "Mobilidade",
        sets: "10 min",
        details: "Aquecimento e preparação articular",
        variations: ["Dinâmica", "Estática", "Ativação glútea"],
        tips: ["Movimentos lentos", "Foque na qualidade", "Ative os glúteos"],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPkAXpQiy_0chr4ORY_3KsIM6kbp7UtqUpw&s",
        completed: false
      },
      {
        name: "Elevação Pélvica",
        sets: "4/12",
        details: "Ativação e fortalecimento dos glúteos",
        variations: ["Bilateral", "Unilateral", "Com peso"],
        tips: ["Aperte os glúteos no topo", "Mantenha quadril alinhado"],
        image:
          "https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2022/10/18/744334979-nanda2.jpg",
        completed: false
      },
      {
        name: "Búlgaro",
        sets: "4/10",
        details: "Exercício unilateral para glúteos e quadríceps",
        variations: ["Com halteres", "Com barra", "Peso corporal"],
        tips: ["Perna traseira apenas para apoio", "Foque na perna da frente"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/p1/8484312-mulher-fazendo-barbell-bulgaro-split-squat-exercise-flat-vector-illustration-isolated-on-white-background-vetor.jpg",
        completed: false
      },
      {
        name: "Stiff na Barra",
        sets: "4/12",
        details: "Trabalha glúteos e isquiotibiais",
        variations: ["Tradicional", "Sumô", "Com pause"],
        tips: ["Quadril para trás", "Barra próxima ao corpo", "Coluna neutra"],
        image:
          "https://blog.esportudo.com/hs-fs/hubfs/Levantamento_stiff-wh.jpg?width=320&name=Levantamento_stiff-wh.jpg",
        completed: false
      },
      {
        name: "Levantamento Terra",
        sets: "4/12",
        details: "Movimento fundamental para glúteos e posterior",
        variations: ["Convencional", "Sumô", "Trap bar"],
        tips: ["Ative os glúteos", "Empurre o chão com os pés", "Core contraído"],
        image:
          "https://static.vecteezy.com/ti/vetor-gratis/p1/6417721-homem-fazendo-sumo-barbell-deadlifts-exercicio-plano-ilustracao-isolado-em-fundo-branco-vetor.jpg",
        completed: false
      },
      {
        name: "Agachamento Sumô",
        sets: "3/15",
        details: "Variação que enfatiza glúteos e adutores",
        variations: ["Peso corporal", "Com halter", "Com kettlebell"],
        tips: ["Pés bem abertos", "Pontas para fora", "Desça entre as pernas"],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFsVw2YkN3BCRk2Y1cxgUshXFXPreuSnCbw&s",
        completed: false
      },
      {
        name: "Coice Cruzado na Polia",
        sets: "3/15",
        details: "Isolamento do glúteo médio",
        variations: ["Cruzado", "Lateral", "Para trás"],
        tips: ["Movimento controlado", "Foque no glúteo que trabalha"],
        image:
          "https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/coice-no-cabo.gif",
        completed: false
      },
      {
        name: "Cadeira Abdutora - Drop Set",
        sets: "3/10-12-15-20",
        details: "Isolamento do glúteo médio com técnica avançada",
        variations: ["Sentada", "Deitada", "Em pé"],
        tips: ["Controle a volta", "Pause no topo", "Reduza peso gradativamente"],
        image:
          "https://i.pinimg.com/736x/0c/58/b9/0c58b9e0d276042d7012b59b59905d4a.jpg",
        completed: false
      },
    ],
    focus: "Hipertrofia Glútea",
    duration: "1h 20m",
    difficulty: "Moderada-Alta",
  },
  {
    day: "Quinta-feira",
    title: "COSTA / BÍCEPS",
    exercises: [
      {
        name: "Puxada Aberta",
        sets: "4/12",
        details: "Trabalha latíssimo do dorso e redondo maior",
        variations: ["Pegada aberta", "Pegada fechada", "Neutro"],
        tips: ["Abra o peito", "Puxe com os cotovelos", "Aperte as escápulas"],
        image:
          "",
        completed: false
      },
      {
        name: "Remada Baixa",
        sets: "3/12",
        details: "Trabalha meio trapézio e romboides",
        variations: ["Triangular", "Barra", "Unilateral"],
        tips: ["Mantenha a postura ereta", "Puxe em direção ao abdômen"],
        image:
          "",
        completed: false
      },
      {
        name: "Crucifixo Inverso",
        sets: "3/12",
        details: "Trabalha deltóide posterior",
        variations: ["Inclinado", "Na polia", "Sentado"],
        tips: ["Braços semi-flexionados", "Movimento amplo", "Controle a volta"],
        image:
          "",
        completed: false
      },
      {
        name: "Elevação Lateral na Polia",
        sets: "3/10",
        details: "Isolamento do deltóide posterior na polia",
        variations: ["Unilateral", "Bilateral", "Com cabo"],
        tips: ["Cotovelo alto", "Puxe para trás e para cima"],
        image:
          "",
        completed: false
      },
      {
        name: "Rosca Alternada",
        sets: "3/15",
        details: "Trabalha bíceps de forma unilateral",
        variations: ["Em pé", "Sentado", "Martelo"],
        tips: ["Não balance o corpo", "Controle a descida", "Cotovelos fixos"],
        image:
          "",
        completed: false
      },
      {
        name: "Rosca Martelo Alternada no Banco",
        sets: "3/12",
        details: "Enfatiza bíceps braquial e braquiorradial",
        variations: ["Alternada", "Simultânea", "Com cabo"],
        tips: ["Pegada neutra", "Movimento controlado", "Core contraído"],
        image:
          "",
        completed: false
      },
      {
        name: "Rosca com Corda no Cross",
        sets: "3/10",
        details: "Isolamento do bíceps com cabo",
        variations: ["Corda", "Barra", "Unilateral"],
        tips: ["Cotovelos fixos", "Contraia o bíceps no topo"],
        image:
          "",
        completed: false
      },
      {
        name: "Panturrilha no Leg",
        sets: "4/15",
        details: "Trabalha gastrocnêmio com joelhos estendidos",
        variations: ["Bilateral", "Unilateral", "Pés paralelos"],
        tips: ["Amplitude total", "Pausa no topo", "Não rebote"],
        image:
          "",
        completed: false
      },
      {
        name: "Panturrilha no Leg Horizontal",
        sets: "4/15",
        details: "Variação para trabalhar diferentes ângulos",
        variations: ["Pés paralelos", "Pés para fora", "Para dentro"],
        tips: ["Pés na borda", "Máxima amplitude", "Contração forte"],
        image:
          "",
      },
    ],
    focus: "Força e Definição",
    duration: "1h 25m",
    difficulty: "Moderada-Alta",
  },
  {
    day: "Sexta-feira",
    title: "QUADRÍCEPS / POSTERIOR",
    exercises: [
      {
        name: "Agachamento no Smith",
        sets: "4/12",
        details: "Exercício fundamental para quadríceps e glúteos",
        variations: ["Smith tradicional", "Smith com pausa", "Smith sumô"],
        tips: ["Mantenha o core contraído", "Desça até 90 graus", "Controle a descida"],
        image:
          "",
        completed: false
      },
      {
        name: "Afundo",
        sets: "3/10",
        details: "Trabalha quadríceps, glúteos e estabilização",
        variations: ["Afundo estático", "Afundo caminhando", "Afundo búlgaro"],
        tips: ["Não deixe o joelho passar da ponta do pé", "Mantenha o tronco ereto"],
        image:
          "",
        completed: false
      },
      {
        name: "Cadeira Extensora - Drop Set",
        sets: "4/8-12-15-20",
        details: "Isolamento do quadríceps com técnica avançada",
        variations: ["Unilateral", "Bilateral", "Com pausa"],
        tips: ["Execute a descida controlada", "Pare apenas para reduzir peso"],
        image:
          "",
        completed: false
      },
      {
        name: "Leg Press",
        sets: "4/12",
        details: "Exercício composto para membros inferiores",
        variations: ["Pés altos", "Pés baixos", "Pegada estreita"],
        tips: ["Não destrave completamente", "Amplitude total do movimento"],
        image:
          "",
        completed: false
      },
      {
        name: "Cadeira Flexora",
        sets: "4/12",
        details: "Isolamento dos isquiotibiais",
        variations: ["Sentada", "Deitada", "Em pé"],
        tips: ["Controle a fase excêntrica", "Não balance o corpo"],
        image:
          "",
        completed: false
      },
      {
        name: "Stiff Unilateral",
        sets: "3/10",
        details: "Trabalha posterior e glúteos unilateralmente",
        variations: ["Com halteres", "Com barra", "Com kettlebell"],
        tips: ["Mantenha a coluna neutra", "Sinta o alongamento do posterior"],
        image:
          "",
        completed: false
      },
    ],
    focus: "Força e Hipertrofia",
    duration: "1h 15m",
    difficulty: "Moderada-Alta",
  },
  {
    day: "Sábado",
    title: "GLÚTEO / ABDÔMEN",
    exercises: [
      {
        name: "Mobilidade",
        sets: "10 min",
        details: "Aquecimento e preparação articular",
        variations: ["Dinâmica", "Estática", "Ativação glútea"],
        tips: ["Movimentos lentos", "Foque na qualidade", "Ative os glúteos"],
        image:
          "",
        completed: false
      },
      {
        name: "Elevação Pélvica",
        sets: "4/12",
        details: "Ativação e fortalecimento dos glúteos",
        variations: ["Bilateral", "Unilateral", "Com peso"],
        tips: ["Aperte os glúteos no topo", "Mantenha quadril alinhado"],
        image:
          "",
        completed: false
      },
      {
        name: "Búlgaro",
        sets: "4/10",
        details: "Exercício unilateral para glúteos e quadríceps",
        variations: ["Com halteres", "Com barra", "Peso corporal"],
        tips: ["Perna traseira apenas para apoio", "Foque na perna da frente"],
        image:
          "",
        completed: false
      },
      
      {
        name: "Agachamento Sumô",
        sets: "3/15",
        details: "Variação que enfatiza glúteos e adutores",
        variations: ["Peso corporal", "Com halter", "Com kettlebell"],
        tips: ["Pés bem abertos", "Pontas para fora", "Desça entre as pernas"],
        image:
          "",
        completed: false
      },
      {
        name: "Coice Cruzado na Polia",
        sets: "3/15",
        details: "Isolamento do glúteo médio",
        variations: ["Cruzado", "Lateral", "Para trás"],
        tips: ["Movimento controlado", "Foque no glúteo que trabalha"],
        image:
          "",
        completed: false
      },
      {
        name: "Cadeira Abdutora - Drop Set",
        sets: "3/10-12-15-20",
        details: "Isolamento do glúteo médio com técnica avançada",
        variations: ["Sentada", "Deitada", "Em pé"],
        tips: ["Controle a volta", "Pause no topo", "Reduza peso gradativamente"],
        image:
          "",
        completed: false
      },
      {
        name: "Abdominal Remador",
        sets: "3/12",
        details: "Trabalha reto abdominal e core",
        variations: ["Tradicional", "Com peso", "Isométrico"],
        tips: ["Não puxe o pescoço", "Contraia o abdômen", "Movimento controlado"],
        image:
          "",
      },
      {
        name: "Prancha",
        sets: "3x até a falha",
        details: "Fortalecimento isométrico do core",
        variations: ["Tradicional", "Lateral", "Com elevação"],
        tips: ["Corpo alinhado", "Core contraído", "Respiração controlada"],
        image:
          "",
        completed: false
      },
      {
        name: "Abdominal Bicicleta",
        sets: "3/30",
        details: "Trabalha oblíquos e reto abdominal",
        variations: ["Tradicional", "Lento", "Com peso"],
        tips: ["Movimento alternado", "Toque cotovelo-joelho", "Não force o pescoço"],
        image:
          "",
        completed: false
      },
      {
        name: "Abdominal Oblíquo Tocando os Pés",
        sets: "2/30",
        details: "Isolamento dos oblíquos",
        variations: ["Alternado", "Simultâneo", "Com peso"],
        tips: ["Flexão lateral", "Toque o tornozelo", "Movimento controlado"],
        image:
          "",
        completed: false
      },
      
      {
        name: "Abdominal Infra",
        sets: "3/15",
        details: "Trabalha a parte inferior do reto abdominal",
        variations: ["Elevação de pernas", "Bicicleta inversa", "Tesoura"],
        tips: ["Não balance", "Controle a descida", "Lombar no chão"],
        image:
          "",
        completed: false
      },
      
    ],
    focus: "Glúteos e Core",
    duration: "1h 10m",
    difficulty: "Moderada",
  },
]

// Global variables
let currentDay = 0
let selectedExercise = null
let isWorkoutActive = false
let workoutTimer = 0
let restTimer = 0
let isResting = false
let workoutInterval = null
let restInterval = null

// Initialize app with animations
function init() {
  const today = new Date().getDay()
  currentDay = today

  // Add staggered animations to initial load
  setTimeout(() => renderDayButtons(), 100)
  setTimeout(() => renderWorkoutCard(), 200)
  setTimeout(() => renderExercisesList(), 300)
  setTimeout(() => setupEventListeners(), 400)

  // Add entrance animations to elements
  addEntranceAnimations()
}

// Add entrance animations
function addEntranceAnimations() {
  const elements = document.querySelectorAll(".container > *")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"

    setTimeout(() => {
      element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Render day navigation buttons with animations
function renderDayButtons() {
  const dayButtons = document.getElementById("dayButtons")
  dayButtons.innerHTML = ""

  const daysToShow = []

  // Adiciona o dia anterior (se existir)
  if (currentDay > 0) {
    daysToShow.push({ ...workoutData[currentDay - 1], index: currentDay - 1 })
  }

  // Adiciona o dia atual
  daysToShow.push({ ...workoutData[currentDay], index: currentDay })

  // Adiciona o próximo dia (se existir)
  if (currentDay < workoutData.length - 1) {
    daysToShow.push({ ...workoutData[currentDay + 1], index: currentDay + 1 })
  }

  daysToShow.forEach((workout, buttonIndex) => {
    const button = document.createElement("button")
    button.className = `day-btn ${workout.index === currentDay ? "active" : ""}`
    button.textContent = workout.day.slice(0, 3)
    button.onclick = () => setCurrentDay(workout.index)

    // Adiciona a classe "faded" para os dias anterior e próximo
    if (workout.index !== currentDay) {
      button.classList.add("faded")
    }

    

    setTimeout(() => {
      button.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      button.style.opacity = "1"
      button.style.transform = "scale(1)"
    }, buttonIndex * 100)

    dayButtons.appendChild(button)
  })
}

// Enhanced setCurrentDay with directional transitions for the content
function setCurrentDay(dayIndex) {
    if (dayIndex === currentDay) return;

    const workoutCard = document.getElementById("workoutCard");
    const exercisesList = document.getElementById("exercisesList");

    // Determine the slide direction
    const isGoingForward = dayIndex > currentDay;

    // Apply the exit animation in the correct direction
    if (isGoingForward) {
        workoutCard.classList.add("slide-leave-left");
        exercisesList.classList.add("slide-leave-left");
    } else {
        workoutCard.classList.add("slide-leave-right");
        exercisesList.classList.add("slide-leave-right");
    }

    // Wait for the exit animation to finish
    setTimeout(() => {
        // Remove the exit animation classes
        workoutCard.classList.remove("slide-leave-left", "slide-leave-right");
        exercisesList.classList.remove("slide-leave-left", "slide-leave-right");

        // Update content for the new day
        currentDay = dayIndex;
        renderDayButtons();
        renderWorkoutCard();
        renderExercisesList();

        // Apply the entrance animation in the correct direction
        if (isGoingForward) {
            workoutCard.classList.add("slide-enter-right");
            exercisesList.classList.add("slide-enter-right");
        } else {
            workoutCard.classList.add("slide-enter-left");
            exercisesList.classList.add("slide-enter-left");
        }

        // Remove the entrance animation classes after the animation
        setTimeout(() => {
            workoutCard.classList.remove("slide-enter-right", "slide-enter-left");
            exercisesList.classList.remove("slide-enter-right", "slide-enter-left");
        }, 500); // The same animation time
    }, 500); // The same animation time
}

// Enhanced renderWorkoutCard with animations
function renderWorkoutCard() {
  const workoutCard = document.getElementById("workoutCard")
  const currentWorkout = workoutData[currentDay]

  let statsHtml = ""

  if (currentWorkout.exercises.length === 0) {
    statsHtml = `
            <div class="workout-stats">
                <div class="stat-item">
                    <p>Foco</p>
                    <p>${currentWorkout.focus}</p>
                </div>
            </div>
        `
  } else {
    statsHtml = `
            <div class="workout-stats">
                <div class="stat-item">
                    <p>Foco</p>
                    <p>${currentWorkout.focus}</p>
                </div>
                <div class="stat-item">
                    <p>Tempo Estimado</p>
                    <p>${currentWorkout.duration}</p>
                </div>
            </div>
        `
  }

  workoutCard.innerHTML = `
        <div class="workout-header">
            <div class="workout-title">
                <h3>${currentWorkout.title}</h3>
            </div>
        </div>
        ${statsHtml}
    `

  // Animate stat items
  const statItems = workoutCard.querySelectorAll(".stat-item")
  statItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"

    setTimeout(() => {
      item.style.transition = "all 0.5s ease"
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Enhanced renderExercisesList with staggered animations
function renderExercisesList() {
  const exercisesList = document.getElementById("exercisesList");
  const timerControls = document.querySelector(".timer-controls");
  const currentWorkout = workoutData[currentDay];

  if (currentWorkout.exercises.length === 0) {
    // ... (código existente)
    return;
  }

  // ... (código existente)

  exercisesList.innerHTML = "";

  currentWorkout.exercises.forEach((exercise, index) => {
    const exerciseItem = document.createElement("div");
    exerciseItem.className = `exercise-item ${exercise.completed ? "completed" : ""}`;

    exerciseItem.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <div class="exercise-content">
                <div class="exercise-name">${exercise.name}</div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <span class="exercise-sets">${exercise.sets}</span>
                </div>
            </div>
            <div class="exercise-marker ${exercise.completed ? "checked" : ""}" data-index="${index}"></div>
        </div>
    `;

    // Adicione um evento de clique ao marcador
    const marker = exerciseItem.querySelector(".exercise-marker");
    marker.onclick = (e) => {
      e.stopPropagation(); // Previne que o clique no marcador acione o modal
      toggleExerciseCompletion(index);
    };

    // Adicione o evento de clique para abrir o modal no resto do item
    exerciseItem.onclick = () => openModal(index);

    // ... (código de animação existente)

    exercisesList.appendChild(exerciseItem);
  });
}
function toggleExerciseCompletion(exerciseIndex) {
  const currentWorkout = workoutData[currentDay];
  currentWorkout.exercises[exerciseIndex].completed = !currentWorkout.exercises[exerciseIndex].completed;
  renderExercisesList(); // Renderiza a lista novamente para atualizar a visualização
}
// Setup event listeners
function setupEventListeners() {
  document.getElementById("startBtn").onclick = startWorkout
  document.getElementById("pauseBtn").onclick = pauseWorkout
  document.getElementById("resetBtn").onclick = resetWorkout
}

// Timer functions with enhanced animations
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

function startWorkout() {
  isWorkoutActive = true
  const startBtn = document.getElementById("startBtn")
  const pauseBtn = document.getElementById("pauseBtn")

  // Animate button transition
  startBtn.style.transform = "scale(0.9)"
  setTimeout(() => {
    startBtn.style.display = "none"
    pauseBtn.style.display = "flex"
    pauseBtn.style.transform = "scale(0.9)"
    setTimeout(() => {
      pauseBtn.style.transform = "scale(1)"
    }, 100)
  }, 150)

  workoutInterval = setInterval(() => {
    if (!isResting) {
      workoutTimer++
      const timerDisplay = document.getElementById("workoutTimer")
      timerDisplay.textContent = formatTime(workoutTimer)

      // Add pulse animation every 10 seconds
      if (workoutTimer % 10 === 0) {
        timerDisplay.style.transform = "scale(1.1)"
        setTimeout(() => {
          timerDisplay.style.transform = "scale(1)"
        }, 200)
      }
    }
  }, 1000)
}

function pauseWorkout() {
  isWorkoutActive = false
  const startBtn = document.getElementById("startBtn")
  const pauseBtn = document.getElementById("pauseBtn")

  // Animate button transition
  pauseBtn.style.transform = "scale(0.9)"
  setTimeout(() => {
    pauseBtn.style.display = "none"
    startBtn.style.display = "flex"
    startBtn.style.transform = "scale(0.9)"
    setTimeout(() => {
      startBtn.style.transform = "scale(1)"
    }, 100)
  }, 150)

  if (workoutInterval) {
    clearInterval(workoutInterval)
    workoutInterval = null
  }
}

function resetWorkout() {
  const confirmationModal = document.getElementById("confirmationModal")
  const confirmResetBtn = document.getElementById("confirmResetBtn")
  const cancelResetBtn = document.getElementById("cancelResetBtn")
  const modalBackdrop = document.getElementById("modalBackdrop")

  // Show modal with animation
  confirmationModal.style.display = "block"
  modalBackdrop.style.display = "block"

  // Animate modal entrance
  const modalContent = confirmationModal.querySelector(".modal-content")
  modalContent.style.transform = "translate(-50%, -50%) scale(0.8)"
  modalContent.style.opacity = "0"

  setTimeout(() => {
    modalContent.style.transition = "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    modalContent.style.transform = "translate(-50%, -50%) scale(1)"
    modalContent.style.opacity = "1"
  }, 50)

  confirmResetBtn.onclick = null
  cancelResetBtn.onclick = null

  confirmResetBtn.onclick = () => {
    // Add reset animation
    const timerDisplay = document.getElementById("workoutTimer")
    timerDisplay.style.transform = "scale(0.8)"
    timerDisplay.style.opacity = "0.5"

    setTimeout(() => {
      isWorkoutActive = false
      workoutTimer = 0
      isResting = false
      restTimer = 0

      document.getElementById("startBtn").style.display = "flex"
      document.getElementById("pauseBtn").style.display = "none"
      timerDisplay.textContent = "00:00"
      timerDisplay.style.transform = "scale(1)"
      timerDisplay.style.opacity = "1"
      document.getElementById("restTimer").style.display = "none"

      if (workoutInterval) {
        clearInterval(workoutInterval)
        workoutInterval = null
      }
      if (restInterval) {
        clearInterval(restInterval)
        restInterval = null
      }
    }, 200)

    hideModal(confirmationModal, modalBackdrop)
  }

  cancelResetBtn.onclick = () => {
    hideModal(confirmationModal, modalBackdrop)
  }

  modalBackdrop.onclick = () => {
    hideModal(confirmationModal, modalBackdrop)
  }
}

function hideModal(modal, backdrop) {
  const modalContent = modal.querySelector(".modal-content")
  modalContent.style.transform = "translate(-50%, -50%) scale(0.8)"
  modalContent.style.opacity = "0"

  setTimeout(() => {
    modal.style.display = "none"
    backdrop.style.display = "none"
  }, 300)
}

function startRest(duration) {
  isResting = true
  restTimer = duration
  const restTimerElement = document.getElementById("restTimer")
  const restDisplay = document.getElementById("restDisplay")

  // Animate rest timer appearance
  restTimerElement.style.display = "block"
  restTimerElement.style.opacity = "0"
  restTimerElement.style.transform = "translateY(20px)"

  setTimeout(() => {
    restTimerElement.style.transition = "all 0.4s ease"
    restTimerElement.style.opacity = "1"
    restTimerElement.style.transform = "translateY(0)"
  }, 50)

  restDisplay.textContent = formatTime(restTimer)

  restInterval = setInterval(() => {
    restTimer--
    restDisplay.textContent = formatTime(restTimer)

    // Add warning animation when time is running out
    if (restTimer <= 10 && restTimer > 0) {
      restDisplay.style.color = "#ef4444"
      restDisplay.style.transform = "scale(1.1)"
      setTimeout(() => {
        restDisplay.style.transform = "scale(1)"
      }, 200)
    }

    if (restTimer <= 0) {
      isResting = false

      // Animate rest timer disappearance
      restTimerElement.style.opacity = "0"
      restTimerElement.style.transform = "translateY(-20px)"

      setTimeout(() => {
        restTimerElement.style.display = "none"
        restDisplay.style.color = "#fdba74"
      }, 400)

      clearInterval(restInterval)
      restInterval = null

      // Show completion notification
      showRestCompleteNotification()
    }
  }, 1000)
}

function showRestCompleteNotification() {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    `
  notification.textContent = "✅ Descanso concluído!"

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 400)
  }, 3000)
}

// Enhanced modal functions
function openModal(exerciseIndex) {
  const currentWorkout = workoutData[currentDay]
  const exercise = currentWorkout.exercises[exerciseIndex]
  selectedExercise = exercise

  document.getElementById("modalTitle").textContent = exercise.name

  const modalContent = document.getElementById("modalContent")
  modalContent.innerHTML = `
        <div class="exercise-description">
            <div class="exercise-image">
                ${exercise.image ? `<img src="${exercise.image}" alt="Imagem do exercício ${exercise.name}" style="width: 100%; height: auto; border-radius: 8px;">` : `<svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" stroke-width="2">...</svg>`}
            </div>
            <p>${exercise.details}</p>
        </div>
        
        ${
          exercise.variations
            ? `
            <div class="variations">
                <h4>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12,6 L12,12 L16,14"/>
                    </svg>
                    Variações
                </h4>
                <ul>
                    ${exercise.variations.map((variation) => `<li>${variation}</li>`).join("")}
                </ul>
            </div>
        `
            : ""
        }
        
        ${
          exercise.tips
            ? `
            <div class="tips">
                <h4>Dicas</h4>
                <ul>
                    ${exercise.tips.map((tip) => `<li>${tip}</li>`).join("")}
                </ul>
            </div>
        `
            : ""
        }
    `

  const modal = document.getElementById("exerciseModal")
  modal.classList.add("active")

  // Animate modal content
  const sections = modalContent.querySelectorAll(".exercise-description, .variations, .tips")
  sections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"

    setTimeout(() => {
      section.style.transition = "all 0.4s ease"
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }, index * 100)
  })
}

function closeModal() {
  const modal = document.getElementById("exerciseModal")
  const modalContentElement = modal.querySelector(".modal-content")

  // Animate modal close
  modalContentElement.style.transform = "translate(-50%, -50%) scale(0.8)"
  modalContentElement.style.opacity = "0"

  setTimeout(() => {
    modal.classList.remove("active")
    selectedExercise = null

    // Reset modal content transform
    setTimeout(() => {
      modalContentElement.style.transform = "translate(-50%, -50%) scale(1)"
      modalContentElement.style.opacity = "1"
    }, 100)
  }, 300)
}

// Close modal when clicking outside
document.getElementById("exerciseModal").onclick = function (e) {
  if (e.target === this) {
    closeModal()
  }
}

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal.active")
    if (activeModal) {
      closeModal()
    }
  }

  if (e.key === "ArrowLeft" && currentDay > 0) {
    setCurrentDay(currentDay - 1)
  }

  if (e.key === "ArrowRight" && currentDay < workoutData.length - 1) {
    setCurrentDay(currentDay + 1)
  }
})

// Initialize app when page loads
document.addEventListener("DOMContentLoaded", init)

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth"

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = document.querySelectorAll(".exercise-item, .stat-item, .btn")
  elementsToObserve.forEach((el) => {
    observer.observe(el)
  })
})

// Habilita o modo tela cheia ao tocar na tela
document.documentElement.addEventListener('touchstart', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro ao tentar entrar em tela cheia: ${err.message}`);
        });
    }
});