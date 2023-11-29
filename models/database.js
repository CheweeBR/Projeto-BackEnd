
const mongoose = require('mongoose');

const Reportagem = mongoose.model('Reportagem', { 
    titulo: String,
    descricao: String,
    data: String,
    autor: String,
});


module.exports = Reportagem;
