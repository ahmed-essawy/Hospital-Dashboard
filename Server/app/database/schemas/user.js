'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const UserSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    picture: { type: String, default: config.LOGIN.DEFAULT_USER_PICTURE },
    loginId: { type: Mongoose.Schema.Types.ObjectId, required: true, index: { unique: true } }
});

const userModel = Mongoose.model('users', UserSchema);

module.exports = userModel;