const express = require('express');
const router = express.Router();

// Defina suas rotas aqui
router.get('/', function(req, res, next) {
  res.send('Rota Escritor');
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


// Exporte o roteador
module.exports = router;
