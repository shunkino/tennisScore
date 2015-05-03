var express = require('express');
var router = express.Router();
var User = require('../models/tennis');

exports.add = function(req, res) {
	console.log(req.body);
	var newUser = new User(req.body);
	newUser.save(function(err) {
		if(err) {
			console.log(err);
			console.log("重複しちゃったね！！")
			res.redirect('back');
		}else {
			var identification = req.body.ID;
			console.log("adding user succeed.");	
			req.session.user = identification;
			res.redirect('/after');
		}
	});
}

exports.login = function(req, res) {
	var identification = req.body.ID;
	var password = req.body.Password;
	var query = { "ID": identification, "Password": password };
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
