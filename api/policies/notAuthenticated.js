/**
 * notAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any not authenticated user
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/feed');
  }
};
