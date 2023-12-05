const express = require('express');
const autenticacao = require('../middlewares/autenticacao');
const restricao = require('../middlewares/restricao');
const Usuario = require('../models/UsuarioModel');
const router = express.Router();


// Rota para alterar o tipo de permissão dos usuários

router.put('/AlterarPermissao', autenticacao.checarAdmin,restricao.verificaPermissao, async function(req, res) {
    usuario = await Usuario.findOne({ Nome: req.body.user });
    if(usuario){
        usuario.permissao = req.body.permissao;
        await usuario.updateOne(usuario);
        res.status(200).json({ msg: `Permissão alterada com sucesso!` });
    } else {
        res.status(401).json({ msg: `Usuário não encontrado.` });
    }
});

// Rota para deletar usuários

router.delete('/DeletarUsuario', autenticacao.checarAdmin, async function(req, res) {
    usuario = await Usuario.findOne({ Nome: req.body.user });
    if(usuario){
        await usuario.delete(usuario);
        res.status(200).json({ msg: `Usuário deletado com sucesso!` });
    } else {
        res.status(401).json({ msg: `Usuário não encontrado.` });
    }
});

module.exports = router;
