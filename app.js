const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const expressJwt = require('express-jwt');
const i18n = require('i18n');
const methodOverride = require('method-override');
//const firebase = require('firebase');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const scrumBoardsRouter = require('./routes/scrumBoards');
const projectsRouter = require('./routes/projects');
const cardsRouter = require('./routes/cards');
const backlogsRouter = require('./routes/backlogs');

const firebaseConfig = {
  apiKey: "AIzaSyDypKrzkxoOmJM4ZSMBhpL0-DIWnySnEkk",
  authDomain: "proyectowp-82c4c.firebaseapp.com",
  projectId: "proyectowp-82c4c",
  storageBucket: "proyectowp-82c4c.appspot.com",
  messagingSenderId: "126639715988",
  appId: "1:126639715988:web:9c9bf6458897f817712681"
};

//const app = initializeApp(firebaseConfig);

const key = config.get("secret.key");

const uri = config.get("database.uri");
mongoose.connect(uri);
const db = mongoose.connection;

var app = express();

db.on('error', ()=>{
  console.log("No se ha podido conectar a la base de datos");
});

db.on('open', ()=>{
  console.log("conexion correcta");
});

i18n.configure({
  locales: ['en','es'],
  cookie: 'language',
  directory: path.join(__dirname, '/locales'),
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
app.use(methodOverride('_method'));

// TODO: uncomment this when we finish testing
// app.use(
//    expressJwt({
//        secret: key,
//        algorithms: ['HS256']
//    }).unless({
//        path: ['/login']
//   })
//);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/scrumBoards', scrumBoardsRouter);
app.use('/projects', projectsRouter);
app.use('/cards', cardsRouter);
app.use('/backlogs', backlogsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
