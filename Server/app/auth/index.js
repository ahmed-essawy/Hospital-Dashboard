'use strict';

const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Login = require('../models/login');

const init = function () {

	passport.serializeUser(function (login, done) {
		done(null, login.id);
	});

	passport.deserializeUser(function (id, done) {
		Login.findById(id, function (err, login) {
			done(err, login);
		});
	});


	passport.use(new LocalStrategy(
		function (username, password, done) {
			Login.findOne({ $or: [{ 'email': new RegExp('^' + username + '$', 'i') }, { 'username': new RegExp('^' + username + '$', 'i') }] }, function (err, login) {
				if (err) return done(err);
				if (!login) return done(null, false, { message: 'Incorrect username or password.' });

				login.validatePassword(password, function (err, isMatch) {
					if (err) return done(err);
					if (!isMatch) return done(null, false, { message: 'Incorrect username or password.' });
					login._doc.success = true;
					delete login._doc.password;

					return done(null, login);
				});
			});
		}
	));

	return passport;
}

module.exports = init();