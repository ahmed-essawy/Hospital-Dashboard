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
		Login: require('./schemas/login.js'),
		User: require('./schemas/user.js'),
		Doctor: require('./schemas/doctor.js')
	}
};