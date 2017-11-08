'use strict';

const model = require('../database').Models.User;

const create = (data, callback) => { new model(data).save(callback) }

const find = (data, callback) => { model.find(data).populate('login', 'email username role').populate('favorites', 'firstname lastname picture').populate('appointments').populate('favorites.hospital').exec(callback) }

const findOne = (data, callback) => { model.findOne(data).populate('login', 'email username role').populate('favorites', 'firstname lastname picture').populate('appointments').populate('favorites.hospital').exec(callback) }

const findById = (id, callback) => { model.findById(id).populate('login', 'email username role').populate('favorites', 'firstname lastname picture').populate('appointments').populate('favorites.hospital').exec(callback) }

const updateById = (id, newData, callback) => {
	findById(id, (err, data) => {
		if (err) throw err;
		for (var i = 0, keys = Object.keys(newData); i < keys.length; ++i)
			if (data._doc[keys[i]] && newData[keys[i]])
				data[keys[i]] = newData[keys[i]];
		data.save(callback);
	})
}

const removeById = (id, callback) => {
	findById(id, (err, data) => {
		if (err) throw err;
		model.remove(data, callback);
	})
}

const addAppointment = (userId, appointmentId, callback) => {
	findById(userId, (err, data) => {
		if (err) throw err;
		data.appointments.push(appointmentId);
		data.save(callback);
	})
}

const addFavorite = (userId, doctorId, callback) => {
	findById(userId, (err, data) => {
		if (err) throw err;
		data.favorites.push(doctorId);
		data.save(callback);
	})
}

module.exports = {
	create,
	find,
	findOne,
	findById,
	updateById,
	removeById,
	addAppointment,
	addFavorite
};