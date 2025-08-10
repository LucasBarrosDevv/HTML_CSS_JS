let jogadores = new Set();
let isShuffling = false;

// Inicializa a página
document.addEventListener('DOMContentLoaded', function () {
    atualizarListaJogadores();
    document.getElementById('shuffleBtn').addEventListener('click', sortearEquipes);
    document.getElementById('username').addEventListener('keypress', handleKeyPress);
    document.querySelector('.btn-primary').addEventListener('click', cadastrarJogador);
});

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // evita quebra de linha
        cadastrarJogador();
    }
}

function cadastrarJogador() {
    const input = document.getElementById('username');
    const nomesBrutos = input.value.trim();

    

    // Suporte a nomes separados por linha, vírgula ou ponto e vírgula
    const nomes = nomesBrutos
        .split(/\r?\n|,|;/)
        .map(nome => limparNome(nome));

    let adicionados = 0;
    nomes.forEach(nome => {
        if (nome && !jogadores.has(nome)) {
            jogadores.add(nome);
            adicionados++;
        }
    });

    if (adicionados > 0) {
        atualizarListaJogadores();
    } 

    input.value = '';
}

function limparNome(nome) {
    return nome
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '') // remove emojis
        .replace(/[^\p{L}\p{N} ]+/gu, '') // remove símbolos
        .replace(/\s+/g, ' ')             // múltiplos espaços
        .trim();
}

function atualizarListaJogadores() {
    const lista = document.getElementById('listaJogadores');
    const playerCount = document.getElementById('playerCount');

    lista.innerHTML = '';
    playerCount.textContent = jogadores.size;

    if (jogadores.size === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #64748b; padding: 1rem;">Nenhum jogador inscrito</p>';
        return;
    }

    Array.from(jogadores).forEach((jogador, i) => {
        const div = document.createElement('div');
        div.className = 'player-item fade-in';
        div.innerHTML = `
            <span class="player-number">${i + 1}</span>
            <span style="color: #e2e8f0; font-weight: 500;">${jogador}</span>
        `;
        lista.appendChild(div);
    });
}

async function sortearEquipes() {
    const total = jogadores.size;

    if (total < 2) {
        alert("É necessário pelo menos 2 jogadores (1 em cada time) para sortear.");
        return;
    }

    if (isShuffling) return;

    isShuffling = true;

    const shuffleBtn = document.getElementById('shuffleBtn');
    const shuffleIcon = document.getElementById('shuffleIcon');
    const shuffleText = document.getElementById('shuffleText');

    // Atualiza UI para estado de sorteio
    shuffleBtn.disabled = true;
    shuffleIcon.classList.add('spinning');
    shuffleText.textContent = 'Sorteando...';

    // Aguarda animação
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Embaralha todos os jogadores
    const todos = Array.from(jogadores);
    embaralharArray(todos);

    // Limita o sorteio a 8 jogadores (4 por time)
    const selecionados = todos.slice(0, 8);

    // Divide em dois times balanceados
    const metade = Math.ceil(selecionados.length / 2);
    const timeA = selecionados.slice(0, metade);
    const timeB = selecionados.slice(metade);

    // Exibe na interface
    exibirTimes(timeA, timeB);

    // Restaura estado do botão
    isShuffling = false;
    shuffleBtn.disabled = false;
    shuffleIcon.classList.remove('spinning');
    shuffleText.textContent = 'Sortear Equipes';

    // Troca telas
    document.getElementById('waitingState').style.display = 'none';
    document.getElementById('teamsContainer').style.display = 'grid';
}


function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function exibirTimes(timeA, timeB) {
    const ulA = document.getElementById('timeA');
    const ulB = document.getElementById('timeB');

    ulA.innerHTML = '';
    ulB.innerHTML = '';

    timeA.forEach((jogador, index) => {
        const div = document.createElement('div');
        div.className = 'team-member fade-in';
        div.innerHTML = `
            <span class="member-number">${index + 1}</span>
            <span style="color: white; font-weight: 600;">${jogador}</span>
        `;
        ulA.appendChild(div);
    });

    for (let i = timeA.length; i < 4; i++) {
        const div = document.createElement('div');
        div.className = 'empty-slot';
        
        ulA.appendChild(div);
    }

    timeB.forEach((jogador, index) => {
        const div = document.createElement('div');
        div.className = 'team-member fade-in';
        div.innerHTML = `
            <span class="member-number">${index + 1}</span>
            <span style="color: white; font-weight: 600;">${jogador}</span>
        `;
        ulB.appendChild(div);
    });

    for (let i = timeB.length; i < 4; i++) {
        const div = document.createElement('div');
        div.className = 'empty-slot';
        
        ulB.appendChild(div);
    }
}
