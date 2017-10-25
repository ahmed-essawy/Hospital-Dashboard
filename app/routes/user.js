'use strict';

const router = require('express').Router();
const User = require('../models/user');

router.get('/', function (req, res, next) {
	res.json({ "API": "User" });
});

router.post('/register', function (req, res, next) {
	res.json({ "register": "User" });
});

module.exports = router;