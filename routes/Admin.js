const express = require('express');

const router = express.Router();

function Autenticacao(req,res,next) {
  if(req.session.user) {
    next();
  } else {
    redirect('/login');
  }
}

router.get('/', function(req, res, next) {
  res.end('Rota Admin');
});


module.exports = router;
