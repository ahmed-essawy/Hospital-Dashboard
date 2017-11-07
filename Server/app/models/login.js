'use strict';

const loginModel = require('../database').Models.Login;
const userModel = require('../database').Models.User;
const doctorModel = require('../database').Models.Doctor;
const hospitalModel = require('../database').Models.Hospital;


const create = (data, callback) => {
	new loginModel(data).save((err, newLogin) => {
		if (err) throw err;
		let account = new userModel({
			firstname: data.firstname,
			lastname: data.lastname,
			picture: data.picture,
			login: newLogin
		});
		if (newLogin.role === 'doctors')
			account = new doctorModel({
				firstname: data.firstname,
				lastname: data.lastname,
				picture: data.picture,
				login: newLogin
			});
		if (newLogin.role === 'hospitals')
			account = new hospitalModel({
				name: data.firstname,
				picture: data.picture,
				login: newLogin
			});
		account.save((err, newAccount) => {
			if (err) throw err;
			newLogin.account = newAccount;
			newLogin.save(callback);
		});
	});
}

const find = (data, callback) => { loginModel.find(data).populate('account').exec(callback) }

const findOne = (data, callback) => { loginModel.findOne(data).populate('account').exec(callback) }

const findById = (id, callback) => { loginModel.findById(id).populate('account').exec(callback) }

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
		loginModel.remove(data, callback);
	})
}

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.status(401).end();
};

module.exports = {
	create,
	find,
	findOne,
	findById,
	updateById,
	removeById,
	isAuthenticated
};