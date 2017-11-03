'use strict';

const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Login = require('../models/login');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

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
					login._doc.success = false;
					let table = User;
					if (login.role === 'doctor') table = Doctor;
					else if (login.role === 'hospital') table = Hospital;
					let account = { id: login._id, email: login.email, username: login.username, role: login.role };
					delete login._doc.email;
					delete login._doc.role;
					delete login._doc.username;
					delete login._doc.password;
					table.findByLoginId(login._id, function (err2, response) {
						if (err2) throw err2;
						if (response) {
							if (account.role === 'hospital') account.name = response.name;
							else {
								account.firstname = response.firstname;
								account.lastname = response.lastname;
							}
							login._doc.success = true;
							account.picture = response.picture;
							account.token = "";
							login._doc.account = account;
						}

						return done(null, login);
					});
				});
			});
		}
	));

	return passport;
}

module.exports = init();