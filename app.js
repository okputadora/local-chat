var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var api = require('./routes/api');
var account = require('./routes/account')
var geo = require('./routes/geo')
var sessions = require('client-sessions')
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB,{useMongoClient: true}, function(err, res){
  if (err){
    console.log('DB CONNECTION FAILED: '+err)
  }
  else{
    console.log('DB CONNECTION SUCCESS: '+process.env.MONGO_DB)
  }

})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// This needs to be after the cookie parser
app.use(sessions({
  cookieName: 'session',
  secret: 'ajajfjwfajwef',
  duration: 24*60*60*1000, // 1 day
  activeDuration: 30*60*1000 // 30 minutes
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/account', account);
app.use('/geo', geo);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
