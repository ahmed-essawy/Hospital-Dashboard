'use strict';

const router = require('express').Router();

const Login = require('../models/login');
const Hospital = require('../models/hospital');

router.get('/', function (req, res) {
	Login.find({}, (err, hospitals) => {
		if (err) throw err;
		res.json(hospitals);
	})
});

router.use((req, res) => res.redirect('/404'));

module.exports = router;