const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const app = express(); 

const swaggerUiExpress = require('swagger-ui-express');
const swagger = require('./swaggerDocs.json');

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swagger));

require('dotenv').config();

const indexRouter = require('./routes/index');
const escritorRouter = require('./routes/Escritor');
const adminRouter = require('./routes/Admin');
const leitorRouter = require('./routes/Leitor');

app.use(session({secret: process.env.secret, resave: false, saveUninitialized: true}));

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', escritorRouter);
app.use('/', adminRouter);
app.use('/', leitorRouter);

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
