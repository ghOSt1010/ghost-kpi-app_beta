const mongoose = require('mongoose');

const { Schema } = mongoose;

const KPIsSchema = new Schema({
   name: { type: String, required: true },
   time_from: { type: Date, default: new Date() },
   time_to: { type: Date, default: new Date() },
   target: { type: Number, required: true, default: 1 },
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects',
      autopopulate: { maxDepth: 2 },
   },
   manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      required: true,
      autopopulate: { maxDepth: 2 },
   },
});

/*
KPIsSchema.pre('deleteOne', { document: true, query: true }, async function (
   next
) {
   // 'this' is the client being removed. Provide callbacks here if you want
   // to be notified of the calls' result.
   try {
      const Reports = mongoose.model('Reports');
      await Reports.deleteMany({ kpi: this._id });
      //await Reports.deleteMany({ kpi: this._id });
      next();
   } catch (err) {
      next(err);
   }
});
*/

KPIsSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('KPIs', KPIsSchema);
