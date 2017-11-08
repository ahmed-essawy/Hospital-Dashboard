'use strict';

const Mongoose = require('mongoose');

const DepartmentSchema = new Mongoose.Schema({
    name: { type: String, required: true }
});

const departmentModel = Mongoose.model('departments', DepartmentSchema);

module.exports = departmentModel;