const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeesTypes = new Schema({
   type: { type: String, index: true, required: true }
});

EmployeesTypes.index({ type: 1 }, { unique: true });
EmployeesTypes.path('type').required(true, 'Type is required');

EmployeesTypes.plugin(require('mongoose-unique-validator'));
mongoose.model('EmployeesTypes', EmployeesTypes);
