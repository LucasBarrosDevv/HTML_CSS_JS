 // Workout data
        const workoutData = [
            {
                day: 'Domingo',
                title: 'DESCANSO',
                exercises: [],
                focus: 'Recuperação e Mobilidade',
                
            },
            {
                day: 'Segunda-feira',
                title: 'QUADRÍCEPS / POSTERIOR',
                exercises: [
                    {
                        name: 'Agachamento no Smith',
                        sets: '4/12',
                        details: 'Exercício fundamental para quadríceps e glúteos',
                        variations: ['Smith tradicional', 'Smith com pausa', 'Smith sumô'],
                        tips: ['Mantenha o core contraído', 'Desça até 90 graus', 'Controle a descida']
                    },
                    {
                        name: 'Afundo',
                        sets: '3/10',
                        details: 'Trabalha quadríceps, glúteos e estabilização',
                        variations: ['Afundo estático', 'Afundo caminhando', 'Afundo búlgaro'],
                        tips: ['Não deixe o joelho passar da ponta do pé', 'Mantenha o tronco ereto']
                    },
                    {
                        name: 'Cadeira Extensora - Drop Set',
                        sets: '4/8-12-15-20',
                        details: 'Isolamento do quadríceps com técnica avançada',
                        variations: ['Unilateral', 'Bilateral', 'Com pausa'],
                        tips: ['Execute a descida controlada', 'Pare apenas para reduzir peso']
                    },
                    {
                        name: 'Leg Press',
                        sets: '4/12',
                        details: 'Exercício composto para membros inferiores',
                        variations: ['Pés altos', 'Pés baixos', 'Pegada estreita'],
                        tips: ['Não destrave completamente', 'Amplitude total do movimento']
                    },
                    {
                        name: 'Cadeira Flexora',
                        sets: '4/12',
                        details: 'Isolamento dos isquiotibiais',
                        variations: ['Sentada', 'Deitada', 'Em pé'],
                        tips: ['Controle a fase excêntrica', 'Não balance o corpo']
                    },
                    {
                        name: 'Stiff Unilateral',
                        sets: '3/10',
                        details: 'Trabalha posterior e glúteos unilateralmente',
                        variations: ['Com halteres', 'Com barra', 'Com kettlebell'],
                        tips: ['Mantenha a coluna neutra', 'Sinta o alongamento do posterior']
                    }
                ],
                focus: 'Força e Hipertrofia',
                duration: '1h 15m',
                difficulty: 'Moderada-Alta'
            },
            {
                day: 'Terça-feira',
                title: 'TRÍCEPS / OMBRO / PANTURRILHA',
                exercises: [
                    {
                        name: 'Elevação Lateral',
                        sets: '3/15',
                        details: 'Isolamento do deltóide medial',
                        variations: ['Com halteres', 'Na polia', 'Sentado'],
                        tips: ['Controle o movimento', 'Não balance o corpo', 'Foque na contração']
                    },
                    {
                        name: 'Puxada na Polia com Corda',
                        sets: '4/12',
                        details: 'Trabalha tríceps com ênfase na cabeça lateral',
                        variations: ['Corda', 'Barra reta', 'Barra W'],
                        tips: ['Mantenha os cotovelos fixos', 'Abra a corda na descida']
                    },
                    {
                        name: 'Tríceps na Polia com Barra',
                        sets: '3/10',
                        details: 'Isolamento do tríceps com barra',
                        variations: ['Barra reta', 'Barra W', 'Pegada inversa'],
                        tips: ['Cotovelos colados ao corpo', 'Extensão completa']
                    },
                    {
                        name: 'Tríceps Francês',
                        sets: '4/12',
                        details: 'Trabalha principalmente a cabeça longa do tríceps',
                        variations: ['Deitado', 'Sentado', 'Em pé'],
                        tips: ['Mantenha os cotovelos fixos', 'Amplitude total']
                    },
                    {
                        name: 'Desenvolvimento',
                        sets: '4/10',
                        details: 'Exercício composto para ombros',
                        variations: ['Militar', 'Com halteres', 'Atrás da cabeça'],
                        tips: ['Core contraído', 'Trajetória vertical', 'Não hiperextenda a lombar']
                    },
                    {
                        name: 'Panturrilha na Cadeira',
                        sets: '3/15',
                        details: 'Trabalha o sóleo (panturrilha profunda)',
                        variations: ['Sentada', 'Unilateral', 'Com pausa'],
                        tips: ['Amplitude total', 'Pausa de 1s no topo', 'Descida controlada']
                    },
                    {
                        name: 'Panturrilha no Leg Horizontal',
                        sets: '3/15',
                        details: 'Trabalha gastrocnêmio e sóleo',
                        variations: ['Bilateral', 'Unilateral', 'Pés para dentro/fora'],
                        tips: ['Pés na ponta da plataforma', 'Máxima amplitude']
                    }
                ],
                focus: 'Definição e Força',
                duration: '1h 10m',
                difficulty: 'Moderada'
            },
            {
                day: 'Quarta-feira',
                title: 'GLÚTEOS ISOLADO',
                exercises: [
                    {
                        name: 'Mobilidade',
                        sets: '10 min',
                        details: 'Aquecimento e preparação articular',
                        variations: ['Dinâmica', 'Estática', 'Ativação glútea'],
                        tips: ['Movimentos lentos', 'Foque na qualidade', 'Ative os glúteos']
                    },
                    {
                        name: 'Elevação Pélvica',
                        sets: '4/12',
                        details: 'Ativação e fortalecimento dos glúteos',
                        variations: ['Bilateral', 'Unilateral', 'Com peso'],
                        tips: ['Aperte os glúteos no topo', 'Mantenha quadril alinhado']
                    },
                    {
                        name: 'Búlgaro',
                        sets: '4/10',
                        details: 'Exercício unilateral para glúteos e quadríceps',
                        variations: ['Com halteres', 'Com barra', 'Peso corporal'],
                        tips: ['Perna traseira apenas para apoio', 'Foque na perna da frente']
                    },
                    {
                        name: 'Stiff na Barra',
                        sets: '4/12',
                        details: 'Trabalha glúteos e isquiotibiais',
                        variations: ['Tradicional', 'Sumô', 'Com pause'],
                        tips: ['Quadril para trás', 'Barra próxima ao corpo', 'Coluna neutra']
                    },
                    {
                        name: 'Levantamento Terra',
                        sets: '4/12',
                        details: 'Movimento fundamental para glúteos e posterior',
                        variations: ['Convencional', 'Sumô', 'Trap bar'],
                        tips: ['Ative os glúteos', 'Empurre o chão com os pés', 'Core contraído']
                    },
                    {
                        name: 'Agachamento Sumô',
                        sets: '3/15',
                        details: 'Variação que enfatiza glúteos e adutores',
                        variations: ['Peso corporal', 'Com halter', 'Com kettlebell'],
                        tips: ['Pés bem abertos', 'Pontas para fora', 'Desça entre as pernas']
                    },
                    {
                        name: 'Coice Cruzado na Polia',
                        sets: '3/15',
                        details: 'Isolamento do glúteo médio',
                        variations: ['Cruzado', 'Lateral', 'Para trás'],
                        tips: ['Movimento controlado', 'Foque no glúteo que trabalha']
                    },
                    {
                        name: 'Cadeira Abdutora - Drop Set',
                        sets: '3/10-12-15-20',
                        details: 'Isolamento do glúteo médio com técnica avançada',
                        variations: ['Sentada', 'Deitada', 'Em pé'],
                        tips: ['Controle a volta', 'Pause no topo', 'Reduza peso gradativamente']
                    }
                ],
                focus: 'Hipertrofia Glútea',
                duration: '1h 20m',
                difficulty: 'Moderada-Alta'
            },
            {
                day: 'Quinta-feira',
                title: 'COSTA / BÍCEPS',
                exercises: [
                    {
                        name: 'Puxada Aberta',
                        sets: '4/12',
                        details: 'Trabalha latíssimo do dorso e redondo maior',
                        variations: ['Pegada aberta', 'Pegada fechada', 'Neutro'],
                        tips: ['Abra o peito', 'Puxe com os cotovelos', 'Aperte as escápulas']
                    },
                    {
                        name: 'Remada Baixa',
                        sets: '3/12',
                        details: 'Trabalha meio trapézio e romboides',
                        variations: ['Triangular', 'Barra', 'Unilateral'],
                        tips: ['Mantenha a postura ereta', 'Puxe em direção ao abdômen']
                    },
                    {
                        name: 'Crucifixo Inverso',
                        sets: '3/12',
                        details: 'Trabalha deltóide posterior',
                        variations: ['Inclinado', 'Na polia', 'Sentado'],
                        tips: ['Braços semi-flexionados', 'Movimento amplo', 'Controle a volta']
                    },
                    {
                        name: 'Elevação Lateral na Polia',
                        sets: '3/10',
                        details: 'Isolamento do deltóide posterior na polia',
                        variations: ['Unilateral', 'Bilateral', 'Com cabo'],
                        tips: ['Cotovelo alto', 'Puxe para trás e para cima']
                    },
                    {
                        name: 'Rosca Alternada',
                        sets: '3/15',
                        details: 'Trabalha bíceps de forma unilateral',
                        variations: ['Em pé', 'Sentado', 'Martelo'],
                        tips: ['Não balance o corpo', 'Controle a descida', 'Cotovelos fixos']
                    },
                    {
                        name: 'Rosca Martelo Alternada no Banco',
                        sets: '3/12',
                        details: 'Enfatiza bíceps braquial e braquiorradial',
                        variations: ['Alternada', 'Simultânea', 'Com cabo'],
                        tips: ['Pegada neutra', 'Movimento controlado', 'Core contraído']
                    },
                    {
                        name: 'Rosca com Corda no Cross',
                        sets: '3/10',
                        details: 'Isolamento do bíceps com cabo',
                        variations: ['Corda', 'Barra', 'Unilateral'],
                        tips: ['Cotovelos fixos', 'Contraia o bíceps no topo']
                    },
                    {
                        name: 'Panturrilha no Leg',
                        sets: '4/15',
                        details: 'Trabalha gastrocnêmio com joelhos estendidos',
                        variations: ['Bilateral', 'Unilateral', 'Pés paralelos'],
                        tips: ['Amplitude total', 'Pausa no topo', 'Não rebote']
                    },
                    {
                        name: 'Panturrilha no Leg Horizontal',
                        sets: '4/15',
                        details: 'Variação para trabalhar diferentes ângulos',
                        variations: ['Pés paralelos', 'Pés para fora', 'Para dentro'],
                        tips: ['Pés na borda', 'Máxima amplitude', 'Contração forte']
                    }
                ],
                focus: 'Força e Definição',
                duration: '1h 25m',
                difficulty: 'Moderada-Alta'
            },
            {
                day: 'Sexta-feira',
                title: 'QUADRÍCEPS / POSTERIOR',
                exercises: [
                    {
                        name: 'Agachamento no Smith',
                        sets: '4/12',
                        details: 'Exercício fundamental para quadríceps e glúteos',
                        variations: ['Smith tradicional', 'Smith com pausa', 'Smith sumô'],
                        tips: ['Mantenha o core contraído', 'Desça até 90 graus', 'Controle a descida']
                    },
                    {
                        name: 'Afundo',
                        sets: '3/10',
                        details: 'Trabalha quadríceps, glúteos e estabilização',
                        variations: ['Afundo estático', 'Afundo caminhando', 'Afundo búlgaro'],
                        tips: ['Não deixe o joelho passar da ponta do pé', 'Mantenha o tronco ereto']
                    },
                    {
                        name: 'Cadeira Extensora - Drop Set',
                        sets: '4/8-12-15-20',
                        details: 'Isolamento do quadríceps com técnica avançada',
                        variations: ['Unilateral', 'Bilateral', 'Com pausa'],
                        tips: ['Execute a descida controlada', 'Pare apenas para reduzir peso']
                    },
                    {
                        name: 'Leg Press',
                        sets: '4/12',
                        details: 'Exercício composto para membros inferiores',
                        variations: ['Pés altos', 'Pés baixos', 'Pegada estreita'],
                        tips: ['Não destrave completamente', 'Amplitude total do movimento']
                    },
                    {
                        name: 'Cadeira Flexora',
                        sets: '4/12',
                        details: 'Isolamento dos isquiotibiais',
                        variations: ['Sentada', 'Deitada', 'Em pé'],
                        tips: ['Controle a fase excêntrica', 'Não balance o corpo']
                    },
                    {
                        name: 'Stiff Unilateral',
                        sets: '3/10',
                        details: 'Trabalha posterior e glúteos unilateralmente',
                        variations: ['Com halteres', 'Com barra', 'Com kettlebell'],
                        tips: ['Mantenha a coluna neutra', 'Sinta o alongamento do posterior']
                    }
                ],
                focus: 'Força e Hipertrofia',
                duration: '1h 15m',
                difficulty: 'Moderada-Alta'
            },
            {
                day: 'Sábado',
                title: 'GLÚTEO / ABDÔMEN',
                exercises: [
                    {
                        name: 'Mobilidade',
                        sets: '10 min',
                        details: 'Aquecimento e preparação articular',
                        variations: ['Dinâmica', 'Estática', 'Ativação glútea'],
                        tips: ['Movimentos lentos', 'Foque na qualidade', 'Ative os glúteos']
                    },
                    {
                        name: 'Elevação Pélvica',
                        sets: '4/12',
                        details: 'Ativação e fortalecimento dos glúteos',
                        variations: ['Bilateral', 'Unilateral', 'Com peso'],
                        tips: ['Aperte os glúteos no topo', 'Mantenha quadril alinhado']
                    },
                    {
                        name: 'Búlgaro',
                        sets: '4/10',
                        details: 'Exercício unilateral para glúteos e quadríceps',
                        variations: ['Com halteres', 'Com barra', 'Peso corporal'],
                        tips: ['Perna traseira apenas para apoio', 'Foque na perna da frente']
                    },
                    {
                        name: 'Agachamento Sumô',
                        sets: '3/15',
                        details: 'Variação que enfatiza glúteos e adutores',
                        variations: ['Peso corporal', 'Com halter', 'Com kettlebell'],
                        tips: ['Pés bem abertos', 'Pontas para fora', 'Desça entre as pernas']
                    },
                    {
                        name: 'Coice Cruzado na Polia',
                        sets: '3/15',
                        details: 'Isolamento do glúteo médio',
                        variations: ['Cruzado', 'Lateral', 'Para trás'],
                        tips: ['Movimento controlado', 'Foque no glúteo que trabalha']
                    },
                    {
                        name: 'Cadeira Abdutora - Drop Set',
                        sets: '3/10-12-15-20',
                        details: 'Isolamento do glúteo médio com técnica avançada',
                        variations: ['Sentada', 'Deitada', 'Em pé'],
                        tips: ['Controle a volta', 'Pause no topo', 'Reduza peso gradativamente']
                    },
                    {
                        name: 'Abdominal Remador',
                        sets: '3/12',
                        details: 'Trabalha reto abdominal e core',
                        variations: ['Tradicional', 'Com peso', 'Isométrico'],
                        tips: ['Não puxe o pescoço', 'Contraia o abdômen', 'Movimento controlado']
                    },
                    {
                        name: 'Prancha',
                        sets: '3x até a falha',
                        details: 'Fortalecimento isométrico do core',
                        variations: ['Tradicional', 'Lateral', 'Com elevação'],
                        tips: ['Corpo alinhado', 'Core contraído', 'Respiração controlada']
                    },
                    {
                        name: 'Abdominal Bicicleta',
                        sets: '3/30',
                        details: 'Trabalha oblíquos e reto abdominal',
                        variations: ['Tradicional', 'Lento', 'Com peso'],
                        tips: ['Movimento alternado', 'Toque cotovelo-joelho', 'Não force o pescoço']
                    },
                    {
                        name: 'Abdominal Oblíquo Tocando os Pés',
                        sets: '2/30',
                        details: 'Isolamento dos oblíquos',
                        variations: ['Alternado', 'Simultâneo', 'Com peso'],
                        tips: ['Flexão lateral', 'Toque o tornozelo', 'Movimento controlado']
                    },
                    {
                        name: 'Abdominal Infra',
                        sets: '3/15',
                        details: 'Trabalha a parte inferior do reto abdominal',
                        variations: ['Elevação de pernas', 'Bicicleta inversa', 'Tesoura'],
                        tips: ['Não balance', 'Controle a descida', 'Lombar no chão']
                    }
                ],
                focus: 'Glúteos e Core',
                duration: '1h 10m',
                difficulty: 'Moderada'
            }
        ];

        // Global variables
        let currentDay = 0;
        let selectedExercise = null;
        let isWorkoutActive = false;
        let workoutTimer = 0;
        let restTimer = 0;
        let isResting = false;
        let workoutInterval = null;
        let restInterval = null;

        // Initialize app
        function init() {
            const today = new Date().getDay();
            currentDay = today;
            renderDayButtons();
            renderWorkoutCard();
            renderExercisesList();
            setupEventListeners();
        }

        // Render day navigation buttons
        function renderDayButtons() {
    const dayButtons = document.getElementById('dayButtons');
    dayButtons.innerHTML = '';

    const daysToShow = [];

    // Adiciona o dia anterior (se existir)
    if (currentDay > 0) {
        daysToShow.push({ ...workoutData[currentDay - 1], index: currentDay - 1 });
    }

    // Adiciona o dia atual
    daysToShow.push({ ...workoutData[currentDay], index: currentDay });

    // Adiciona o próximo dia (se existir)
    if (currentDay < workoutData.length - 1) {
        daysToShow.push({ ...workoutData[currentDay + 1], index: currentDay + 1 });
    }

    daysToShow.forEach((workout) => {
        const button = document.createElement('button');
        button.className = `day-btn ${workout.index === currentDay ? 'active' : ''}`;
        button.textContent = workout.day.slice(0, 3);
        button.onclick = () => setCurrentDay(workout.index);

        // Adiciona a classe "faded" para os dias anterior e próximo
        if (workout.index !== currentDay) {
            button.classList.add('faded');
        }

        dayButtons.appendChild(button);
    });
}
function setCurrentDay(dayIndex) {
    currentDay = dayIndex;
    renderDayButtons();
    renderWorkoutCard();
    renderExercisesList();
}

        // Set current day
        function setCurrentDay(dayIndex) {
            currentDay = dayIndex;
            renderDayButtons();
            renderWorkoutCard();
            renderExercisesList();
        }

        // Render workout info card
       // ... (código existente da função) ...

