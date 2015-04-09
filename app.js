var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ECT = require('ect'); //add ect
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' }); //add ect
var routes = require('./routes/index');
var users = require('./routes/users');
var tennis = require('./models/tennis');
var MongoStore = require('connect-mongo')(session);

var app = express();
//about cookie
app.use(cookieParser());
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'himitsu',
	store: new MongoStore({
		db: 'tennis',
		host: 'localhost',
		clear_interval: 60 * 60
	}),
	cookie: {
		httpOnly: false,
		maxAge: 60 * 60 * 1000
	}		
}));
// view engine setup
app.engine('ect', ectRenderer.render); //modified ect
app.set('view engine', 'ect'); //modified ect

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//認証用関数
var loginCheck = function(req, res, next) {
	if(req.session.user) {
		next();
	}else {
		res.redirect('/login');
	}
}
//getように同じURLで新規ログイン/登録できるようにする。→エラーになることを防ぐ。
app.get('/', function(req, res) {
	res.render('login', {title:"LOGIN"});
});
app.get('/login', function(req, res){
	res.redirect('/');
});
app.get('/add', function(req, res){
	res.render('newGame');
});

app.post('/login', routes.login);
app.post('/add', routes.add);
app.get('/after', loginCheck, function(req, res) {
	var name = req.session.user;
	console.log(name);
	res.render('after', {title: "login後画面", username: name});
});
app.get('/tennis/result', function(req, res) {
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
