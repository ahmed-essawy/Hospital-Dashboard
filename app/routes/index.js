'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const Login = require('../models/login');
const User = require('../models/user');

router.get('/', function (req, res, next) {
	if (req.isAuthenticated() && req.user && req.user.role !== '') {
		if (req.user.isCompleted)
			res.redirect('/' + req.user.role);
		else
			res.redirect('/' + req.user.role);
	}
	else
		res.render('login', { success: req.flash('success')[0], errors: req.flash('error') });
});

router.get('/login', function (req, res) {
	res.render('login', { success: req.flash('success')[0], errors: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/register', function (req, res) {
	res.render('register', { success: req.flash('success')[0], errors: req.flash('error') });
});

router.post('/register', function (req, res, next) {
	const account = {
		'fname': req.body.fname,
		'lname': req.body.lname,
		'email': req.body.email,
		'username': req.body.username,
		'pass1': req.body.password1,
		'pass2': req.body.password2,
		'role': req.body.role,
	}
	if (account.fname === '' || account.lname === '' || account.email === '' || account.username === '' || account.pass1 === '' || account.pass2 === '' || account.role === '') {
		req.flash('data', account);
		req.flash('error', 'Missing credentials');
		res.redirect('/register');
	}
	else if (account.pass1 !== account.pass2) {
		account.pass2 = null;
		req.flash('data', account);
		req.flash('error', 'Password not matched');
		res.redirect('/register');
	}
	else {
		const credentials = { 'email': account.email, 'username': account.username, 'password': account.pass1, 'role': account.role };
		Login.findOne({ $or: [{ 'email': new RegExp('^' + credentials.email + '$', 'i') }, { 'username': new RegExp('^' + credentials.username + '$', 'i') }] }, function (err, login) {
			if (err) throw err;
			if (login) {
				account.email = account.username = null;
				req.flash('data', account);
				req.flash('error', 'Email or Username already exists.');
				res.redirect('/register');
			} else {
				Login.create(credentials, function (err2, newLogin) {
					if (err2) throw err2;
					req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});

router.get('/logout', function (req, res, next) {
	req.logout();
	req.session = null;
	res.redirect('/');
});

router.use('/user', [Login.isAuthenticated, Login.isUser, require('./user')])
//	.use('/API', [Login.isUser, require('./API')]);

module.exports = router;