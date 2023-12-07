const express = require('express');
const autenticacao = require('../middlewares/autenticacao');
const restricao = require('../middlewares/restricao');
const Usuario = require('../models/UsuarioModel');
const router = express.Router();


// Rota para alterar o tipo de permissão dos usuários

router.put('/AlterarPermissao', autenticacao.checarAdmin,restricao.verificaTipoPermissao, async function(req, res) {
    usuario = await Usuario.findOne({ Nome: req.body.user });
    usuario.permissao = req.body.permissao;
    await usuario.updateOne(usuario);
    res.status(200).json({ msg: `Permissão alterada com sucesso!` });
});

// Rota para deletar usuários

router.delete('/DeletarUsuario', autenticacao.checarAdmin, restricao.verificaADMparaDeletar, async function(req, res) {
    usuario = await Usuario.findOne({ Nome: req.body.user });
    await usuario.deleteOne(usuario);
    res.status(200).json({ msg: `Usuário deletado com sucesso!` });
});

module.exports = router;
