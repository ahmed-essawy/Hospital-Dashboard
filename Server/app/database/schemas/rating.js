'use strict';

const Mongoose = require('mongoose');

const RatingSchema = new Mongoose.Schema({
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    doctor: { type: Mongoose.Schema.Types.ObjectId, ref: 'doctors', required: true },
    rating: { type: Number, required: true },
    appointment: { type: Mongoose.Schema.Types.ObjectId, ref: 'appointments' }
});

const ratingModel = Mongoose.model('ratings', RatingSchema);

module.exports = ratingModel;