'use strict';

const router = require('express').Router();

const Model = require('../models/rating');

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

router.post('/', function (req, res, next) {
	req.body._id = req.user.id;
	Model.create(req.body, (err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

module.exports = router;