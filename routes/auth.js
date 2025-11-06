const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const BASE_URL = "http://localhost:3000";

console.log("Arquivo auth.js carregado com sucesso");

// rota de teste
router.get('/', (req, res) => {
  res.send('Rota /api funcionando corretamente!');
});

// rota para cadastro
router.post('/register', async (req, res) => {
  try {
    const { email, password, cpf, telefone, endereco } = req.body;
    if (!password) {
      return res.status(400).json({ message: "O campo 'senha' é obrigatório" });
}

    // verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }



    // criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria novo usuário
    const newUser = new User({
      email,
      password: hashedPassword,
      cpf,
      telefone,
      endereco
    });

    await newUser.save(); // salva no banco
    console.log("Usuário salvo com sucesso!");
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Email ou senha incorretos.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: 'Email ou senha incorretos.' });

    // Envia JSON válido
    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: { email: user.email, id: user._id },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
});


// VERIFICA E-MAIL E REDIRECIONA PARA TELA DE NOVA SENHA
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Informe o e-mail.' });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'E-mail não encontrado.' });
    }

    // Se o e-mail existir, apenas confirma
    return res.status(200).json({ message: 'E-mail confirmado. Redirecionando...' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// REDEFINIR SENHA
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'E-mail e nova senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});


module.exports = router;

