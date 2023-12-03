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

module.exports = registroUsuario;