function renderWorkoutCard() {
    const workoutCard = document.getElementById('workoutCard');
    const currentWorkout = workoutData[currentDay];
    
    // Inicia com o HTML base, sem a parte de estatísticas
    let statsHtml = '';

    // Verifica se o dia atual é de descanso
    if (currentWorkout.exercises.length === 0) {
        // Se for descanso, exibe apenas a informação de Foco
        statsHtml = `
            <div class="workout-stats">
                <div class="stat-item">
                    <p>Foco</p>
                    <p>${currentWorkout.focus}</p>
                </div>
            </div>
        `;
    } else {
        // Se não for descanso, exibe as informações de Foco e Tempo Estimado
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
        `;
    }

    workoutCard.innerHTML = `
        <div class="workout-header">
            <div class="workout-title">
                <h3>${currentWorkout.title}</h3>
            </div>
            </div>
        ${statsHtml}
    `;
}

// ... (resto do código) ...

        // Render exercises list
       // ... (código existente da função) ...

function renderExercisesList() {
    const exercisesList = document.getElementById('exercisesList');
    const timerControls = document.querySelector('.timer-controls');
    const currentWorkout = workoutData[currentDay];
    
    if (currentWorkout.exercises.length === 0) {
        exercisesList.innerHTML = `
            <div class="rest-day">
                <div class="emoji">🧘‍♀️</div>
                <h3>Dia de Descanso</h3>
                <p>Aproveite para recuperar, alongar e preparar o corpo para os próximos treinos.</p>
            </div>
        `;
        // Esconde os cronômetros no dia de descanso
        if (timerControls) {
            timerControls.style.display = 'none';
        }
        return;
    }
    
    // Mostra os cronômetros nos outros dias
    if (timerControls) {
        timerControls.style.display = 'block'; // ou 'flex', dependendo do seu CSS
    }

    exercisesList.innerHTML = '';
    currentWorkout.exercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.className = 'exercise-item';
        // Adicione o evento de clique aqui
        exerciseItem.onclick = () => openModal(index);
        exerciseItem.innerHTML = `
            <div class="exercise-content">
                <div class="exercise-name">${exercise.name}</div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <span class="exercise-sets">${exercise.sets}</span>
                </div>
            </div>
        `;
        exercisesList.appendChild(exerciseItem);
    });
}
        // Setup event listeners
        function setupEventListeners() {
            document.getElementById('startBtn').onclick = startWorkout;
            document.getElementById('pauseBtn').onclick = pauseWorkout;
            document.getElementById('resetBtn').onclick = resetWorkout;
        }

        // Timer functions
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        function startWorkout() {
            isWorkoutActive = true;
            document.getElementById('startBtn').style.display = 'none';
            document.getElementById('pauseBtn').style.display = 'flex';
            
            workoutInterval = setInterval(() => {
                if (!isResting) {
                    workoutTimer++;
                    document.getElementById('workoutTimer').textContent = formatTime(workoutTimer);
                }
            }, 1000);
        }

        function pauseWorkout() {
            isWorkoutActive = false;
            document.getElementById('startBtn').style.display = 'flex';
            document.getElementById('pauseBtn').style.display = 'none';
            
            if (workoutInterval) {
                clearInterval(workoutInterval);
                workoutInterval = null;
            }
        }

       function resetWorkout() {
 const confirmationModal = document.getElementById('confirmationModal');
 const confirmResetBtn = document.getElementById('confirmResetBtn');
 const cancelResetBtn = document.getElementById('cancelResetBtn');
 const modalBackdrop = document.getElementById('modalBackdrop');

 // Mostra o modal e o backdrop
 confirmationModal.style.display = 'block';
 modalBackdrop.style.display = 'block';

 // Remove os event listeners anteriores para evitar múltiplos eventos
 confirmResetBtn.onclick = null;
 cancelResetBtn.onclick = null;

 // Event listener para o botão "Sim, Resetar"
 confirmResetBtn.onclick = function() {
  isWorkoutActive = false;
  workoutTimer = 0;
  isResting = false;
  restTimer = 0;

  document.getElementById('startBtn').style.display = 'flex';
  document.getElementById('pauseBtn').style.display = 'none';
  document.getElementById('workoutTimer').textContent = '00:00';
  document.getElementById('restTimer').style.display = 'none';

  if (workoutInterval) {
   clearInterval(workoutInterval);
   workoutInterval = null;
  }
  if (restInterval) {
   clearInterval(restInterval);
   restInterval = null;
  }

  // Esconde o modal e o backdrop após a confirmação
  confirmationModal.style.display = 'none';
  modalBackdrop.style.display = 'none';
 };

 // Event listener para o botão "Cancelar"
 cancelResetBtn.onclick = function() {
  // Esconde o modal e o backdrop se o usuário cancelar
  confirmationModal.style.display = 'none';
  modalBackdrop.style.display = 'none';
 };

 // Opcional: Fechar o modal se o usuário clicar fora dele (no backdrop)
 modalBackdrop.onclick = function() {
  confirmationModal.style.display = 'none';
  modalBackdrop.style.display = 'none';
 };
}

        function startRest(duration) {
            isResting = true;
            restTimer = duration;
            document.getElementById('restTimer').style.display = 'block';
            document.getElementById('restDisplay').textContent = formatTime(restTimer);
            
            restInterval = setInterval(() => {
                restTimer--;
                document.getElementById('restDisplay').textContent = formatTime(restTimer);
                
                if (restTimer <= 0) {
                    isResting = false;
                    document.getElementById('restTimer').style.display = 'none';
                    clearInterval(restInterval);
                    restInterval = null;
                }
            }, 1000);
        }

        // Modal functions
        function openModal(exerciseIndex) {
            const currentWorkout = workoutData[currentDay];
            const exercise = currentWorkout.exercises[exerciseIndex];
            selectedExercise = exercise;
            
            document.getElementById('modalTitle').textContent = exercise.name;
            
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="exercise-description">
                    <div class="exercise-image">
                        <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" stroke-width="2">
                            <path d="m6.5 6.5 11 11"/>
                            <path d="m21 21-1-1"/>
                            <path d="m3 3 1 1"/>
                            <path d="m18 22 4-4"/>
                            <path d="m2 6 4-4"/>
                            <path d="m3 10 7-7"/>
                            <path d="m14 21 7-7"/>
                        </svg>
                    </div>
                    <p>${exercise.details}</p>
                </div>
                
                ${exercise.variations ? `
                    <div class="variations">
                        <h4>
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12,6 L12,12 L16,14"/>
                            </svg>
                            Variações
                        </h4>
                        <ul>
                            ${exercise.variations.map(variation => `<li>${variation}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${exercise.tips ? `
                    <div class="tips">
                        <h4>Dicas</h4>
                        <ul>
                            ${exercise.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            `;
            
            document.getElementById('exerciseModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('exerciseModal').classList.remove('active');
            selectedExercise = null;
        }

        // Close modal when clicking outside
        document.getElementById('exerciseModal').onclick = function(e) {
            if (e.target === this) {
                closeModal();
            }
        };

        // Initialize app when page loads
        document.addEventListener('DOMContentLoaded', init);