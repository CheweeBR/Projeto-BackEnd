const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const indexRouter = require('./routes/index');
const escritorRouter = require('./routes/Escritor');
const escritorAdmin = require('./routes/Admin');

const app = express(); 

app.use(session({secret: process.env.secret, resave: true, saveUninitialized: true}));

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', escritorRouter);
app.use('/', escritorAdmin);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.port, function() {
  mongoose.connect(process.env.serverPass);
  console.log(`Servidor rodando na porta 8080`);
});

module.exports = app;
