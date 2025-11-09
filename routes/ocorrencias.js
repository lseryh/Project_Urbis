const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Ocorrencia = require('../models/ocorrencia');

// ===== CONFIGURAÇÃO DO MULTER =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // salva dentro de /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nome único
  }
});

const upload = multer({ storage });

// ===== ROTA PARA CRIAR UMA NOVA OCORRÊNCIA =====
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { comentario, categoria, local } = req.body;

    if (!comentario || !categoria) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const novaOcorrencia = new Ocorrencia({
      descricao: comentario,
      categoria,
      local: local || "Não informado",
      imagemUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    await novaOcorrencia.save();
    console.log("✅ Ocorrência salva:", novaOcorrencia);

    res.status(201).json({ message: "Ocorrência registrada com sucesso!", ocorrencia: novaOcorrencia });
  } catch (err) {
    console.error("Erro ao registrar ocorrência:", err);
    res.status(500).json({ error: "Erro ao registrar ocorrência." });
  }
});

//listar todas as ocorrências
router.get('/', async (req, res) => {
  try {
    const ocorrencias = await Ocorrencia.find().sort({ createdAt: -1 }); // mais recentes primeiro
    res.json(ocorrencias);
  } catch (error) {
    console.error('Erro ao listar ocorrências:', error);
    res.status(500).json({ error: 'Erro ao buscar ocorrências' });
  }
});


module.exports = router;
