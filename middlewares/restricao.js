const Usuario = require('../models/UsuarioModel');

const verificaTipoPermissao = async (req, res, next) => {
    const usuario = await Usuario.findOne({ Nome: req.body.user });
    if(usuario) {
        if(usuario.permissao != process.env.TYPEA) {
            if(req.body.permissao == process.env.TYPEA || req.body.permissao == process.env.TYPEB || req.body.permissao == process.env.TYPEDefault){
                next();
            } else {
                res.status(406).json({ msg: `Permissão Inexistênte.` });
            }
        } else {
            res.status(403).json({ msg: `Não é possível alterar a licença de um Administrador do sistema.` });
        }
    } else {
        res.status(401).json({ msg: `Usuário não encontrado.` });
    }
}

const verificaADMparaDeletar = async (req, res, next) => {
    const usuario = await Usuario.findOne({ Nome: req.body.user });
    if(usuario){
        if(usuario.permissao != process.env.TYPEA) {
            next();
        } else {
            res.status(403).json({ msg: `Não é possível deletar um Administrador do sistema.` });
        }
    } else {
        res.status(401).json({ msg: `Usuário não encontrado.` });
    }
}

module.exports = {verificaTipoPermissao,verificaADMparaDeletar};