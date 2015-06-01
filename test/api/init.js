exports.sails = require('sails');
exports.assert = require('assert');
var passportStub = require('passport-stub');

// Load test goodies
before(function(done) {
  exports.sails.lift({
    log: {
      level: 'error'
    },
    csrf: false,
    adapters: {
      mongo: {
        module: 'sails-mongo',
        host: 'localhost',
        database: 'hirundo_test',
        user: '',
        pass: ''
      }
    }
  }, function(err) {
    // Install passport stub
    passportStub.install(exports.sails.express.app);

    // Load fixtures
    exports.fixtures = {};
    var files = require('fs').readdirSync('./test/api/fixtures/');
    for (var i in files) {
      var fileName = './fixtures/' + files[i];
      var ruleName = files[i].replace('.json', '');
      exports.fixtures[ruleName] = require(fileName);
    }
    exports.request = require('supertest')(exports.sails.express.app);

    // Go on..
    done();
  });
});

// Clean up the mess..
after(function(done) {
  exports.sails.lower(done);
});

exports.loggedAs = function(user) {
  passportStub.login([{
    username: user.username,
    id: 1,
    followees: [],
    followers: []
  }]);
}

exports.loggedOut = function() {
  passportStub.logout();
}
