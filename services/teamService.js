const mongoose = require('mongoose');
const Teams = mongoose.model('Teams');
const logger = require('../modules/logger/logger');

class Teamservice {
   static async getAllTeams() {
      return await Teams.find().exec();
   }

   static async getTeam(teamName) {
      if (teamName === '*') {
         return await this.getAllTeams();
      }
      return await Teams.findOne({ name: teamName }).exec();
   }

   static async gettTamByID(teamID) {
      if (teamID === '*') {
         return await this.getAllTeams();
      }
      return await Teams.findOne({ _id: teamID }).exec();
   }

   /**
    *
    * @param {Object} team
    */
   static async createNewTeam(team) {
      var team = new Teams(team);
      var result;

      try {
         result = await team.save().exec();
      } catch (err) {
         return false;
      }

      return result;
   }
}

module.exports = Teamservice;
