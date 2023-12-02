const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Reportagem = require('../models/database');
const Usuario = require('../models/database');
const secret = "Batata";

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
    jwt.sign(user, secret, { expiresIn: '100' })
    req.session.user = user;
    res.status(200).json({ msg: 'Acesso realizado com sucesso' });
  }
  res.status(401).json({ msg: `Login ou senha inválidos.` });
  
});

router.post('/registro', function(req, res) {

  if(req.body.user && req.body.password){
    const user = new Usuario({ 
      user: req.body.user,
      password: req.body.password,
      type: 'LEITOR'
    });
    user.save();
    res.status(200).json({ msg: 'Usuário registrado com sucesso' });
  }
  res.status(401).json({ msg: `Usuário ou senha inválidos.` });
  
});



router.get('/install', function(req,res) {
  //instalar que realiza a instalação do banco de dados (criação das tabelas/coleções e inserção de dados no banco)
});

router.get('/docs', function(req,res) {
  //contendo a documentação gerada pela ferramenta Swagger
});

module.exports = router;