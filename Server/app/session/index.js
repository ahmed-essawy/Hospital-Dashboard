'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('../database');
const config = require('../config');

const init = function () {
	if (process.env.NODE_ENV === 'production') {
		return session({
			secret: config.APPLICATION.SESSIONSECRET,
			resave: false,
			saveUninitialized: false,
			unset: 'destroy',
			store: new MongoStore({ mongooseConnection: db.Mongoose.connection })
		});
	} else {
		return session({
			secret: config.APPLICATION.SESSIONSECRET,
			resave: false,
			saveUninitialized: true,
			unset: 'destroy'
		});
	}
}

module.exports = init();