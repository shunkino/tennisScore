var express = require('express');
var router = express.Router();
var User = require('../models/tennis');

exports.add = function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err) {
		if(err) {
			console.log(err);
			res.redirect('back');
		}else {
			res.redirect('/');
		}
	});
}

exports.login = function(req, res) {
	var identification = req.query.ID;
	var password = req.query.password;
	var query = { "ID": identification, "password": password }
	User.find(query, function(err, data) {
		if(err) {
			console.log(err);
		}
		if(data == "") {
			res.render('login');
		}else {
			req.session.user = identification;
			res.redirect('/');
		}
	});
}
