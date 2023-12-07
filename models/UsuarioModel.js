const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    Nome: String,
    password: String,
    permissao: String,
    comentarios: Array,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;