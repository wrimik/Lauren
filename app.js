var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var orm = require('orm');
var expressControllers = require('express-controller');

var app = express();

/**
 * first handle cookies and static files.
 */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Config View Engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Parse request body for things like POST values
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Load models into database schema
 */
app.use(orm.express("mysql://" + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_DATABASE,
    {
        define: function (db, models, next) {
            var m = require('./app/models');
            models.Piece   = db.define('piece', m['Piece'].schema, m['Piece'].options);
            models.Contact = db.define('contact', m['Contact'].schema, m['Contact'].options);
            db.sync();
            next();
        }
    })
);

/**
 * Set Routes Via Controllers
 */
app.use(require('./app/Controllers/HomeController'));
app.use('/admin', require('./app/Controllers/PieceController'));

/**
 * Handle Errors
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (app.get('env') !== 'development') {
        err = {};
    }
    res.status(err.status || 500);
    res.render('error', {
            message: err.message,
            error: err
    });
});


module.exports = app;
