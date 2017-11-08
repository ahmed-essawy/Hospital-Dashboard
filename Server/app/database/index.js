'use strict';

const config = require('../config');
const Mongoose = require('mongoose');

const dbURI = "mongodb://" +
	encodeURIComponent(config.MongoDB.USERNAME) + ":" +
	encodeURIComponent(config.MongoDB.PASSWORD) + "@" +
	config.MongoDB.HOST + ":" +
	config.MongoDB.PORT + "/" +
	config.MongoDB.NAME;

Mongoose.connect(dbURI, { useMongoClient: true });

Mongoose.connection.on('error', function (err) {
	if (err) throw err;
});

Mongoose.Promise = global.Promise;

module.exports = {
	Mongoose,
	Models: {
		Appointment: require('./schemas/appointment.js'),
		Department: require('./schemas/department.js'),
		Doctor: require('./schemas/doctor.js'),
		Hospital: require('./schemas/hospital.js'),
		Login: require('./schemas/login.js'),
		Rating: require('./schemas/rating.js'),
		Review: require('./schemas/review.js'),
		Service: require('./schemas/service.js'),
		User: require('./schemas/user.js')
	}
};