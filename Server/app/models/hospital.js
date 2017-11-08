'use strict';

const model = require('../database').Models.Hospital;

const create = (data, callback) => { new model(data).save(callback) }

const find = (data, callback) => { model.find(data).populate('login', 'email username role').populate('doctors').populate('departments').populate('services').exec(callback) }

const findOne = (data, callback) => { model.findOne(data).populate('login', 'email username role').populate('doctors').populate('departments').populate('services').exec(callback) }

const findById = (id, callback) => { model.findById(id).populate('login', 'email username role').populate('doctors').populate('departments').populate('services').exec(callback) }

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

const addDoctor = (hospitalId, doctorId, callback) => {
	findById(hospitalId, (err, data) => {
		if (err) throw err;
		data.doctors.push(doctorId);
		data.save(callback);
	})
}

const addDepartment = (hospitalId, departmentId, callback) => {
	findById(hospitalId, (err, data) => {
		if (err) throw err;
		data.departments.push(departmentId);
		data.save(callback);
	})
}

const addService = (hospitalId, serviceId, callback) => {
	findById(hospitalId, (err, data) => {
		if (err) throw err;
		data.services.push(serviceId);
		data.save(callback);
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