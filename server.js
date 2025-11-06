require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const ocorrenciasRoutes = require('./routes/ocorrencias'); // ✅ nova rota

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// servir arquivos estáticos (HTML, CSS, JS, imagens etc)
app.use(express.static('public'));

// ✅ servir uploads de imagens (ocorrências)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// rotas principais
app.use('/api', authRoutes);
app.use('/api/ocorrencias', ocorrenciasRoutes); // nova rota de ocorrências

// fallback - rota não encontrada
app.use((req, res) => {
  console.log('Caminho não encontrado:', req.method, req.url);
  res.status(404).send('Rota não encontrada.');
});

console.log('Rotas registradas: /api, /api/ocorrencias');

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
