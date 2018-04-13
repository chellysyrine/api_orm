
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Etudiants=require('./routes/etudiants');
var Classes=require('./routes/classes');
var Matieres=require('./routes/matieres');
var Salles=require('./routes/salles');
var Specialites=require('./routes/specialites');
var Seances=require('./routes/seances');
var Niveaux=require('./routes/niveaux');
var Notes=require('./routes/notes');
var Annees=require('./routes/annees');
var Unites=require('./routes/unites');
var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// application routing
var router = express.Router();
// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/etudiants',Etudiants);
app.use('/seances',Seances);
app.use('/classes',Classes);
app.use('/salles',Salles);
app.use('/specialites',Specialites);

app.use('/niveaux',Niveaux);
app.use('/notes',Notes);
app.use('/annees',Annees);
app.use('/unites',Unites);
app.use('/matieres',Matieres);


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
