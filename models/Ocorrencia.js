const mongoose = require('mongoose');

const ocorrenciaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  local: String,
  imagem: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Ocorrencia', ocorrenciaSchema);
