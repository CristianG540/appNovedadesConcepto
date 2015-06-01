/**
 * notAuthenticatedUser
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any user different than the authenticated one
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  var currentUsername = req.session.passport.user;
  var username = req.param('username');

  if (currentUsername != username) {
    return next();
  } else {
    return res.redirect('/feed');
  }
};
