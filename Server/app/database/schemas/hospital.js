'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const HospitalSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String, default: config.ACCOUNT.DEFAULT_HOSPITAL_PICTURE },
    login: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'logins' },
    doctors: { type: [Mongoose.Schema.Types.ObjectId] },
    departments: { type: [String] },
    services: { type: [String] }
});

HospitalSchema.pre('save', function (next) {
    if (!this.picture || this.picture === "null" || this.picture === "undefined" || this.picture === "") this.picture = config.ACCOUNT.DEFAULT_HOSPITAL_PICTURE;
    next();
});

const hospitalModel = Mongoose.model('hospitals', HospitalSchema);

module.exports = hospitalModel;