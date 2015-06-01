/**
 * User
 *
 * @module      :: Model
 * @description :: Represents a user of the application.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var gm = require("gm");
var fs = require("fs");
var bcrypt = require('bcrypt');

function saveOriginal(path, name) {
  return function(next) {
    fs.readFile(path, function(err, data) {
      fs.mkdir(__dirname + '/../../public/photos/original', function(err) {
        fs.writeFile(__dirname + '/../../public/photos/original/' + name + '.jpg', data, next);
      });
    });
  };
};

function saveResized(path, size, name) {
  return function(next) {
    fs.mkdir(__dirname + '/../../public/photos/' + size, function(err) {
      gm(path)
      .resize(size, size)
      .write(__dirname + "/../../public/photos/" + size + "/" + name + ".jpg", next);
    });
  };
};

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      maxLength: 40,
      defaultsTo: ""
    },

    username: {
      type: 'string',
      maxLength: 20,
      minLength: 5,
      required: true,
      unique: true
    },

    cargo: {
      type: 'string',
      maxLength: 40,
      defaultsTo: ""
    },

    bio: {
      type: 'string',
      maxLength: 160,
      defaultsTo: ""
    },

    location: {
      type: 'string',
      defaultsTo: ""
    },

    institution: {
      type: 'string',
      required: true
    },

    website: {
      type: 'string',
      defaultsTo: ""
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    isVerified: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    following: {
      type: 'array',
      defaultsTo: []
    },

    followers: {
      type: 'array',
      defaultsTo: []
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    if (!values.password || values.password != values.password_confirmation) {
      return next({
        ValidationError: {
          password_confirmation: [{
            data: "",
            message: "Password doesn't match password confirmation."
          }]
        }
      });
    }
    bcrypt.hash(values.password, 8, function(err, encryptedPassword) {
      values.password = encryptedPassword;
      return next();
    });
  },

  beforeUpdate: function(values, next) {
    async.waterfall([
      function(callback) {
        if (values.password) {
          bcrypt.hash(values.password, 8, function(err, encryptedPassword) {
            values.password = encryptedPassword;
            callback();
          });
        } else {
          callback();
        }
      },
      function(callback) {
        if (!values.photo) {
          callback();
        } else {
          async.parallel([
            saveOriginal(values.photo, values.photoName),
            saveResized(values.photo, 64, values.photoName),
            saveResized(values.photo, 128, values.photoName)
          ], callback);
        }
      }
    ], next);
  }
};
