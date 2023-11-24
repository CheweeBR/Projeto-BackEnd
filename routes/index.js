var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.end("Hello World!");
});


router.get('/install', function(req,res) {
  //instalar que realiza a instalação do banco de dados (criação das tabelas/coleções e inserção de dados no banco)
})

router.get('/docs', function(req,res) {
  //contendo a documentação gerada pela ferramenta Swagger
})

module.exports = router;