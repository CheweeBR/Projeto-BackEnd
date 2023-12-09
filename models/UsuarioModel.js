const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    Nome: String,
    Sobrenome: String,
    dataNascimento: String,
    idade: Number,
    password: String,
    permissao: String,
    comentarios: Array,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;