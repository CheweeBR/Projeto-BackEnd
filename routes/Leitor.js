const express = require('express');
const router = express.Router();
const Reportagem = require('../models/ReportagemModel');
const Comentario = require('../models/ComentarioModel');
const Usuario = require('../models/UsuarioModel');
const autenticacao = require('../middlewares/autenticacao');
const restricao = require('../middlewares/restricao');

router.use(autenticacao.checarAutenticacao);

// Rota para listar reportagens

router.get('/Reportagem', restricao.verificaListReportagem, async function(req, res) {
  const reportagem = await Reportagem.find();
  const limite = parseInt(req.query.limite);
  const pagina = parseInt(req.query.pagina);
  const deslocamento = (pagina - 1) * limite;
  const reportagens = await Reportagem.find().skip(deslocamento).limit(limite);
  res.status(200).json({msg: `Reportagens:`, reportagens});
});

// Rota para buscar reportagem por conteúdo

router.get('/Reportagem/:conteudo', async function(req, res) {
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

// Rota para listar comentários

router.get('/Comentarios/', restricao.verificaListComentario, async function(req, res) {
  const limite = parseInt(req.query.limite);
  const pagina = parseInt(req.query.pagina);
  const deslocamento = (pagina - 1) * limite;
  const comentario = await Comentario.find().skip(deslocamento).limit(limite);
  res.status(200).json({msg: `Comentários:`, comentario});
});


// Rota para adicionar comentários

router.post('/adicionarComentario/:id',restricao.verificarAddComentario, async function(req, res) {   
  const comentario = new Comentario({ 
    conteudo: req.body.conteudo,
    data: Date(),
    nota: req.body.nota,
    autor: req.session.user.Nome,
    autorID: req.session.user._id,
    reportagemID: req.params.id,
  });
  await comentario.save();
  await Usuario.findByIdAndUpdate(req.session.user._id, {$push: {comentarios: comentario._id}});
  await Reportagem.findByIdAndUpdate(req.params.id, {$push: {comentarios: comentario._id}});
  res.status(200).json({msg: `Comentário postado com sucesso!`});
});

// Rota para atualizar comentários

router.put('/atualizarComentario/:id', autenticacao.checarLeitor,restricao.verificaAttComentario, async function(req, res) {
  await Comentario.findByIdAndUpdate(req.params.id, {conteudo: req.body.conteudo,nota: req.body.nota, data: Date()});
  res.status(200).json({msg:"O comentário foi atualizado com sucesso."});
});

// Rota para deletar comentários

router.delete('/deletarComentario/:id', autenticacao.checarLeitor, restricao.verificaDelComentario, async function(req, res) {
  const comentario = await Comentario.findByIdAndDelete(req.params.id);
  await Reportagem.findByIdAndUpdate(comentario.reportagemID, {$pull: {comentarios: comentario._id}});
  await Usuario.findByIdAndUpdate(comentario.autorID, {$pull: {comentarios: comentario._id}});
  comentario.deleteOne();
  res.status(200).json({msg: `Comentário deletado com sucesso!`});
});


module.exports = router;
