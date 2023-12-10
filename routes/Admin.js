const express = require('express');
const autenticacao = require('../middlewares/autenticacao');
const restricao = require('../middlewares/restricao');
const Usuario = require('../models/UsuarioModel');
const router = express.Router();

// Rota para listar usuários

router.get('/Usuarios', autenticacao.checarAdmin, restricao.verificaListUsuario, async function(req, res) {
    const limite = parseInt(req.query.limite);
    const pagina = parseInt(req.query.pagina);
    const deslocamento = (pagina - 1) * limite;
    const usuarios = await Usuario.find().skip(deslocamento).limit(limite);
    res.status(200).json({ msg: `Usuários:`, usuarios });
});
// Rota para alterar o tipo de permissão dos usuários

router.put('/AlterarPermissao', autenticacao.checarAdmin,restricao.verificaTipoPermissao, async function(req, res) {
    usuario = await Usuario.findOne({ Nome: req.body.user });
    usuario.permissao = req.body.permissao;
    await usuario.updateOne(usuario);
    res.status(200).json({ msg: `Permissão alterada com sucesso!` });
});

router.put("/AtualizarUsuarios", autenticacao.checarAdmin, restricao.verificaAttUsuario, async function(req, res) {
    const usuario = await Usuario.findOne({ Nome: req.body.user });
    await usuario.updateOne({ Nome: req.body.novoNome, Sobrenome: req.body.novoSobrenome, dataNascimento: req.body.novaDataNascimento, password: req.body.novaSenha});
    res.status(200).json({ msg: `Usuário atualizado com sucesso!` });
});

// Rota para deletar usuários

router.delete('/DeletarUsuario', autenticacao.checarAdmin, restricao.verificaADMparaDeletar, async function(req, res) {
    usuario = await Usuario.findOne({ Nome: req.body.user });
    await usuario.deleteOne(usuario);
    res.status(200).json({ msg: `Usuário deletado com sucesso!` });
});

module.exports = router;
