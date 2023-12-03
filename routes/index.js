const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/UsuarioModel');
const autenticacao = require('../middlewares/autenticacao');

router.get('/', function(req, res, next) {
  if(req.session.user){
    res.send('Rota Index');
  } else {
    res.status(401).json({ error: 'Usuário não autenticado' });
  }
});

router.post('/login', function(req, res) {
  const user = { };
  if(req.body.user && req.body.password){
    jwt.sign(user, rocess.env.secret, { expiresIn: '100' })
    req.session.user = user;
    res.status(200).json({ msg: 'Acesso realizado com sucesso' });
  }
  res.status(401).json({ msg: `Login ou senha inválidos.` });
  
});

router.post('/registro', autenticacao, async function(req, res) {
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