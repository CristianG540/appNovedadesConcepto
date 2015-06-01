/**
 * authenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {
  if (req.isAuthenticated() && req.user[0]) {
    currentUser = req.user[0];
    res.locals.currentUser = req.user[0];
    return next();
  } else {
    return res.redirect('/');
  }
};
