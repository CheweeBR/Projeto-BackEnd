const express = require('express');
const router = express.Router();
const Reportagem = require('../models/ReportagemModel');
const Comentario = require('../models/ComentarioModel');
const autenticacao = require('../middlewares/autenticacao');
const restricao = require('../middlewares/restricao');

// Rota para listar reportagens

router.get('/Reportagem', autenticacao.checarAutenticacao, async function(req, res) {
  const reportagem = await Reportagem.find();
  res.send(reportagem);
});

// Rota para buscar reportagem por conteúdo

router.get('/Reportagem/:conteudo', autenticacao.checarAutenticacao, async function(req, res) {
  const conteudo = req.body.conteudo;
  const buscar = await Reportagem.findOne({ descricao: conteudo });
  console.log(conteudo);
  console.log(buscar);
  if(buscar) {
    if(buscar.descricao != "") {
      res.send(reportagem);
    }
  }
  else {
    res.status(400).json({ error: 'Conteúdo não encontrado.' });
  }
});

router.post('/adicionarComentario/:id', autenticacao.checarLeitor, restricao.verificarAddComentario, async function(req, res) {   
  const comentario = new Comentario({ 
    conteudo: req.body.conteudo,
    data: Date(),
    nota: req.body.nota,
    autor: req.session.user.Nome,
    reportagemID: req.params.id,
  });
  await comentario.save();
  await Reportagem.findByIdAndUpdate(req.params.id, {$push: {comentarios: comentario._id}});
  res.status(200).json({msg: `Comentário postado com sucesso!`});
});

router.put('/atualizarComentario/:id', autenticacao.checarLeitor,restricao.verificaAttComentario, async function(req, res) {
  await Comentario.findByIdAndUpdate(req.params.id, {conteudo: req.body.conteudo,nota: req.body.nota, data: Date()});
  res.status(200).json({msg:"O comentário foi atualizado com sucesso."});
});



module.exports = router;
