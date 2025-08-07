const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const jogadores = new Set();

io.on('connection', (socket) => {
    console.log('🔌 Novo usuário conectado');

    // Enviar lista atual para o novo usuário
    socket.emit('atualizar-lista', Array.from(jogadores));

    // Novo jogador entrou
    socket.on('novo-jogador', (nome) => {
        if (!jogadores.has(nome)) {
            jogadores.add(nome);
            io.emit('atualizar-lista', Array.from(jogadores));
        }
    });

    // Sorteio solicitado com senha
    socket.on('sortear', (senha) => {
        if (senha === '9134') {
            const lista = Array.from(jogadores);
            lista.sort(() => Math.random() - 0.5);
            const timeA = lista.slice(0, 4);
            const timeB = lista.slice(4, 8);
            io.emit('equipes-sorteadas', { timeA, timeB });
        } else {
            socket.emit('erro-senha');
        }
    });

    // (opcional) Reiniciar tudo
    socket.on('resetar', () => {
        jogadores.clear();
        io.emit('atualizar-lista', []);
        io.emit('equipes-sorteadas', { timeA: [], timeB: [] });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
