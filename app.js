
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var Actualites=require('./routes/actualites');
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
var Absence=require('./routes/absences');
var Absetudiant=require('./routes/absetudiant');
var Seancetudiant=require('./routes/seancetudiant')

var Noteinfos=require('./routes/noteinfos');
const authController = require('./routes/auth-controller');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');

var _ = require('lodash');
var express = require('express');
var app = express();
/*app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-jwt-config')(passport);*/
app.use(passport.initialize());
configurePassport();
var bodyParser = require('body-parser');
app.use(cors({origin:'*'}));


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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use('/auth', authController);

app.use('/etudiants',Etudiants);
app.use('/classes',Classes);
app.use('/salles',Salles);
app.use('/specialites',Specialites);
app.use('/actualites',Actualites);
app.use('/seances',Seances);
app.use ('/absences',Absence);
app.use ('/absetudiant',Absetudiant);
app.use ('/seancetudiant',Seancetudiant);

app.use('/niveaux',Niveaux);
app.use('/notes',Notes);
app.use('/annees',Annees);
app.use('/unites',Unites);
app.use('/matieres',Matieres);
app.use('/noteinfo',Noteinfos);
app.use('/uploads',express.static('uploads'));




// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

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
