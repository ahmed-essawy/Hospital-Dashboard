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

module.exports = router;