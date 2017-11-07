'use strict';

const Mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const config = require('../../config');

const LoginSchema = new Mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, default: null },
    role: { type: String, enum: ['users', 'doctors', 'hospitals'] },
    account: { type: Mongoose.Schema.Types.ObjectId, refPath: 'role' }
});

LoginSchema.pre('save', function (next) {
    const login = this;

    if (!login.isModified('password')) return next();

    bcrypt.genSalt(config.APPLICATION.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(login.password, salt, null, function (err, hash) {
            if (err) return next(err);
            login.password = hash;
            next();
        });
    });
});

LoginSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const loginModel = Mongoose.model('logins', LoginSchema);

module.exports = loginModel;