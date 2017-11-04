'use strict';

const router = require('express').Router();

const Login = require('../models/login');
const User = require('../models/user');

router.get('/', function (req, res) {
	Login.find({}, (err, users) => {
		if (err) throw err;
		res.json(users);
	})
});

router.put('/profile', function (req, res, next) {
	let obj = { success: false };
	Login.updateById(req.body.id, req.body, (err, response, affected) => {
		if (err) { obj.error = err; res.json(obj); }
		if (response._id) {
			obj.response = response;
			obj.affected = affected;
			User.updateById(req.body.accountId, req.body, (err2, response2, affected2) => {
				if (err2) { obj.error = err2; res.json(obj); }
				if (response2._id) {
					obj.success = true;
					obj.response2 = response2;
					obj.affected2 = affected2;
					res.json(obj);
				}
				else res.json(obj);
			})
		}
		else res.json(obj);

	})
});

module.exports = router;