'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const DoctorSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    picture: { type: String, default: config.ACCOUNT.DEFAULT_DOCTOR_PICTURE },
    login: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'logins' },
    appointments: [{ userId: { type: Mongoose.Schema.Types.ObjectId }, appointment: { type: String } }],
    reviews: [{ userId: { type: Mongoose.Schema.Types.ObjectId }, review: { type: String } }],
    ratings: [{ userId: { type: Mongoose.Schema.Types.ObjectId }, rating: { type: Number } }]
});

DoctorSchema.pre('save', function (next) {
    if (!this.picture || this.picture === "null" || this.picture === "undefined" || this.picture === "") this.picture = config.ACCOUNT.DEFAULT_DOCTOR_PICTURE;
    next();
});

const doctorModel = Mongoose.model('doctors', DoctorSchema);

module.exports = doctorModel;