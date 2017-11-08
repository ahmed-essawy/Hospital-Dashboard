'use strict';

const Mongoose = require('mongoose');

const ServiceSchema = new Mongoose.Schema({
    name: { type: String, required: true }
});

const serviceModel = Mongoose.model('services', ServiceSchema);

module.exports = serviceModel;