'use strict';

const user = (req, res, next) => isAuthenticated(req, res, next, userRequests);


const isAuthenticated = (req, res, next, type) => {
	if (req.isAuthenticated()) type(req, res, next);
	else res.redirect('/login');
}

module.exports = {
	login: loginRequests,
	user
};