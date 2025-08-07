// app.js
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = await open({
  filename: './banco.db',
  driver: sqlite3.Database,
});

// Criação da tabela de produtos
await db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    custo REAL NOT NULL,
    preco_venda REAL NOT NULL,
    data_cadastro TEXT NOT NULL,
    status TEXT CHECK(status IN ('ativo', 'inativo', 'esgotado')) NOT NULL
  )
`);

// Endpoint para inserir um produto
app.post('/produtos', async (req, res) => {
  const { nome, descricao, categoria, quantidade, custo, preco_venda, status } = req.body;

  if (!nome || !categoria || !quantidade || !custo || !preco_venda || !status) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
  }

  const dataAtual = new Date().toISOString();

  try {
    const result = await db.run(
      `INSERT INTO produtos (nome, descricao, categoria, quantidade, custo, preco_venda, data_cadastro, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, descricao || '', categoria, quantidade, custo, preco_venda, dataAtual, status]
    );
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    console.error('Erro no backend:', err.message);
    res.status(500).json({ erro: 'Erro ao inserir no banco.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
