var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var config = require("./config")
var passport = require("passport")

// connection with the mongodb

const mongoose = require("mongoose");
const url = config.mongod;

const connect = mongoose.connect( process.env.CUSTOMCONNSTR_MyConnectionString || url ,  {useNewUrlParser: true });

connect.then((db) => {
  console.log("connect successfully");
}).catch((err) => next(err))



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appRouter = require('./routes/appRouter');
var appImageRouter = require("./routes/appImageRouter");
var accountRouter = require("./routes/accountRouter");

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(cookieParser());

app.use(passport.initialize())

// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname  + req.url);
//   }
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apps', appRouter);
app.use("/images" , appImageRouter);
app.use("/accounts" , accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;