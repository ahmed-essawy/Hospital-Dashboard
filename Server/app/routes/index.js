'use strict';

const loginRequests = require('./login');
const userRequests = require('./user');
const doctorRequests = require('./doctor');
const hospitalRequests = require('./hospital');

const user = (req, res, next) => isAuthenticated(req, res, next, userRequests);
const doctor = (req, res, next) => isAuthenticated(req, res, next, doctorRequests);
const hospital = (req, res, next) => isAuthenticated(req, res, next, hospitalRequests);


const isAuthenticated = (req, res, next, type) => {
	if (req.isAuthenticated()) type(req, res, next);
	else res.status(401).end();
}

module.exports = {
	login: loginRequests,
	user,
	doctor,
	hospital
};