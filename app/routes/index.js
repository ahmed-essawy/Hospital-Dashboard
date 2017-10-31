'use strict';

const user = (req, res, next) => isAuthenticated(req, res, next, userRequests);
const doctor = (req, res, next) => isAuthenticated(req, res, next, doctorRequests);


const isAuthenticated = (req, res, next, type) => {
	if (req.isAuthenticated()) type(req, res, next);
	else res.redirect('/login');
}

module.exports = {
	login: loginRequests,
	user,
	doctor
};