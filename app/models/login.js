'use strict';

const loginModel = require('../database').Models.Login;
const userModel = require('../database').Models.User;
const doctorModel = require('../database').Models.Doctor;
const hospitalModel = require('../database').Models.Hospital;


const create = (data, callback) => { new loginModel(data).save(callback) }

const find = (data, callback) => { loginModel.find(data, callback) }

const findOne = (data, callback) => { loginModel.findOne(data, callback) }

const findById = (id, callback) => { loginModel.findById(id, callback) }

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
		loginModel.remove(data, callback);
	})
}

const isUser = (req, res, next) => {
	userModel.findOne({ loginId: req.user._id }, (err, user) => {
		if (err) throw err;
		if (user && user.role === 'user') next();
		else if (!user && req.user.isCompleted) res.redirect('/#' + req.user.role);
		else res.status(401).end();
	});
};

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect('/');
};

const isDoctor = (req, res, next) => {
	doctorModel.findOne({ loginId: req.doctor._id }, (err, doctor) => {
		if (err) throw err;
		if (doctor && doctor.role === 'doctor') next();
		else if (!doctor && req.doctor.isCompleted) res.redirect('/#' + req.doctor.role);
		else res.status(401).end();
	});
};

const isHospital = (req, res, next) => {
	hospitalModel.findOne({ loginId: req.hospital._id }, (err, hospital) => {
		if (err) throw err;
		if (hospital && hospital.role === 'hospital') next();
		else if (!hospital && req.hospital.isCompleted) res.redirect('/#' + req.hospital.role);
		else res.status(401).end();
	});
};

module.exports = {
	create,
	find,
	findOne,
	findById,
	updateById,
	removeById,
	isUser,
	isAuthenticated,
	isDoctor,
	isHospital
};