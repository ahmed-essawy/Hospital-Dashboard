'use strict';

const model = require('../database').Models.Hospital;

const create = (data, callback) => { new model(data).save(callback) }

const find = (data, callback) => { model.find(data, callback) }

const findOne = (data, callback) => { model.findOne(data, callback) }

const findById = (id, callback) => { model.findById(id, callback) }

const updateById = (id, newData, callback) => {
	findById(id, (err, data) => {
		if (err) throw err;
		for (var key in data)
			if (data.hasOwnProperty(key))
				data[key] = newData[key];
		data.save(callback);
	})
}

const removeById = (id, callback) => {
	findById(id, (err, data) => {
		if (err) throw err;
		model.remove(data, callback);
	})
}

module.exports = {
	create,
	find,
	findOne,
	findById,
	updateById,
	removeById
};