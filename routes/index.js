var express = require('express');
var router = express.Router();
const Reportagem = require('../models/database');

router.get('/', function(req, res, next) {
  if(req.session.user){
    res.send('Rota Index');
  } else {
    res.status(401).json({ error: 'Usuário não autenticado' });
  }
});

router.post('/login', function(req, res, next) {
  /*if("Aqui será a verificação do usuário e senha no banco de dados"){

  }
  user = {
    user: req.body.user,
    senha: req.body.senha
  }
  req.session.user = user;*/
  res.send("hellow world")
  
});

// Rota para adicionar reportagens
router.post('/AdicionarReportagem', async function(req, res) {
  const reportagem = new Reportagem({ 
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    data: req.body.data,
    autor: req.body.autor,
  });
  await reportagem.save();
  res.send(`Reportagem postada com sucesso!\n ${reportagem}`);
});

// Rota para listar reportagens
router.get('/Reportagem', async function(req, res) {
  const reportagem = await Reportagem.find();
  res.send(reportagem);
});

// Rota para deletar reportagens
router.delete('/DeletarReportagem/:id', async function(req, res) {
  const reportagem = await Reportagem.findByIdAndDelete(req.params.id);
  res.send("A reportagem deletada foi: \n"+ reportagem);
});

// Rota para atualizar reportagens

router.put('/AtualizarReportagem/:id', async function(req, res) {
  const reportagem = await Reportagem.findByIdAndUpdate(req.params.id, {titulo: req.body.titulo,descricao: req.body.descricao,data: req.body.data,autor: req.body.autor});
  res.send("A reportagem atualizada foi: \n"+ reportagem);
});

router.get('/install', function(req,res) {
  //instalar que realiza a instalação do banco de dados (criação das tabelas/coleções e inserção de dados no banco)
});

router.get('/docs', function(req,res) {
  //contendo a documentação gerada pela ferramenta Swagger
});

module.exports = router;