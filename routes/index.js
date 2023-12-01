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
    res.status(200).json({ error: 'Acesso realizado com sucesso' });
  }

  res.send(`Login ou senha inválidos.`);
  
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