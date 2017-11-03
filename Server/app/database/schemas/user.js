'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const UserSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    picture: { type: String, default: config.LOGIN.DEFAULT_USER_PICTURE },
    loginId: { type: Mongoose.Schema.Types.ObjectId, required: true, index: { unique: true } }
});

UserSchema.pre('save', function (next) {
    if (!this.picture || this.picture === "null" || this.picture === "undefined" || this.picture === "") this.picture = config.LOGIN.DEFAULT_USER_PICTURE;
    next();
});

const userModel = Mongoose.model('users', UserSchema);

module.exports = userModel;