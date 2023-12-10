const mongoose = require('mongoose');

const reportagemSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    data: String,
    autor: String,
    autorID: String,
    avaliacao: {Quantidade: Number, Media: Number},
    comentarios: Array,
});

const Reportagem = mongoose.model('Reportagem', reportagemSchema);

module.exports = Reportagem;