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
			console.log("adding user succeed.");
			res.redirect('/');
		}
	});
}

exports.login = function(req, res) {
	var identification = req.body.ID;
	var password = req.body.password;
	var query = { "ID": identification, "password": password }
	console.log(query);
	User.find(query, function(err, data) {
		if(err) {
			console.log(err);
		}
		if(data == "") {
			res.render('login', {title: "login 失敗画面"});
		}else {
			console.log("login has been succeeded");
			req.session.user = identification;
			res.redirect('/after');
		}
	});
}
