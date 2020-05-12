const mongoose = require('mongoose');
const Reports = mongoose.model('Reports');
const KPIs = mongoose.model('KPIs');
const Projects = mongoose.model('Projects');

//const logger = require('../modules/logger/logger');

class ReportssController {
   static async create(req, res, err) {
      const {
         body: { Report }
      } = req;

      var kpi = await KPIs.findOne({ _id: Report.kpi }).exec();

      Report.completed = Report.result / kpi.target;
      Report.status = Report.result >= kpi.target ? true : false;

      var rep = new Reports(Report);
      rep.save()
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json(err);
         });
   }

   static getAll(req, res, err) {
      return Reports.find()
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json({ message: err });
         });
   }

   static getByKPIid(req, res, err) {
      return Reports.find({ kpi: req.params.id })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json({ message: err });
         });
   }

   static async getByProjectId(req, res, err) {
      try {
         var reports = await KPIs.aggregate([
            {
               $match: {
                  project: mongoose.Types.ObjectId(req.params.id)
               }
            },
            {
               $lookup: {
                  from: 'reports',
                  localField: '_id',
                  foreignField: 'kpi',
                  as: 'reports'
               }
            }
         ]);
      } catch (err) {
         res.status(422).json({ message: err });
      }
      return res.status(200).json(reports);
   }

   static getByID(req, res, err) {
      return Reports.findById(req.params.id)
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json({ message: err });
         });
   }

   static update(req, res, err) {
      const {
         body: { Reports }
      } = req;

      return Reports.findOneAndUpdate({ _id: Reports._id }, Reports, {
         upsert: true
      })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json(err);
         });
   }

   static async deleteByID(req, res, err) {
      return await Reports.findOneAndDelete({
         _id: req.params.id
      })
         .then(doc => {
            try{
               const Reports = mongoose.model('Reports')
               Reports.deleteMany({kpi:req.params.id}).exec()
            }catch(e){
              res.status(422).json(err);
            }
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json(err);
         });
   }
}
module.exports = ReportssController;
