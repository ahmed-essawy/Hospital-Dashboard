'use strict';

var model = require('../database').Models.Review;

const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

const create = (data, callback) => {
	new model(data).save((err, savedData) => {
		Doctor.addAppointment(savedData.doctor, savedData._id, () => { });
		Appointment.addReview(savedData.appointment, savedData._id, () => { });
		callback(err, savedData)
	});
}

const find = (data, callback) => { model.find(data).populate('user', 'firstname lastname picture').populate('doctor', 'firstname lastname picture').populate('appointment', 'date').exec(callback) }

const findOne = (data, callback) => { model.findOne(data).populate('user', 'firstname lastname picture').populate('doctor', 'firstname lastname picture').populate('appointment', 'date').exec(callback) }

const findById = (id, callback) => { model.findById(id).populate('user', 'firstname lastname picture').populate('doctor', 'firstname lastname picture').populate('appointment', 'date').exec(callback) }

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

const findByUser = (userId, callback) => find({ user: userId }, callback);

const findByDoctor = (doctorId, callback) => find({ doctor: doctorId }, callback);

module.exports = {
	create,
	find,
	findOne,
	findById,
	findByUser,
	findByDoctor,
	updateById,
	removeById
};