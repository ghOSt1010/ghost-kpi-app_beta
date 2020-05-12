const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_JWT } = require('../config/config');

const { Schema } = mongoose;

const UsersSchema = new Schema({
   username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      //match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
   },
   email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
   },
   usertype: {
      type: String,
      enum: ['standard', 'manager', 'director', 'admin'],
      required: true
   },
   employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      autopopulate: { maxDepth: 2 }
   },
   active: {
      type: mongoose.Schema.Types.Boolean,
      default: true
   },
   createdAt: {
      type: Date,
      default: new Date()
   },
   hash: String,
   salt: String
});

UsersSchema.methods.setPassword = function(password) {
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
   const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
   return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
   const today = new Date();
   const expirationDate = new Date(today);
   expirationDate.setDate(today.getDate() + 2);
   return jwt.sign(
      {
         _id: this._id,
         username: this.username,
         usertype: this.usertype,
         email: this.email,
         employeeInfo: this.employeeInfo,
         exp: parseInt(expirationDate.getTime() / 1000, 10)
      },
      TOKEN_SECRET_JWT,
      { algorithm: 'HS256' }
   );
};

UsersSchema.methods.toAuthJSON = function() {
   return {
      _id: this._id,
      username: this.username,
      usertype: this.usertype,
      email: this.email,
      employeeInfo: this.employeeInfo,
      token: this.generateJWT()
   };
};

UsersSchema.methods.showEmail = function() {
   return {
      email: this.email
   };
};

UsersSchema.statics.findByEmail = function(name) {
   return this.find({ email: name });
};

UsersSchema.statics.findAll = function() {
   return this.find({});
};

UsersSchema.plugin(require('mongoose-unique-validator'));
UsersSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Users', UsersSchema);
