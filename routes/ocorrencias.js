const express = require('express');
const router = express.Router();
const multer = require('multer');
const Ocorrencia = require('../models/Ocorrencia');

// Configuração do multer (upload de imagens)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta de destino
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Rota para cadastrar nova ocorrência
router.post('/nova', upload.single('foto'), async (req, res) => {
  try {
    const { local, data, comentario } = req.body;
    const foto = req.file ? req.file.filename : null;

    const novaOcorrencia = new Ocorrencia({ local, data, comentario, foto });
    await novaOcorrencia.save();

    res.status(201).json({ message: 'Ocorrência registrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar ocorrência.' });
  }
});

// Rota para listar todas as ocorrências
router.get('/', async (req, res) => {
  try {
    const ocorrencias = await Ocorrencia.find().sort({ criadoEm: -1 });
    res.json(ocorrencias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ocorrências.' });
  }
});

module.exports = router;
