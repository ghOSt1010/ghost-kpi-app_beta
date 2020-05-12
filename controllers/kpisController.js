const mongoose = require('mongoose');
//var ObjectId = require('mongoose').Types.ObjectId;
const KPIs = mongoose.model('KPIs');
const Reports = mongoose.model('Reports');
//const logger = require('../modules/logger/logger');

class KPIsController {
   static create(req, res, err) {
      const {
         body: { kpi },
      } = req;

      if (kpi.target === 0) {
         kpi.target = 1;
      }

      var KPI = new KPIs(kpi);
      KPI.save()
         .then((doc) => {
            res.status(200).json(doc);
         })
         .catch((err) => {
            console.log(err);
            res.status(422).json(err);
         });
   }

   static getAll(req, res, err) {
      return KPIs.find()
         .then((doc) => {
            res.status(200).json(doc);
         })
         .catch((err) => {
            res.status(422).json({ message: err });
         });
   }

   static getByID(req, res, err) {
      return KPIs.findOne({ _id: req.params.id })
         .then((doc) => {
            res.status(200).json(doc);
         })
         .catch((err) => {
            res.status(422).json({ message: err });
         });
   }

   static getKPIsByProjectID(req, res, err) {
      return KPIs.find({
         project: req.params.project,
      })
         .then((doc) => {
            res.status(200).json(doc);
         })
         .catch((err) => {
            res.status(422).json(err);
         });
   }

   static update(req, res, err) {
      const {
         body: { kpi },
      } = req;

      return KPIs.findOneAndUpdate({ _id: kpi._id }, kpi, {
         upsert: true,
      })
         .then((doc) => {
            res.status(200).json(doc);
         })
         .catch((err) => {
            res.status(422).json(err);
         });
   }

   static async deleteByID(req, res, err) {
      try {
         let doc = await KPIs.deleteOne({
            _id: req.params.id,
         }).exec();
         let reports_removed = await Reports.deleteMany({
            kpi: req.params.id,
         }).exec();
         res.status(200).json(doc);
      } catch (err) {
         res.status(422).json(err);
      }
   }
}
module.exports = KPIsController;
