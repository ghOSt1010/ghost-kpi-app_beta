const mongoose = require('mongoose');
const Employees = mongoose.model('Employees');
const EmployeesTypes = mongoose.model('EmployeesTypes');
//const logger = require('../modules/logger/logger');

class employeesController {
   static getAll(req, res, err) {
      return Employees.find()
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            console.log(err);
            res.status(404).json(err);
         });
   }

   static getByName(req, res, err) {
      return Employees.findOne({ name: req.params.name })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(404).json(err);
         });
   }

   static getByUserID(req, res, err) {
      return Employees.findOne({ user: req.params.id })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(404).json(err);
         });
   }

   static getByID(req, res, err) {
      return Employees.findOne({ _id: req.params.id })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(404).json(err);
         });
   }

   /**
    *
    * @async
    */
   static async getByType(req, res, err) {
      const { type } = req.params;

      var typeID = await EmployeesTypes.findOne({ type: type });

      return await Employees.find({ type: typeID })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(200).json(err);
         });
   }

   /**
    * @async
    */
   static async create(req, res, err) {
      //get req data
      const {
         body: { employee }
      } = req;

      //save employee
      var Employee = new Employees(employee);

      //return status
      return await Employee.save()
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json(err);
         });
   }

   /**
    *
    * @async
    */
   static async update(req, res, err) {
      const {
         body: { employee }
      } = req;
      Employees.findOneAndUpdate(
         { _id: employee._id },
         employee,
         { upsert: true },
         (err, doc) => {
            if (err) {
               return res.status(422).json(err);
            }
            return res.status(200).json({
               employee: doc,
               message: 'Updated'
            });
         }
      );
   }

   static async removeByID(req, res, err) {
      return await Employees.findOneAndDelete({
         _id: req.params.id
      })
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(422).json(err);
         });
   }
}

module.exports = employeesController;
