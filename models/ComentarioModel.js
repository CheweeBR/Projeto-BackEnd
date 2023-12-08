const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    conteudo: String,
    data: String,
    nota: Number,
    autor: String,
    autorID: String,
    reportagemID: String,
});

const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;