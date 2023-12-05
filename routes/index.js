const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/UsuarioModel');
const autenticacao = require('../middlewares/autenticacao');

router.get('/', autenticacao.checarAutenticacao, function(req, res) {
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

router.post('/login', autenticacao.loginUser, async function(req, res) {
  const user = await Usuario.findOne({Nome: req.body.user});
  const usuario = user.toObject();
  // Definindo o valor de req.session.user
  req.session.user = usuario;
  const token = jwt.sign(usuario, process.env.secret, { expiresIn: '100' });
  res.status(200).json({ msg: 'Acesso realizado com sucesso', token: token});
});


router.post('/registro', autenticacao.registroUsuario, async function(req, res) {
  const usuario = new Usuario ({
    Nome: req.body.user,
    password: req.body.password,
    permissao: process.env.TYPEDefault
  });
  await usuario.save();
  console.log(usuario);
  res.status(200).json({ msg: `Usuário criado com sucesso!` });
});

router.get('/install', function(req,res) {
  //instalar que realiza a instalação do banco de dados (criação das tabelas/coleções e inserção de dados no banco)
});

router.get('/docs', function(req,res) {
  //contendo a documentação gerada pela ferramenta Swagger
});

module.exports = router;