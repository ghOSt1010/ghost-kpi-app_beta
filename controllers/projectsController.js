const mongoose = require('mongoose');
const Projects = mongoose.model('Projects');
const ProjectService = require('../services/projectService');

class projectsController {
   static async getAll(req, res, err) {
      return await Projects.find()
         .then(doc => {
            res.status(200).json(doc);
         })
         .catch(err => {
            res.status(500).json({ message: err });
         });
      //return res.status(200).json(await Projects.find());
   }

   static async getByName(req, res, err) {
      return res
         .status(200)
         .json(await ProjectService.getProject(req.params.name));
   }

   static async getByID(req, res, err) {
      return res
         .status(200)
         .json(await ProjectService.getProjectByID(req.params.id));
   }

   static async create(req, res, err) {
      const {
         body: { project }
      } = req;

      return res
         .status(200)
         .json(await ProjectService.createNewProject(project));
   }

   static async update(req, res, err) {
      const {
         body: { project }
      } = req;

      Projects.findOneAndUpdate(
         { _id: project._id },
         project,
         { upsert: true },
         (err, doc) => {
            if (err) {
               return res.status(422).json(err);
            }
            return res.status(200).json({
               project: doc,
               message: 'Updated'
            });
         }
      );
   }

   static async deleteByID(req, res, err) {
      return await Projects.findOneAndDelete({
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
module.exports = projectsController;
