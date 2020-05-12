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
      autopopulate: { maxDepth: 2 }
   },
   manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      required: true,
      autopopulate: { maxDepth: 2 }
   }
});

KPIsSchema.pre('findOneAndDelete',function(next){
   mongoose.model('Reports').remove({kpi:this._id}).exec()
   next()
})
KPIsSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('KPIs', KPIsSchema);
