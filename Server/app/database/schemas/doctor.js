'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const DoctorSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    picture: { type: String, default: config.ACCOUNT.DEFAULT_DOCTOR_PICTURE },
    login: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'logins' },
    hospital: { type: Mongoose.Schema.Types.ObjectId, ref: 'hospitals' },
    appointments: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'appointments' }],
    reviews: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
    ratings: [{ user: { type: Mongoose.Schema.Types.ObjectId, ref: 'ratings' } }]
});

DoctorSchema.pre('save', function (next) {
    if (!this.picture || this.picture === "null" || this.picture === "undefined" || this.picture === "") this.picture = config.ACCOUNT.DEFAULT_DOCTOR_PICTURE;
    next();
});

const doctorModel = Mongoose.model('doctors', DoctorSchema);

module.exports = doctorModel;