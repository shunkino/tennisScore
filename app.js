var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ECT = require('ect'); //add ect
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' }); //add ect
var routes = require('./routes/index');
var users = require('./routes/users');
var tennis = require('./models/tennis');

var app = express();

// view engine setup
app.engine('ect', ectRenderer.render); //modified ect
app.set('view engine', 'ect'); //modified ect

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res) {
	res.redirect('tennis/results');
});

app.get('tennis/result', function(req, res) {
	tennis.find({}, function(err, results) {
		if(err) throw err;
		res.render('list', {title:'Tennis Result Screen', results:results});
	});
});
//app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
