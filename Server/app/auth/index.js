'use strict';

const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const Login = require('../models/login');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const init = function () {

	passport.serializeUser(function (login, done) {
		done(null, login._id);
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
					delete login._doc.password;
					login._doc.token = jwt.sign({ id: login._id, iat: Math.floor(Date.now() / 1000) - 30 }, config.APPLICATION.JWTOKENSECRET);
					login._doc.success = true;

					return done(null, login);
				});
			});
		}
	));

	return passport;
}

module.exports = init();