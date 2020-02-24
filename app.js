/**
 *    Requirements
 */
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cores');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const chalk = require('chalk');
const logger = require('./modules/logger/logger');
const errors = require('./modules/errors/error');

/**
 *    App logo
 */
logger.pringAppLogo();

//Configure mongoose's promise to global promise
mongoose.Promise = global.Promise; //global mongoose promise

/**
 *    Enviroment configuration:
 *       -- development
 *       -- production
 */
const isProduction = process.env.NODE_ENV === 'production';
logger.status(
   'Server Enviroment',
   isProduction === true ? 'Production' : 'Development'
);

/**
 *    Initiation of the application
 */
const app = express();

/**
 *    App Configuration
 */
//app.use(cors())
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'));
//path for serving build react app
app.use(express.static(path.join(__dirname, 'views/app')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(
   session({
      secret: 'passport-tutorial',
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false
   })
);

//cors test
app.use((req, res, next) => {
   //doesn't send response just adjusts it
   res.header('Access-Control-Allow-Origin', '*'); //* to give access to any origin
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization' //to give access to all the headers provided
   );
   if (req.method === 'OPTIONS') {
      res.header(
         'Access-Control-Allow-Methods',
         'PUT, POST, PATCH, DELETE, GET'
      ); //to give access to all the methods provided
      return res.status(200).json({});
   }
   next(); //so that other routes can take over
});
/**
 *    App Error handeling
 */
app.use(errors);

if (!isProduction) {
   app.use(errorHandler());
}

/**
 *    Database access initiation
 *    ATLAS
 *
 */
//const dbURL = require('./config/settings/db').local_DB;
const localDb = 'mongodb://localhost:27017/ghost_kpi_app';
const AtlasDB = 'mongodb+srv://user:user@db0-sxgcb.mongodb.net/ghost_kpi_app';

var dbURL = AtlasDB;
mongoose
   .connect(dbURL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      logger.status('MongoDB connection', 'ok');
      logger.success('Successfully connected to', chalk.underline(dbURL));
   })
   .catch(() => {
      logger.status('MongoDB connection', 'error');
      logger.error('Connection error', dbURL);
      console.log(err);
   });
/**
 *    settings for MongoDB Debugging
 */
mongoose.set('debug', false);
var db = mongoose.connection;

/**
 *    App Models & Routes
 */
require('./models/Users');
require('./models/Employees');
require('./models/EmployeesTypes');
require('./models/KPIs');
require('./models/Projects');
require('./models/Report');
require('./models/Teams');

/**
 *    PASSPORT CONFIG
 */
require('./config/passport/passport');
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api/api'));

module.exports = app;
