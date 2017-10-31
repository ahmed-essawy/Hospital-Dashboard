'use strict';

const router = require('express').Router();

const Login = require('../models/login');
const Doctor = require('../models/doctor');

router.get('/', function (req, res) {
	Login.find({}, (err, doctors) => {
		if (err) throw err;
		res.json(doctors);
	})
});

router.use((req, res) => res.redirect('/404'));

module.exports = router;