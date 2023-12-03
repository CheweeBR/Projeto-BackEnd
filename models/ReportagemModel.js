const mongoose = require('mongoose');

const reportagemSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    data: String,
    autor: String,
});

const Reportagem = mongoose.model('Reportagem', reportagemSchema);

module.exports = Reportagem;