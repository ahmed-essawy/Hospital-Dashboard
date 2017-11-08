'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const loginRequests = require('./login');
const accountRequests = require('./account');
const userRequests = require('./user');
const doctorRequests = require('./doctor');
const hospitalRequests = require('./hospital');
const appointmentRequests = require('./appointment');
const departmentRequests = require('./department');

const isAuthenticated = (req, res, next) => {
	let authorization = req.get('Authorization');
	if (req.headers && authorization && authorization.split(' ')[0] === 'JWT') {
		jwt.verify(authorization.split(' ')[1], config.APPLICATION.JWTOKENSECRET, function (err, decode) {
			if (err) {
				req.user = undefined;
				res.status(401).end();
			}
			else {
				req.user = decode;
				next();
			}
		});
	} else {
		req.user = undefined;
		res.status(401).end();
	}
}

module.exports = {
	login: loginRequests,
	account: accountRequests,
	user: userRequests,
	doctor: doctorRequests,
	hospital: hospitalRequests,
	appointment: appointmentRequests,
	department: departmentRequests,
	isAuthenticated
};