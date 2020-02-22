const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeesSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, index: true },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      autopopulate: { maxDepth: 2 }
   },
   type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeesTypes',
      autopopulate: { maxDepth: 2 },
      required: true
   },
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects',
      autopopulate: { maxDepth: 2 },
      required: true
   },
   team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teams',
      autopopulate: { maxDepth: 2 },
      required: true
   }
});

EmployeesSchema.methods.getID = function() {
   return {
      _id: this._id
   };
};

EmployeesSchema.methods.getEmail = function() {
   return {
      email: this.email
   };
};

EmployeesSchema.methods.reportsTo = function() {
   return {
      rm: EmployeesSchema.find({ _id: this.rm }, { name: 1, role: 1, email: 1 })
   };
};

EmployeesSchema.index({ _id: 1, email: 1 }, { unique: true });
EmployeesSchema.path('email').required(true, 'email is mandatory');
EmployeesSchema.plugin(require('mongoose-unique-validator'));
EmployeesSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('Employees', EmployeesSchema);
