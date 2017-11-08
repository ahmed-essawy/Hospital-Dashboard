'use strict';

const Mongoose = require('mongoose');

const ReviewSchema = new Mongoose.Schema({
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    doctor: { type: Mongoose.Schema.Types.ObjectId, ref: 'doctors', required: true },
    review: { type: String, required: true },
    appointment: { type: Mongoose.Schema.Types.ObjectId, ref: 'appointments' }
});

const reviewModel = Mongoose.model('reviews', ReviewSchema);

module.exports = reviewModel;