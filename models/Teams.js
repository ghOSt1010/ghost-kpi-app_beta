const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const TeamsSchema = new Schema({
   name: { type: String, index: true, required: true },
   manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      autopopulate: { maxDepth: 2 },
      required: true
   }
});

TeamsSchema.index({ name: 1 }, { unique: true });
TeamsSchema.path('name').required(true, 'Team name is required');
TeamsSchema.plugin(uniqueValidator);
TeamsSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('Teams', TeamsSchema);
