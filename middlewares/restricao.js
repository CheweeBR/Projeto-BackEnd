const Usuario = require('../models/UsuarioModel');
const Reportagem = require('../models/ReportagemModel');

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

const verificarAddComentario = async (req, res, next) => {
    const id = await Reportagem.findOne({ _id: req.params.id });
    if(id) {
        if(req.body.conteudo != "" && req.body.nota != "") {
            if(req.body.nota >= 0 && req.body.nota <= 5) {
                next();
            } else {
                res.status(406).json({ msg: `Nota deve ser entre 0 e 5.` });
            }
        } else { 
            res.status(406).json({ msg: `Campos vazios.` });
        
        }
    } else {
        res.status(401).json({ msg: `Reportagem não encontrada.` });
    }
}

const verificaAttComentario = async (req, res, next) => {
    if(req.body.conteudo != "" && req.body.nota != "") {
        if(req.body.nota >= 0 && req.body.nota <= 5) {
            next();
        } else {
            res.status(406).json({ msg: `Nota deve ser entre 0 e 5.` });
        }
    } else { 
        res.status(406).json({ msg: `Campos vazios.` });
    }
}

module.exports = {verificaTipoPermissao, verificaADMparaDeletar, verificarAddComentario, verificaAttComentario};