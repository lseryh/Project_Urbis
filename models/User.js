const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  cpf: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^\d{11}$/ // validação simples: exatamente 11 dígitos
  },
  telefone: { 
    type: String, 
    required: false,
    match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/ // validação básica de telefone BR
  },
  endereco: { 
    type: String, 
    required: false,
    trim: true // remove espaços extras no começo/fim
  },
  resetToken: String,
  resetTokenExpira: Date
});

// cria (ou atualiza) o modelo 'User'
module.exports = mongoose.model('User', userSchema);
