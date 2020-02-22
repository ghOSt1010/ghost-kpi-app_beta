const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportsSchema = new Schema({
   kpi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KPIs',
      autopopulate: { maxDepth: 2 }
   },
   reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      autopopulate: { maxDepth: 2 }
   },
   result: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0
   },
   completed: { type: Number, required: true, default: 0 },
   status: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
      default: true
   },
   reportedAt: { type: Date, default: Date.now }
});

ReportsSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('Reports', ReportsSchema);
