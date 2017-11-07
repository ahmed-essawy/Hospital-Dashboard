'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const formidable = require('formidable');
const fs = require('fs');

const Login = require('../models/login');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

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
	const form = new formidable.IncomingForm(), account = {};
	form.parse(req);
	form.on('field', function (name, value) {
		account[name] = value;
	});
	form.on('file', function (field, file) {
		account.picture = `data:${file.type};base64, ${new Buffer(fs.readFileSync(file.path)).toString("base64")}`;
	});
	form.on('end', function () {
		if (account.username === '' || account.email === '' || account.password1 === '' || account.password2 === '' || account.role === '' || account.firstname === '' || (account.role !== 'hospitals' && account.lastname === ''))
			res.json({ "success": false, "message": "Missing credentials." });
		else if (account.password1 !== account.password2) {
			account.password2 = null;
			res.json({ "success": false, "message": "Password not matched.", "account": account });
		}
		else {
			account.password = account.password1;
			Login.findOne({ $or: [{ 'email': new RegExp('^' + account.email + '$', 'i') }, { 'username': new RegExp('^' + account.username + '$', 'i') }] }, function (err, login) {
				if (err) throw err;
				if (login) res.json({ "success": false, "message": "Email or Username already exists." });
				else {
					Login.create(account, function (err2, newLogin, changed) {
						if (err2) throw err2;
						if (changed) {
							req.body.username = account.username;
							req.body.password = account.password1;
							next();
						}
						else res.json({ "success": false, "message": "Error while register.", "account": account });
					});
				}
			});
		}
	})
}, authenticate);

router.get('/logout', function (req, res, next) {
	req.logout();
	req.session = null;
	res.json({ success: true });
});

module.exports = router;