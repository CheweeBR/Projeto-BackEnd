const Usuario = require('../models/UsuarioModel');
const Reportagem = require('../models/ReportagemModel');
const Comentario = require('../models/ComentarioModel');

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

const verificaDelComentario = async (req, res, next) => {
    const comentario = await Comentario.findOne({ _id: req.params.id });
    if(comentario) {
        if(req.session.user.Nome == comentario.autor) {
        next();
        } else {
            res.status(403).json({ msg: `Você não é o autor desse comentário, permissão negada.` });
        }
    } else {
        res.status(401).json({ msg: `Comentário não encontrado.` });
    }
}

const verificaListComentario = async (req, res, next) => {
    const comentario = await Comentario.find();
    if(comentario) {
        const limite = parseInt(req.query.limite);
        const pagina = parseInt(req.query.pagina);
        if(limite && pagina) {
            if(limite == 5 || limite == 10 || limite == 30) {
                next();
            } else {
                res.status(406).json({ msg: `Limite inválido, deve ser definido apenas (5|10|30).` });
            }
        } else {
            res.status(406).json({ msg: `Os campos estão vazios` });
        }
    } else {
        res.status(401).json({ msg: `Nenhum comentário encontrado.` });
    }
}

const verificaListReportagem = async (req, res, next) => {
    const reportagem = await Reportagem.find();
    if(reportagem) {
        const limite = parseInt(req.query.limite);
        const pagina = parseInt(req.query.pagina);
        if(limite && pagina) {
            if(limite == 5 || limite == 10 || limite == 30) {
                next();
            } else {
                res.status(406).json({ msg: `Limite inválido, deve ser definido apenas (5|10|30).` });
            }
        } else {
            res.status(406).json({ msg: `Os campos estão vazios` });
        }
    } else {
        res.status(401).json({ msg: `Nenhuma reportagem encontrada.` });
    }
}

module.exports = {verificaTipoPermissao, verificaADMparaDeletar, verificarAddComentario, verificaAttComentario, verificaDelComentario, verificaListComentario, verificaListReportagem};