const mongoose = require('mongoose');
const Reportagem = require('../models/ReportagemModel');
const Comentario = require('../models/ComentarioModel');
const Usuario = require('../models/UsuarioModel');

const db = mongoose.connect(process.env.serverPass, {
}).then(() => {
  console.log('Conectado ao MongoDB\nAplicação inicializada...');
  return mongoose.connection;
}).catch((err) => {
  console.error(err);
});

const preencheDefault = async function() {
  const admin = new Usuario ({
    Nome: "admin",
    Sobrenome: "MacGyver",
    dataNascimento: "25-05-1977",
    idade: 999,
    password: "admin",
    permissao: process.env.TYPEA
  });
  const scott = new Usuario ({
    Nome: "Scott",
    Sobrenome: "Pilgrim",
    dataNascimento: "27-09-1980",
    idade: 21,
    password: "Flowers",
    permissao: process.env.TYPEDefault
  });
  const ramona = new Usuario ({
    Nome: "Ramona",
    Sobrenome: "Flowers",
    dataNascimento: "14-01-1980",
    idade: 21,
    password: "Pilgrim",
    permissao: process.env.TYPEDefault
  });
  const Emmett = new Usuario ({
    Nome: "Emmett",
    Sobrenome: "Brown",
    dataNascimento: "12-11-1955",
    idade: 65,
    password: "Brown",
    permissao: process.env.TYPEB
  });
  const Marty = new Usuario ({
    Nome: "Marty",
    Sobrenome: "McFly",
    dataNascimento: "06-12-1968",
    idade: 17,
    password: "skate",
    permissao: process.env.TYPEB
  });
  await admin.save();
  await scott.save();
  await ramona.save();
  await Emmett.save();
  await Marty.save();
  const reportagem1 = new Reportagem ({
    titulo: "Scott Pilgrim vs. the World",
    conteudo: "Scott Pilgrim é um jovem que conhece a mulher dos seus sonhos, Ramona V. Flowers, mas antes de conquistá-la, ele precisa enfrentar seus sete ex-namorados do mal, que farão de tudo para impedir a felicidade do casal.",
    autor: "Emmett",
    autorID: null,
    data: "13-08-2010",
    categoria: "Ação, Comédia, Fantasia",
    nota: 5,
    comentarios: []
  });
  const reportagem2 = new Reportagem ({
    titulo: "De Volta para o Futuro",
    conteudo: "Marty McFly é um adolescente que acidentalmente viaja de 1985 para 1955 em uma máquina do tempo inventada pelo excêntrico cientista Doc Brown. Durante sua viagem ao passado, Marty precisa tomar cuidado para não bagunçar a linha do tempo, já que isso poderia prejudicar o futuro.",
    autor: "Marty",
    autorID: null,
    data: "20-07-1985",
    categoria: "Aventura, Comédia, Ficção científica",
    nota: 5,
    comentarios: []
  });
  const reportagem3 = new Reportagem ({
    titulo: "Star Wars: Episode IV – A New Hope",
    conteudo: "Luke Skywalker se une a Obi-Wan Kenobi, Han Solo, Chewbacca, C-3PO e R2-D2 para salvar a galáxia da Estrela da Morte, enquanto tenta resgatar a Princesa Leia das garras de Darth Vader.",
    autor: "Emmett",
    autorID: null,
    data: "25-05-1977",
    categoria: "Ação, Aventura, Fantasia",
    nota: 5,
    comentarios: []
  });
  const reportagem4 = new Reportagem ({
    titulo: "Star Wars: Episode V – The Empire Strikes Back",
    conteudo: "Após a destruição da Estrela da Morte, o Império Galáctico persegue os membros da Aliança Rebelde enquanto Luke Skywalker se prepara para enfrentar Darth Vader.",
    autor: "Marty",
    autorID: null,
    data: "20-06-1980",
    categoria: "Ação, Aventura, Fantasia",
    nota: 5,
    comentarios: []
  });
  const reportagem5 = new Reportagem ({
    titulo: "Star Wars: Episode VI – Return of the Jedi",
    conteudo: "Luke Skywalker tenta salvar seu pai, Darth Vader, do lado sombrio da Força. Enquanto isso, a Rebelião se prepara para atacar o novo Death Star.",
    autor: "Emmett",
    autorID: null,
    data: "25-05-1983",
    categoria: "Ação, Aventura, Fantasia",
    nota: 5,
    comentarios: []
  });
  await reportagem1.save();
  await reportagem2.save();
  await reportagem3.save();
  await reportagem4.save();
  await reportagem5.save();
  const comentario1 = new Comentario ({
    conteudo: "Filme Irado!",
    data: new Date(),
    autor: "Scott",
    autorID: null,
    reportagemID: null,
  });
  const comentario2 = new Comentario ({
    conteudo: "Muito dramatico.",
    data: new Date(),
    autor: "Ramona",
    autorID: null,
    reportagemID: null,
  });
  const comentario3 = new Comentario ({
    conteudo: "Filme muito bom, recomendo!",
    data: new Date(),
    autor: "Scott",
    autorID: null,
    reportagemID: null,
  });
  const comentario4 = new Comentario ({
    conteudo: "Melancolico, gostei...",
    data: new Date(),
    autor: "Ramona",
    autorID: null,
    reportagemID: null,
  });
  const comentario5 = new Comentario ({
    conteudo: "O melhor filme de todos os tempos!",
    data: new Date(),
    autor: "admin",
    autorID: null,
    reportagemID: null,
  });
  await comentario1.save();
  await comentario2.save();
  await comentario3.save();
  await comentario4.save();
  await comentario5.save();
}

