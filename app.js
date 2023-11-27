var createError = require('http-errors');
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

mongoose.connect("mongodb+srv://tiagoeloy:<password>@jornalapi.adtexq9.mongodb.net/?retryWrites=true&w=majority");

const Reportagem = mongoose.model('Reportagem', { 
  titulo: String,
  descricao: String,
  data: Date,
  autor: String
});

app.use(session({secret: "Batata", resave: true, saveUninitialized: true}));

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
