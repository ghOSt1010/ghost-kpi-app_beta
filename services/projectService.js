const mongoose = require('mongoose');
const Projects = mongoose.model('Projects');
const logger = require('../modules/logger/logger');

class projectService {
   static async getAllProjects() {
      return await Projects.find()
         .then(doc => {
            return doc;
         })
         .catch(err => {
            throw err;
         });
   }

   static async getProject(projectName) {
      if (projectName === '*') {
         return await this.getAllProjects();
      }
      return await Projects.findOne({ name: projectName }).exec();
   }

   static async getProjectByID(projectID) {
      if (projectID === '*') {
         return await this.getAllProjects();
      }
      return await Projects.findOne({ _id: projectID }).exec();
   }

   /**
    *
    * @param {Object} project
    */
   static async createNewProject(project) {
      var Project = new Projects(project);
      var result;

      try {
         result = await Project.save().exec();
      } catch (err) {
         return false;
      }

      return result;
   }
}

module.exports = projectService;
