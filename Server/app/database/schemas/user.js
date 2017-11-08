'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const UserSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    picture: { type: String, default: config.ACCOUNT.DEFAULT_USER_PICTURE },
    login: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'logins' },
    appointments: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'appointments' }],
    favorites: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'doctors' }]
});

UserSchema.pre('save', function (next) {
    if (!this.picture || this.picture === "null" || this.picture === "undefined" || this.picture === "") this.picture = config.ACCOUNT.DEFAULT_USER_PICTURE;
    next();
});

const userModel = Mongoose.model('users', UserSchema);

module.exports = userModel;