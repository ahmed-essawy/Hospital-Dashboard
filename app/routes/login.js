'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const Login = require('../models/login');

const authenticate = function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) throw err;
		if (info) return res.json(info);
		if (user)
			req.logIn(user, function (err2) {
				if (err2) throw err2;
				return res.json(user);
			});
	})(req, res, next);
}

router.post('/login', authenticate);

router.post('/register', function (req, res, next) {
	const account = {
		'email': req.body.email,
		'username': req.body.username,
		'pass1': req.body.password1,
		'pass2': req.body.password2,
		'role': req.body.role,
	}
	if (account.email === '' || account.username === '' || account.pass1 === '' || account.pass2 === '' || account.role === '')
		res.json({ "success": false, "message": "Missing credentials." });
	else if (account.pass1 !== account.pass2) {
		account.pass2 = null;
		res.json({ "success": false, "message": "Password not matched.", "account": account });
	}
	else {
		const credentials = { 'email': account.email, 'username': account.username, 'password': account.pass1, 'role': account.role };
		Login.findOne({ $or: [{ 'email': new RegExp('^' + credentials.email + '$', 'i') }, { 'username': new RegExp('^' + credentials.username + '$', 'i') }] }, function (err, login) {
			if (err) throw err;
			if (login) res.json({ "success": false, "message": "Email or Username already exists." });
			else {
				Login.create(credentials, function (err2, newLogin) {
					if (err2) throw err2;
					req.body.password = account.pass1;
					next();
				});
			}
		});
	}
}, authenticate);

router.get('/logout', function (req, res, next) {
	req.logout();
	req.session = null;
	res.redirect('/');
});

router.use((req, res) => res.redirect('/404'));

module.exports = router;