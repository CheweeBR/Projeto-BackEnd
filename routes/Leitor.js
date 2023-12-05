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

router.get('/Reportagem/:conteudo', autenticacao.checarAutenticacao, async function(req, res) {
  const conteudo = req.params.conteudo;
  const buscar = await Reportagem.findOne({ descricao: conteudo });
  console.log(conteudo);
  console.log(buscar);
  if(buscar) {
    const regex = new RegExp(conteudo, 'i');
    const reportagem = await Reportagem.aggregate([
      {
        $match: {
          conteudo: { $regex: regex }
        }
      }
    ]);
    res.send(reportagem);
  }
  else {
    res.status(400).json({ error: 'Conteúdo não encontrado.' });
  }
});



module.exports = router;
