'use strict';

const Mongoose = require('mongoose');
const config = require('../../config');

const HospitalSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String, default: config.LOGIN.DEFAULT_HOSPITAL_PICTURE },
    loginId: { type: Mongoose.Schema.Types.ObjectId, required: true, index: { unique: true } },
    doctors:  { type: [Mongoose.Schema.Types.ObjectId] } ,  
    departments: { type: [String] } ,
    services: { type: [String] }
});

const hospitalModel = Mongoose.model('hospital', HospitalSchema);

module.exports = hospitalModel;

