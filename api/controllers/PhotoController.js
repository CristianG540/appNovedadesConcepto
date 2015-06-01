/**
 * TweetController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var fs = require("fs");

module.exports = {

  show: function(req, res, next) {
    var name = req.param('id');
    var size = req.param('size');
    var photosDir = __dirname + "/../../public/photos/";
    fs.exists(photosDir + size + "/" + name + ".jpg", function(exists) {
      var photo = "fake";
      if (exists) {
          photo = name;
      }
      fs.readFile(photosDir + size + "/" + photo + ".jpg", function(err, img) {
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        return res.end(img, 'binary');
      });
    });
  }
};
