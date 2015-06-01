/**
 * RelationsController
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

function performRelation(action, user, targetUser) {
  var data = action(user, targetUser.id);
  User.update(user.id, data, function(err, models) {
    User.publishUpdate(user.id, models[0].toJSON());
  });
};

function add(type) {
  return function(user, targetUserId) {
    var data = {};
    if (user && user[type].indexOf(targetUserId) == -1) {
      data[type] = user[type].concat(targetUserId);
    }
    return data;
  };
};

function remove(type) {
  return function(user, targetUserId) {
    var data = {};
    if (user) {
      data[type] = user[type].filter(function(id) {
        return id != targetUserId;
      });
    }
    return data;
  };
};

function relation(action) {
  return function(req, res, next) {
    User.findOne({username: req.param('username')}, function(err, targetUser) {
      if (err || !targetUser) {
        return next(err);
      }

      performRelation(action('following'), currentUser, targetUser);
      performRelation(action('followers'), targetUser, currentUser);
      return res.redirect('/' + targetUser.username);
    });
  };
};

module.exports = {

  follow: relation(add),
  unfollow: relation(remove)
};
