 const canvas = document.getElementById('teamoCanvas');
  const ctx = canvas.getContext('2d');

  const phrase = "TeAmo";
  const fontSize = 18;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calcula a largura que cada coluna ocupa (a palavra inteira)
    const colWidth = ctx.measureText(phrase).width;

    // Quantidade de colunas na tela (largura da tela dividida pela largura da palavra)
    columns = Math.floor(canvas.width / colWidth);

    // Reinicia drops de acordo com a nova quantidade de colunas
    drops = new Array(columns).fill(0);
  }

  ctx.font = fontSize + 'Arial';
  let columns;
  let drops;

  resizeCanvas();

  const heartColor = '#F52420';

  function drawLove() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = heartColor;
    ctx.font = fontSize + 'px monospace';

    const colWidth = ctx.measureText(phrase).width;

    for (let i = 0; i < columns; i++) {
      const x = i * colWidth;
      const y = drops[i] * fontSize;

      ctx.fillText(phrase, x, y);

      drops[i]++;

      if (y > canvas.height && Math.random() > 0.960) {
        drops[i] = 0;
      }
    }
  }

 // Espera 16 segundos antes de iniciar o efeito
setTimeout(() => {
  setInterval(drawLove, 65);
}, 16000);


  window.addEventListener('resize', resizeCanvas);