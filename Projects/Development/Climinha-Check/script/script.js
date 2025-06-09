 
 
const btnSim = document.getElementById("sim");
const linkSim = btnSim.parentElement; // <a> que envolve o botão

let foguinhosAtivos = false;

btnSim.addEventListener("click", (e) => {
  e.preventDefault(); // impede o link de abrir imediatamente

  // Criar explosão de foguinhos (seu código original)
  for (let i = 0; i < 20; i++) {
    const fogo = document.createElement("div");
    fogo.classList.add("explosao");
    fogo.textContent = "🔥";

    const rect = btnSim.getBoundingClientRect();
    fogo.style.left = rect.left + rect.width / 2 + "px";
    fogo.style.top = rect.top + rect.height / 2 + "px";

    const offsetX = (Math.random() - 0.5) * 200 + "px";
    const offsetY = (Math.random() - 0.5) * 200 + "px";
    fogo.style.setProperty("--x", offsetX);
    fogo.style.setProperty("--y", offsetY);

    document.body.appendChild(fogo);

    setTimeout(() => {
      fogo.remove();
    }, 800);
  }

  if (!foguinhosAtivos) {
    foguinhosAtivos = true;
    setInterval(() => {
      const fogo = document.createElement("div");
      fogo.classList.add("foguinho");
      fogo.textContent = "🔥";
      fogo.style.left = Math.random() * 100 + "vw";
      fogo.style.top = Math.random() * 100 + "vh";
      fogo.style.fontSize = Math.random() * 20 + 20 + "px";

      document.body.appendChild(fogo);

      setTimeout(() => {
        fogo.remove();
      }, 2000);
    }, 150);
  }

  // Delay antes de abrir o link (1.5 segundos = 1500 ms)
  setTimeout(() => {
    window.location.href = linkSim.href;
  }, 2500);
});


    const btnNao = document.getElementById("nao");
    let primeiroClique = true;

    btnNao.addEventListener("click", () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const botaoWidth = btnNao.offsetWidth;
      const botaoHeight = btnNao.offsetHeight;

      const maxX = viewportWidth - botaoWidth;
      const maxY = viewportHeight - botaoHeight;

      if (primeiroClique) {
        // No primeiro clique, só move 70px pra baixo
        btnNao.style.position = "fixed";
        btnNao.style.top = btnNao.offsetTop + 70 + "px";
        btnNao.style.left = btnNao.offsetLeft + "px";
        primeiroClique = false;
      } else {
        // Depois, movimento aleatório
        const aleatorioX = Math.floor(Math.random() * maxX);
        const aleatorioY = Math.floor(Math.random() * maxY);

        btnNao.style.left = `${aleatorioX}px`;
        btnNao.style.top = `${aleatorioY}px`;
      }
    });
   