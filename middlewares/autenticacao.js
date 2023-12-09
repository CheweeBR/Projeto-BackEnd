
const Usuario = require('../models/UsuarioModel');

const registroUsuario = async (req, res, next) => {
    if(req.body.user && req.body.password && req.body.password2){
        if(req.body.password === req.body.password2) {
            const usuario = await Usuario.findOne({ Nome: req.body.user });
            if(usuario){
                res.status(401).json({ msg: `O usuário ${req.body.user} já está cadastrado.` });
            } else {
                next();
            }
        } else {
            res.status(401).json({ msg: `As senhas não estão iguais.` });
        }
    } else{
        res.status(401).json({ msg: `Os campos estão vazios.` });
    }
}

const loginUser = async (req, res, next) => {
    if(req.body.user && req.body.password){
        const usuario = await Usuario.findOne({ Nome: req.body.user });
        if(usuario){
            if(usuario.password === req.body.password){
                next();
            } else {
                res.status(401).json({ msg: `Login ou senha inválidos.` });
            }
        } else {
            res.status(401).json({ msg: `Login ou senha inválidos.` });
        }
    } else {
        res.status(401).json({ msg: `Os campos estão vazios.` });
    }
}

const checarAutenticacao = (req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.status(401).json({ msg: `Usuário não autenticado.` });
    }
}

const checarEscritor = (req, res, next) => {
    if(req.session.user.permissao == process.env.TYPEB){
        next();
    } else {
        res.status(403).json({ msg: `Usuário não tem permissão para acessar este recurso.` });
    }
}

const checarAdmin = (req, res, next) => {
    if(req.session.user.permissao == process.env.TYPEA){
        next();
    } else {
        res.status(403).json({ msg: `Usuário não tem permissão para acessar este recurso.` });
    }
}

const checarLeitor = (req, res, next) => {
    if(req.session.user.permissao == process.env.TYPEDefault) {
        next();
    } else {
        res.status(403).json({ msg: `Usuário não tem permissão para acessar este recurso.` });
    }
}

module.exports = {registroUsuario, loginUser, checarAutenticacao, checarEscritor, checarAdmin,checarLeitor};