const mongoose = require('mongoose');
const EmployeesTypes = mongoose.model('EmployeesTypes');
//const logger = require('../modules/logger/logger');

class EmployeesTypesController {
   static getAll(req, res, err) {
      return EmployeesTypes.find()
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(400).json(err);
         });
   }

   static getByID(req, res, err) {
      EmployeesTypes.find({ _id: req.params.id })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(400).json(err);
         });
   }

   static craete(req, res, err) {
      const {
         body: { employeetype }
      } = req;

      const EmployeeType = new Types(role);

      return EmployeeType.save()
         .then(() => {
            res.status(200).json({ message: 'ok' });
         })
         .catch(err => {
            res.status(422).json(err);
         });
   }

   static async remove(req, res, err) {
      const id = req.params.id;

      return await EmployeesTypes.findOneAndDelete({ _id: id })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(400).json(err);
         });
   }

   static async update(req, res, err) {
      const {
         body: { employeeType }
      } = req;

      EmployeesTypes.findOneAndUpdate(
         { _id: employeeType._id },
         employeeType,
         { upsert: true },
         (err, doc) => {
            if (err) {
               return res.status(422).json(err);
            }
            return res.status(200).json({
               employeeType: doc,
               message: 'Updated'
            });
         }
      );
   }
}
module.exports = EmployeesTypesController;
