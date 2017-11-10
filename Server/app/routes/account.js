'use strict';

const router = require('express').Router();
const formidable = require('formidable');
const fs = require('fs');

const Login = require('../models/login');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

router.get('/', function (req, res) {
	Login.findById(req.user.loginId, (err, loginAccount) => {
		if (err) throw err;
		let response = loginAccount.account;
		response._doc.email = loginAccount.email;
		response._doc.username = loginAccount.username;
		response._doc.role = loginAccount.role;
		res.json(response);
	})
});

router.put('/', function (req, res, next) {
	const form = new formidable.IncomingForm(), account = {};
	form.parse(req);
	form.on('field', function (name, value) {
		account[name] = value;
	});
	form.on('file', function (field, file) {
		account.picture = `data:${file.type};base64, ${new Buffer(fs.readFileSync(file.path)).toString("base64")}`;
	});
	form.on('end', function () {
		if (account._id === '' || account.username === '' || account.email === '' || account.password === '' || account.firstname === '' || account.lastname === '')
			res.json({ "success": false, "message": "Missing credentials." });
		else if (account.password1 && account.password1 !== account.password2) {
			account.password2 = null;
			res.json({ "success": false, "message": "Password not matched.", "account": account });
		}
		else {
			Login.findById(account.login, function (err, login) {
				if (err) res.json({ "success": false, "message": err });
				if (!login) res.json({ "success": false, "message": 'Incorrect password.' });
				login.validatePassword(account.password, function (err2, isMatch) {
					if (err) res.json({ "success": false, "message": err2 });
					if (!isMatch) res.json({ "success": false, "message": 'Incorrect password.' });
					else {
						Login.updateById(account.login, account, (err3, response, affected) => {
							console.log(affected);
							if (err3) res.json({ "success": false, "message": err3 });
							if (response._id) {
								delete account.password;
								delete account.password1;
								delete account.password2;
								let table = User;
								if (login.role === 'doctors') table = Doctor;
								if (login.role === 'hospitals') table = Hospital;
								table.updateById(account._id, account, (err4, response2, affected2) => {
									if (err4) res.json({ "success": false, "message": err4 });
									if (response2._id) res.json({ "success": true, "account": account, affected: affected + affected2 });
									else res.json({ "success": false, "message": err });
								})
							}
							else res.json({ "success": false, "message": err });
						});
					}
				});
			});
		}
	})
});

module.exports = router;