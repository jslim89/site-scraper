var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

global.__basedir = __dirname;

var indexRouter = require('./routes/index');
var htmlRouter = require('./routes/html');
var imgRouter = require('./routes/img');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/html', htmlRouter);
app.use('/img', imgRouter);

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
  res.send(err);
});

module.exports = app;
