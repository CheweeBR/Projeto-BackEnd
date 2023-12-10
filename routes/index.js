const express = require('express');
const router = express.Router();
const db = require('../config/database');;
const jwt = require('jsonwebtoken');

const Usuario = require('../models/UsuarioModel');
const Reportagem = require('../models/ReportagemModel');
const Comentario = require('../models/ComentarioModel');

const autenticacao = require('../middlewares/autenticacao');
const restricao = require('../middlewares/restricao');

router.use(autenticacao.checarAutenticacao);

// Rota menu principal

router.get('/', function(req, res) {
  usuario = req.session.user;
  if(usuario.permissao === process.env.TYPEA) {
    res.status(200).json({ msg: `Olá ${usuario.Nome}, você está autenticado como administrador.` });
  }
  else if (usuario.permissao === process.env.TYPEB) {
    res.status(200).json({ msg: `Olá ${usuario.Nome}, você está autenticado como escritor.` });
  }
  else if (usuario.permissao === process.env.TYPEDefault) {
    res.status(200).json({ msg: `Olá ${usuario.Nome}, você está autenticado como Leitor.` });
  } 
  else {
    res.status(401).json({ msg: `Você não tem permissão para acessar este recurso.` });
  }
});

// Rota para realizar login

router.post('/login', autenticacao.loginUser, async function(req, res) {
  const user = await Usuario.findOne({Nome: req.body.user});
  const usuario = user.toObject();
  req.session.user = usuario;
  const token = jwt.sign(usuario, process.env.secret, { expiresIn: '100' });
  res.status(200).json({ msg: 'Acesso realizado com sucesso', token: token});
});

// Rota para realizar logout

router.post('/logout', function(req, res) {
  req.session.destroy();
  res.status(200).json({ msg: `Logout realizado com sucesso!` });
});

// Rota para cadastrar usuário

router.post('/registro', autenticacao.registroUsuario, async function(req, res) {
  dataNascimento = new Date(req.body.dataNascimento);
  idade = new Date().getFullYear() - dataNascimento.getFullYear();
  const usuario = new Usuario ({
    Nome: req.body.user,
    Sobrenome: req.body.sobrenome,
    dataNascimento: req.body.dataNascimento,
    idade: idade,
    password: req.body.password,
    permissao: process.env.TYPEDefault
  });
  await usuario.save();
  console.log(usuario);
  res.status(200).json({ msg: `Usuário criado com sucesso!` });
});

// Rota para Atualizar seus dados

router.put("/AtualizarMeusDados", restricao.verificaAttUsuario ,async function(req, res) {
  const db = await initDb();

  const dataNascimento = new Date(req.body.novaDataNascimento);
  let idade = new Date().getFullYear() - dataNascimento.getFullYear();
  usuario = await Usuario.findOneAndUpdate({ Nome: req.body.novoNome, Sobrenome: req.body.novoSobrenome, dataNascimento: req.body.novaDataNascimento, password: req.body.novaSenha, idade: idade});
  res.status(200).json({ msg: `Usuário atualizado com sucesso!` });
});

router.get('/install', restricao.verificaInicializacao, async function(req,res) {
  await db.preencheDefault();
  db.sincronizaID();
  res.status(200).json({ msg: `Dados padrões criados com sucesso!`, user: `usuário administrador padrão -> user:admin / password:admin.` });
});


module.exports = router;