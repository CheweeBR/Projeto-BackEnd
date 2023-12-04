const express = require('express');
const router = express.Router();
const Reportagem = require('../models/ReportagemModel');
const autenticacao = require('../middlewares/autenticacao');

// Rota para listar reportagens

router.get('/Reportagem', autenticacao.checarLeitor, async function(req, res) {
  const reportagem = await Reportagem.find();
  res.send(reportagem);
});

// Rota para buscar reportagem por conteúdo

router.get('/Reportagem/:conteudo', autenticacao.checarLeitor, async function(req, res) {
  const conteudo = req.params.conteudo;

  if (!conteudo || conteudo.trim() === '') {
    res.status(400).json({ error: 'Conteúdo inválido' });
    return;
  }

  const regex = new RegExp(conteudo, 'i');

  const reportagem = await Reportagem.find({
    $regex: {
      conteudo: regex
    }
  });

  res.send(reportagem);
});



module.exports = router;
