// Função para calcular o total da compra somando valor x multiplicador de cada item
function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.item').forEach(item => {
        let valor = parseFloat(item.querySelector('.num').value) || 0;
        let multiplicador = parseInt(item.querySelector('.multiplicador').value) || 1;
        total += valor * multiplicador;
    });
    document.getElementById('total').textContent = total.toFixed(2);
    salvarDados(); // Salva os dados toda vez que o total for calculado
}

// ... sua função salvarDados() aqui

function salvarDados() {
    const itens = [];
    document.querySelectorAll('.item').forEach(item => {
        itens.push({
            nome: item.querySelector('.nome-item').textContent,
            valor: item.querySelector('.num').value,
            quantidade: item.querySelector('.multiplicador').value,
            checked: item.querySelector('.check').checked
        });
    });
    localStorage.setItem('listaCompras', JSON.stringify(itens));
}

// *** INSERIR AQUI o evento do botão salvar manualmente ***
document.getElementById('botao-salvar-dados').addEventListener('click', function() {
    salvarDados();
    alert('Dados salvos com sucesso!');
});

// ... restante do seu script (carregarDados, calcularTotal, duplicarUltimoItem, etc)



// Carregar os dados do localStorage ao carregar a página
function carregarDados() {
    const dados = JSON.parse(localStorage.getItem('listaCompras'));
    if (dados && dados.length > 0) {
        const container = document.querySelector("#lista-compras-section fieldset");
        container.innerHTML = ''; // Limpa os itens atuais para recarregar do armazenamento
        dados.forEach(itemDados => {
            // Cria um novo item
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <div class="item-topo">
                    <input type="checkbox" class="check" ${itemDados.checked ? 'checked' : ''}>
                    <span class="nome-item">${itemDados.nome}</span>
                </div>
                <div class="item-valores">
                    <label>R$
                        <input type="number" class="num" step="0.10" placeholder="0.00" min="0" value="${itemDados.valor}">
                    </label>
                    <label>Qtd.
                        <input type="number" class="multiplicador" placeholder="1" min="1" value="${itemDados.quantidade}">
                    </label>
                </div>
            `;
            // Adiciona eventos de input para recalcular e salvar ao mudar valores
            item.querySelectorAll('.num, .multiplicador').forEach(input => {
                input.addEventListener('input', calcularTotal);
            });
            // Evento para salvar ao mudar checkbox
            item.querySelector('.check').addEventListener('change', salvarDados);
            container.appendChild(item);
        });
        calcularTotal();
    }
}

// Adiciona evento de cálculo ao digitar nos inputs existentes (no HTML inicial)
document.querySelectorAll('.num, .multiplicador').forEach(input => {
    input.addEventListener('input', calcularTotal);
});

// Adiciona evento para salvar ao alterar checkbox (no HTML inicial)
document.querySelectorAll('.check').forEach(checkbox => {
    checkbox.addEventListener('change', salvarDados);
});

// Duplicar o último item da lista
function duplicarUltimoItem() {
    let itens = document.querySelectorAll('.item');
    if (itens.length === 0) {
        alert("Nenhum item para duplicar!");
        return;
    }

    let ultimoItem = itens[itens.length - 1];
    let novoNome = prompt("Digite o nome do novo item:");
    if (!novoNome) {
        alert("Nome inválido! O item não foi duplicado.");
        return;
    }

    let itemClone = ultimoItem.cloneNode(true);
    itemClone.querySelector('.nome-item').textContent = novoNome;

    // Limpa os valores e adiciona eventos
    itemClone.querySelectorAll('.num, .multiplicador').forEach(input => {
        input.value = "";
        input.addEventListener('input', calcularTotal);
    });
    itemClone.querySelector('.check').checked = false;
    itemClone.querySelector('.check').addEventListener('change', salvarDados);

    document.querySelector("#lista-compras-section fieldset").appendChild(itemClone);

    salvarDados(); // Salva imediatamente após adicionar novo item
}

document.getElementById('duplicar-item').addEventListener('click', duplicarUltimoItem);

// Confirmação antes de voltar
document.getElementById('voltar').addEventListener('click', function (event) {
    event.preventDefault();
    let confirmar = confirm("Tem certeza de que deseja voltar?");
    if (confirmar) {
        window.location.href = this.href;
    }
});

// Carrega os dados salvos ao abrir a página
window.addEventListener('load', carregarDados);
