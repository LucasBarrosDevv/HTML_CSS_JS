document.addEventListener('DOMContentLoaded', function () {
  const toggleFiltrosBtn = document.getElementById('toggle-filtros');
  const filtrosOcultos = document.getElementById('filtros-ocultos');
  const setaIcone = toggleFiltrosBtn.querySelector('i');
  const valorDisplay = document.getElementById('valor-total-display');
  const seletorTipoValor = document.getElementById('tipo-valor');
  const toggleValorBtn = document.getElementById('toggle-valor');

  let valorVisivel = true;

  // Toggle filtros
  toggleFiltrosBtn.addEventListener('click', function () {
    filtrosOcultos.classList.toggle('exibir');
    setaIcone.classList.toggle('fa-chevron-down');
    setaIcone.classList.toggle('fa-chevron-up');
  });

  // Calcula o valor total
  function calcularValorTotal(tipo) {
    const precoDeVendaTotal = 50 * 2.99;
    const precoDeCustoTotal = 50 * 1.50;

    return tipo === 'custo' ? precoDeCustoTotal : precoDeVendaTotal;
  }

  // Atualiza o display
  function atualizarDisplay(valor) {
    if (valorVisivel) {
      valorDisplay.textContent = `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }
  }

  // Inicializa
  atualizarDisplay(calcularValorTotal('venda'));

  // Select de tipo de valor
  seletorTipoValor.addEventListener('change', function () {
    const tipo = this.value;
    atualizarDisplay(calcularValorTotal(tipo));
  });

  // Botão de olho
  toggleValorBtn.addEventListener('click', () => {
    valorVisivel = !valorVisivel;

    if (valorVisivel) {
      const tipo = seletorTipoValor.value;
      atualizarDisplay(calcularValorTotal(tipo));
      toggleValorBtn.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      valorDisplay.textContent = '••••';
      toggleValorBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
  });
});
