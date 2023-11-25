const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Rota Leitor');
});

module.exports = router;
