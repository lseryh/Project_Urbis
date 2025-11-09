require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Rotas
const authRoutes = require('./routes/auth');
const ocorrenciasRoutes = require('./routes/ocorrencias');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES GERAIS =====
app.use(cors());
app.use(express.json());

// ===== CONEXÃO COM O MONGODB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// ===== PASTAS ESTÁTICAS =====
// “public” para arquivos do site
app.use(express.static(path.join(__dirname, 'public')));

// “uploads” para armazenar imagens enviadas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== ROTAS PRINCIPAIS =====
app.use('/api', authRoutes);
app.use('/api/ocorrencias', ocorrenciasRoutes);

// ===== ROTA INICIAL =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'feed.html'));
});

// ===== TRATAMENTO DE ROTAS INEXISTENTES =====
app.use((req, res) => {
  console.warn(`Caminho não encontrado: ${req.method} ${req.url}`);
  res.status(404).send('Rota não encontrada.');
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Rotas disponíveis:');
  console.log('   ➜ /api');
  console.log('   ➜ /api/ocorrencias');
});
