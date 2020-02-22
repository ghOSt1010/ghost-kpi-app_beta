const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const HTTPERROR = require('http-errors');
const logger = require('../modules/logger/logger');

class usersController {
   static async getUsers(req, res, err) {
      logger.info('GET USERS');
      return await Users.find()
         .then(doc => {
            return res.status(200).json(doc);
         })
         .catch(err => {
            return res.status(400).json(err);
         });
   }

   static async updateUser(req, res, err) {
      const {
         body: { user }
      } = req;

      return await Users.findOneAndUpdate(
         { _id: user._id },
         user,
         { upsert: true },
         (err, doc) => {
            if (err) {
               return res.status(422).json(err);
            }
            return res.status(200).json({
               user: doc,
               message: 'Updated'
            });
         }
      );
   }

   static createUser(req, res, err) {
      const {
         body: { user }
      } = req;

      if (!user.email) {
         return res.status(422).json({
            errors: {
               email: 'is required'
            }
         });
      }

      if (!user.password) {
         return res.status(422).json({
            errors: {
               password: 'is required'
            }
         });
      }

      const finalUser = new Users(user);

      finalUser.setPassword(user.password);

      return finalUser
         .save()
         .then(() => {
            res.json({
               user: finalUser.toAuthJSON(),
               created: 'ok'
            });
         })
         .catch(err => {
            console.log(err);
            res.status(422).json(err);
         });
   }

   static async deleteUser(req, res, err) {
      logger.info('DELETE TRY User', 'id=' + req.params.id);

      return await Users.findOneAndDelete({
         _id: req.params.id
      })
         .then(doc => {
            logger.success('DELETE OK', JSON.stringify(doc));
            res.status(200).json(doc);
         })
         .catch(err => {
            logger.error('DELETE FAIL', JSON.stringify(err));
            res.status(422).json(err);
         });
   }
}
module.exports = usersController;
