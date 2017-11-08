'use strict';

const router = require('express').Router();

const Model = require('../models/doctor');

router.get('/', function (req, res) {
	Model.find({}, (err, data) => {
		if (err) throw err;
		res.json(data);
	})
});

router.get('/:id', function (req, res) {
	Model.findById(req.params.id, (err, data) => {
		if (err) throw err;
		res.json(data);
	})
});

module.exports = router;