var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user[0].id.toString());
});

passport.deserializeUser(function(id, done) {
  User.find({id: id}, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(null, err);
      }

      if (!user) {
        return done(null, false, {
          message: 'Incorrect User'
        });
      }

      bcrypt.compare(password, user.password, function(err, res) {
        if (!res) {
          return done(null, false, {
            message: 'Invalid Password'
          });
        }
        return done(null, [user]);
      });
    });
  })
);

module.exports = {
 express: {
    customMiddleware: function(app){
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
