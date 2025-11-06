const express = require('express');
const multer = require('multer');
const Ocorrencia = require('../models/Ocorrencia');
const mongoose = require('mongoose');

const ocorrenciaSchema = new mongoose.Schema({
  local: { type: String, required: true },
  data: { type: Date, required: true },
  comentario: { type: String },
  foto: { type: String },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ocorrencia', ocorrenciaSchema);
