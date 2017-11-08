'use strict';

var model = require('../database').Models.Appointment;

const User = require('../models/user');
const Doctor = require('../models/doctor');

const create = (data, callback) => {
	new model(data).save((err, savedData) => {
		User.addAppointment(savedData.user, savedData._id, () => { });
		Doctor.addAppointment(savedData.doctor, savedData._id, () => { });
		callback(err, savedData);
	});
}

const find = (data, callback) => { model.find(data).populate('user', 'firstname lastname picture').populate('doctor', 'firstname lastname picture').populate('review').populate('rating').exec(callback) }

const findOne = (data, callback) => { model.findOne(data).populate('user', 'firstname lastname picture').populate('doctor', 'firstname lastname picture').populate('review').populate('rating').exec(callback) }

const findById = (id, callback) => { model.findById(id).populate('user', 'firstname lastname picture').populate('doctor', 'firstname lastname picture').populate('review').populate('rating').exec(callback) }

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

const addReview = (appointmentId, reviewId, callback) => {
	findById(appointmentId, (err, data) => {
		if (err) throw err;
		data.reviews.push(reviewId);
		data.save(callback);
	})
}

const addRating = (appointmentId, ratingId, callback) => {
	findById(appointmentId, (err, data) => {
		if (err) throw err;
		data.ratings.push(ratingId);
		data.save(callback);
	})
}

module.exports = {
	create,
	find,
	findOne,
	findById,
	findByUser,
	findByDoctor,
	updateById,
	removeById,
	addReview,
	addRating
};