const form = document.getElementById('produtoForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const produto = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    categoria: document.getElementById('categoria').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    custo: parseFloat(document.getElementById('custo').value),
    preco_venda: parseFloat(document.getElementById('preco_venda').value),
    status: document.getElementById('status').value
  };

  console.log('Enviando produto:', produto); // Debug

  try {
    const res = await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.erro || 'Erro ao cadastrar produto');
    }

    msg.textContent = `✅ Produto cadastrado com ID: ${data.id}`;
    msg.style.color = '#059669';
    form.reset();
  } catch (err) {
    console.error(err.message);
    msg.textContent = `❌ ${err.message}`;
    msg.style.color = 'red';
  }
});
