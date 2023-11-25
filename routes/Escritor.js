const express = require('express');
const router = express.Router();

// Defina suas rotas aqui
router.get('/', function(req, res, next) {
  res.send('Rota Escritor');
});

// Exporte o roteador
module.exports = router;
