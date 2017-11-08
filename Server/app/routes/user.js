'use strict';

const router = require('express').Router();

const Model = require('../models/user');

router.get('/:id', function (req, res) {
	Model.findById(req.params.id, (err, data) => {
		if (err) throw err;
		res.json(data);
	})
});

router.post('/favorite', function (req, res, next) {
	Model.addFavorite(req.user.id, req.body.id, (err, data) => {
		if (err) throw err;
		res.json(data);
	});
});

module.exports = router;