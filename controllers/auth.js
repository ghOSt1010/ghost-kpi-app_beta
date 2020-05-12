const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_JWT } = require('../config/config');

// Validate email address
function validateEmailAccessibility(email) {
   return Users.findOne({ email: email }).then(result => {
      return !result;
   });
}

// Generate token
/*
const generateTokens = (req, user) => {
   const ACCESS_TOKEN = jwt.sign(
      { sub: user._id, rol: user.role, type: 'ACCESS_TOKEN' },
      TOKEN_SECRET_JWT,
      { expiresIn: 120 });
   const REFRESH_TOKEN = jwt.sign(
      { sub: user._id, rol: user.role, type: 'REFRESH_TOKEN' },
      TOKEN_SECRET_JWT,
      { expiresIn: 480 });
   return { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN }
}
*/
// Controller create user
exports.createUser = (req, res, next) => {
   const {
      body: { user }
   } = req;
   console.log(user);

   validateEmailAccessibility(user.email).then(valid => {
      if (valid) {
         const finalUser = new Users(user);

         finalUser.setPassword(user.password);

         return finalUser
            .save()
            .then(() => {
               res.json({
                  user: finalUser.toAuthJSON(),
                  message: 'The user was created'
               });
            })
            .catch(err => {
               //next(error)
               res.status(422).json({ error: err });
            });
      } else {
         res.status(409).send({
            message: 'The request could not be completed due to a conflict'
         });
      }
   });
};

exports.login = async (req, res, next) => {
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

   /*
   var validateUser = await Users.findOne({ email: user.email }).exec();

   if (!validateUser.active) {
      return res.status(401).send('User is not activve');
   }
   */

   return passport.authenticate(
      'local',
      { session: false },
      (err, passportUser, info) => {
         if (err) {
            return next(err);
         }
         if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toAuthJSON() });
         }

         return res.status(400).send(info);
      }
   )(req, res, next);
};

// Verify accessToken
exports.verifyAccessToken = (req, res, next) => {
   if (!req.headers.authorization) {
      return res.status(401).send({ error: 'Token is missing' });
   }
   const BEARER = 'Token';
   const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ');
   const TOKEN = AUTHORIZATION_TOKEN[1];

   if (AUTHORIZATION_TOKEN[0] !== BEARER) {
      return res.status(401).send({ error: 'Token is not complete' });
   }

   jwt.verify(TOKEN, TOKEN_SECRET_JWT, function(err, decoded) {
      if (err) {
         console.error(err);
         return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token.'
         });
      } else {
         // if everything is good, save to request for use in other routes
         req.decoded = decoded;
         next();
      }
   });
};

/**
 * @private
 */
exports.isAdmin = (req, res, next) => {
   const { usertype } = req.decoded;
   if (usertype === 'admin' || rusertypeole === 'root') {
      next();
   } else {
      return res.status(401).json({ error: 'Access restricted to Admin only' });
   }
};
/**
 * @private
 */
exports.isRoot = (req, res, next) => {
   const { usertype } = req.decoded;
   if (usertype === 'root') {
      next();
   } else {
      return res
         .status(401)
         .json({ error: 'Access restricted to system Root only' });
   }
};
/**
 *    Advanced Security features to make sure that user is authorized for changes
 *    @description Veryfi JWT + check if user role = ADMIN
 */
exports.verifyIfAdmin = [this.verifyAccessToken, this.isAdmin];

/**
 *    Advanced Security features to make sure that user is authorized for changes
 *    @description Veryfi JWT + check if user role = ROOT
 */
exports.verifyIfRoot = [this.verifyAccessToken, this.isRoot];

/**
 *    Advanced Security features to make sure that user is authorized for changes
 *    @description Veryfi JWT + check if user: role = ADMIN || role = ROOT
 */
exports.AdminOrRootOnly = [this.verifyAccessToken, this.isAdmin, this.isRoot];

// Verify refreshToken
exports.refreshTokenVerify = (req, res, next) => {
   if (!req.body.refreshToken) {
      res.status(401).send({ message: 'Token refresh is missing' });
   }
   const BEARER = 'Bearer';
   const REFRESH_TOKEN = req.body.refreshToken.split(' ');
   if (REFRESH_TOKEN[0] !== BEARER) {
      return res.status(401).send({ error: 'Token is not complete' });
   }
   jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, function(err, payload) {
      if (err) {
         return res.status(401).send({ error: 'Token refresh is invalid' });
      }
      Users.findById(payload.sub, function(err, person) {
         if (!person) {
            return res.status(401).send({ error: 'Person not found' });
         }
         return res.json(generateTokens(req, person));
      });
   });
};
