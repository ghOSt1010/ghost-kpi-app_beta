const mongoose = require('mongoose');
const Teams = mongoose.model('Teams');
//const logger = require('../modules/logger/logger');
const Teamservice = require('../services/Teamservice');

class TeamsController {
   static async getAll(req, res, err) {
      return res.status(200).json(await Teamservice.getAllTeams());
   }

   static async getByName(req, res, err) {
      return res.status(200).json(await Teamservice.getTeam(req.params.name));
   }

   static async getByID(req, res, err) {
      return res.status(200).json(await Teamservice.gettTamByID(req.params.id));
   }

   static async create(req, res, err) {
      const {
         body: { team }
      } = req;

      return res.status(200).json(await Teamservice.createNewTeam(team));
   }

   static async update(req, res, err) {
      const {
         body: { team }
      } = req;

      Teams.findOneAndUpdate(
         { _id: team._id },
         team,
         { upsert: true },
         (err, doc) => {
            if (err) {
               return res.status(422).json(err);
            }
            return res.status(200).json({
               team: doc,
               message: 'Updated'
            });
         }
      );
   }

   static async deleteByID(req, res, err) {
      return await Teams.findOneAndDelete({
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
module.exports = TeamsController;
