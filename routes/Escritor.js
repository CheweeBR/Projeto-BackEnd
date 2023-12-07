const express = require('express');
const router = express.Router();
const Reportagem = require('../models/ReportagemModel');
const autenticacao = require('../middlewares/autenticacao');

// Rota para adicionar reportagens
router.post('/AdicionarReportagem', autenticacao.checarEscritor, async function(req, res) {
  const reportagem = new Reportagem({ 
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    data: req.body.data,
    autor: req.session.user.Nome,
  });
  await reportagem.save();
  res.status(200).json({ msg: `Reportagem adicionada com sucesso!` });
});

// Rota para deletar reportagens
router.delete('/DeletarReportagem/:id', autenticacao.checarEscritor, async function(req, res) {
  const reportagem = await Reportagem.findByIdAndDelete(req.params.id);
  res.send("A reportagem deletada foi: \n"+ reportagem);
});

// Rota para atualizar reportagens

router.put('/AtualizarReportagem/:id', autenticacao.checarEscritor, async function(req, res) {
  const reportagem = await Reportagem.findByIdAndUpdate(req.params.id, {titulo: req.body.titulo,descricao: req.body.descricao,data: req.body.data,autor: req.body.autor});
  res.send("A reportagem atualizada foi: \n"+ reportagem);
});

module.exports = router;
