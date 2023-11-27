var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/', function(req, res, next) {
  if(req.session.user){
    res.send('Rota Index');
  } else {
    res.redirect('/login');
  }
  res.end("Hello World!");
});

router.post('/login', function(req, res, next) {
  if("Aqui será a verificação do usuário e senha no banco de dados"){
  }
  user = {
    user: req.body.user,
    senha: req.body.senha
  }
  req.session.user = user;
  res.redirect('/');
});

router.get('/install', function(req,res) {
  //instalar que realiza a instalação do banco de dados (criação das tabelas/coleções e inserção de dados no banco)
})

router.get('/docs', function(req,res) {
  //contendo a documentação gerada pela ferramenta Swagger
})

module.exports = router;