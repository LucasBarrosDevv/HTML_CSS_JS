const loginDiv = document.getElementById('login');
const menuDiv = document.getElementById('menu');
const criacaoDiv = document.getElementById('criacao');
const salaDiv = document.getElementById('sala');
const nomeUsuarioSpan = document.getElementById('nomeUsuario');

let nome = localStorage.getItem('nomeUsuario');
let jogadoresSala = [];

if (nome) {
  mostrarMenu(nome);
}

function salvarUsuario() {
  const input = document.getElementById('userInput');
  const valor = input.value.trim();
  if (valor) {
    localStorage.setItem('nomeUsuario', valor);
    mostrarMenu(valor);
  }
}

function mostrarMenu(nome) {
  loginDiv.classList.add('hidden');
  menuDiv.classList.remove('hidden');
  nomeUsuarioSpan.textContent = nome;
}

function abrirCriacao() {
  menuDiv.classList.add('hidden');
  criacaoDiv.classList.remove('hidden');
}

function validarCodigo() {
  const codigo = document.getElementById('codigoInput').value;
  if (codigo === '1234') {
    criacaoDiv.classList.add('hidden');
    salaDiv.classList.remove('hidden');
  } else {
    alert('Código inválido');
  }
}

function entrarNaSala() {
  const nome = localStorage.getItem('nomeUsuario');
  if (!jogadoresSala.includes(nome)) {
    jogadoresSala.push(nome);
    atualizarLista();
  }
}

function atualizarLista() {
  const ul = document.getElementById('listaJogadores');
  ul.innerHTML = '';
  jogadoresSala.forEach(j => {
    const li = document.createElement('li');
    li.textContent = j;
    ul.appendChild(li);
  });
}

function sortearTimes() {
  if (jogadoresSala.length < 8) {
    alert('É necessário no mínimo 8 jogadores.');
    return;
  }

  const sorteados = jogadoresSala.slice();
  sorteados.sort(() => Math.random() - 0.5);
  const timeA = sorteados.slice(0, 4);
  const timeB = sorteados.slice(4, 8);

  document.getElementById('resultadoTimes').classList.remove('hidden');

  const ulA = document.getElementById('timeA');
  const ulB = document.getElementById('timeB');
  ulA.innerHTML = '';
  ulB.innerHTML = '';

  timeA.forEach(j => {
    const li = document.createElement('li');
    li.textContent = j;
    ulA.appendChild(li);
  });

  timeB.forEach(j => {
    const li = document.createElement('li');
    li.textContent = j;
    ulB.appendChild(li);
  });
}
