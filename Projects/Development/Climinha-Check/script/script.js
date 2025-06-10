// Seleciona o botão "Sim" e seu elemento pai (o link)
const btnSim = document.getElementById("sim");
const linkSim = btnSim.parentElement;

// Flag para controlar se os foguinhos animados já estão ativos
let foguinhosAtivos = false;

// Função para criar uma explosão de fogos animados no botão "Sim"
function criarExplosao() {
  const fogo = document.createElement("div");
  fogo.classList.add("explosao");
  fogo.textContent = "🔥";

  // Calcula a posição inicial (centro do botão)
  const rect = btnSim.getBoundingClientRect();
  fogo.style.left = rect.left + rect.width / 2 + "px";
  fogo.style.top = rect.top + rect.height / 2 + "px";

  // Define deslocamento aleatório para cada fogo
  const offsetX = (Math.random() - 0.5) * 200 + "px";
  const offsetY = (Math.random() - 0.5) * 200 + "px";
  fogo.style.setProperty("--x", offsetX);
  fogo.style.setProperty("--y", offsetY);

  // Adiciona na tela e remove após 800ms
  document.body.appendChild(fogo);
  setTimeout(() => fogo.remove(), 800);
}

// Função para criar foguinhos aleatórios na tela
function criarFoguinho() {
  const fogo = document.createElement("div");
  fogo.classList.add("foguinho");
  fogo.textContent = "🔥";

  // Define posição e tamanho aleatório
  fogo.style.left = Math.random() * 100 + "vw";
  fogo.style.top = Math.random() * 100 + "vh";
  fogo.style.fontSize = Math.random() * 20 + 20 + "px";

  // Adiciona e remove após 2 segundos
  document.body.appendChild(fogo);
  setTimeout(() => fogo.remove(), 2000);
}

// Evento de clique no botão "Sim"
btnSim.addEventListener("click", (e) => {
  e.preventDefault();

  // Cria 20 explosões
  for (let i = 0; i < 20; i++) {
    criarExplosao();
  }

  // Inicia foguinhos flutuantes se ainda não estiverem ativos
  if (!foguinhosAtivos) {
    foguinhosAtivos = true;
    setInterval(criarFoguinho, 150);
  }

  // Redireciona após 2.5 segundos
  setTimeout(() => {
    window.location.href = linkSim.href;
  }, 2500);
});


// Seleciona o botão "Não"
const btnNao = document.getElementById("nao");
let primeiroClique = true;

// Evento de clique no botão "Não"
btnNao.addEventListener("click", () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const botaoWidth = btnNao.offsetWidth;
  const botaoHeight = btnNao.offsetHeight;

  // Define margem de segurança (em pixels)
  const margem = 20;

  // Calcula os limites para manter o botão dentro da tela
  const maxX = viewportWidth - botaoWidth - margem;
  const maxY = viewportHeight - botaoHeight - margem;
  const minX = margem;
  const minY = margem;

  if (primeiroClique) {
    // No primeiro clique, fixa a posição e move um pouco pra baixo
    btnNao.style.position = "fixed";
    btnNao.style.top = btnNao.offsetTop + 70 + "px";
    btnNao.style.left = btnNao.offsetLeft + "px";
    primeiroClique = false;
  } else {
    // Gera posição aleatória respeitando os limites
    const aleatorioX = Math.floor(Math.random() * (maxX - minX) + minX);
    const aleatorioY = Math.floor(Math.random() * (maxY - minY) + minY);

    btnNao.style.left = `${aleatorioX}px`;
    btnNao.style.top = `${aleatorioY}px`;
  }
});
