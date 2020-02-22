const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const ProjectsSchema = new Schema({
   name: { type: String, index: true, required: true },
   manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      autopopulate: { maxDepth: 2 },
      required: true
   }
});

ProjectsSchema.index({ name: 1 }, { unique: true });
ProjectsSchema.path('name').required(true, 'Project name is required');
ProjectsSchema.plugin(uniqueValidator);
ProjectsSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('Projects', ProjectsSchema);