const sincronizaID = async function() {
  const adminUsuario = await Usuario.findOne({ Nome: "admin" });
  const scottUsuario = await Usuario.findOne({ Nome: "Scott" });
  const ramonaUsuario = await Usuario.findOne({ Nome: "Ramona" });
  const emmettUsuario = await Usuario.findOne({ Nome: "Emmett" });
  const martyUsuario = await Usuario.findOne({ Nome: "Marty" });

  const martyReportagem1 = await Reportagem.findOne({titulo: "De Volta para o Futuro"});
  const martyReportagem2 = await Reportagem.findOne({titulo: "Star Wars: Episode V – The Empire Strikes Back"});
  const emmettReportagem1 = await Reportagem.findOne({titulo: "Scott Pilgrim vs. the World"});
  const emmettReportagem2 = await Reportagem.findOne({titulo: "Star Wars: Episode IV – A New Hope"});
  const emmettReportagem3 = await Reportagem.findOne({titulo: "Star Wars: Episode VI – Return of the Jedi"});
  
  const scottComentario1 = await Comentario.findOne({conteudo: "Filme Irado!"});
  const scottComentario2 = await Comentario.findOne({conteudo: "Filme muito bom, recomendo!"});
  const ramonaComentario1 = await Comentario.findOne({conteudo: "Muito dramatico."});
  const ramonaComentario2 = await Comentario.findOne({conteudo: "Melancolico, gostei..."});
  const adminComentario = await Comentario.findOne({conteudo: "O melhor filme de todos os tempos!"});

  await Reportagem.updateOne(martyReportagem1, {autorID: martyUsuario._id, comentarios: [scottComentario1._id, ramonaComentario1._id]});
  await Reportagem.updateOne(martyReportagem2, {autorID: martyUsuario._id, comentarios: [adminComentario._id]});
  await Reportagem.updateOne(emmettReportagem1, {autorID: emmettUsuario._id, comentarios: [scottComentario2._id, ramonaComentario2._id]});
  await Reportagem.updateOne(emmettReportagem2, {autorID: emmettUsuario._id, comentarios: [scottComentario2._id, ramonaComentario1._id]});
  await Reportagem.updateOne(emmettReportagem3, {autorID: emmettUsuario._id});

  await Comentario.updateOne(scottComentario1, {autorID: scottUsuario._id, reportagemID: martyReportagem1._id});
  await Comentario.updateOne(scottComentario2, {autorID: scottUsuario._id, reportagemID: emmettReportagem1._id});
  await Comentario.updateOne(ramonaComentario1, {autorID: ramonaUsuario._id, reportagemID: martyReportagem1._id});
  await Comentario.updateOne(ramonaComentario2, {autorID: ramonaUsuario._id, reportagemID: emmettReportagem1._id});
  await Comentario.updateOne(adminComentario, {autorID: adminUsuario._id, reportagemID: martyReportagem2._id});

  await Usuario.updateOne(adminUsuario, {comentarios: [adminComentario._id]});
  await Usuario.updateOne(scottUsuario, {comentarios: [scottComentario1._id, scottComentario2._id]});
  await Usuario.updateOne(ramonaUsuario, {comentarios: [ramonaComentario1._id, ramonaComentario2._id]});
}

module.exports = { db, preencheDefault, sincronizaID};
