const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const jogadores = new Set();
const SENHA_SORTEIO = '1234';

app.use(express.static('public')); // se quiser usar para frontend também

io.on('connection', (socket) => {
    console.log('Novo jogador conectado');

    socket.emit('atualizar-lista', Array.from(jogadores));

    socket.on('novo-jogador', (nome) => {
        if (!jogadores.has(nome)) {
            jogadores.add(nome);
            io.emit('atualizar-lista', Array.from(jogadores));
        }
    });

    socket.on('sortear', (senha) => {
        if (senha !== SENHA_SORTEIO) {
            socket.emit('erro-senha');
            return;
        }

        const lista = Array.from(jogadores);
        embaralharArray(lista);
        const timeA = lista.slice(0, 4);
        const timeB = lista.slice(4, 8);
        io.emit('equipes-sorteadas', { timeA, timeB });
    });
});

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
