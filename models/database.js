
const mongoose = require('mongoose');

const Reportagem = mongoose.model('Reportagem', { 
    titulo: String,
    descricao: String,
    data: String,
    autor: String,
});

const Usuario = mongoose.model('Usuario', { 
    Nome: String,
    Password: String,
    permissao: String,
});



module.exports = Reportagem, Usuario;
