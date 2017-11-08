'use strict';

const Mongoose = require('mongoose');

const AppointmentSchema = new Mongoose.Schema({
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    doctor: { type: Mongoose.Schema.Types.ObjectId, ref: 'doctors', required: true },
    date: { type: Date, default: new Date(), required: true },
    review: { type: Mongoose.Schema.Types.ObjectId, ref: 'reviews' },
    rating: { type: Mongoose.Schema.Types.ObjectId, ref: 'ratings' }
});

const appointmentModel = Mongoose.model('appointments', AppointmentSchema);

module.exports = appointmentModel;