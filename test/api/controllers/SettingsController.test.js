var test = require('../init');
var controller = require('./helper');

describe('Settings', function() {

  describe('Routes', function() {

    describe('Not logged', function(done) {

      before(function() {
        test.loggedOut();
      });

      it('GET /settings/profile should be redirected to /', function(done) {
        controller.redirects('/settings/profile', '/', done);
      });
    }),

    describe('Logged', function(done) {

      before(function() {
        test.loggedAs(test.fixtures.users.Joe);
      });

      it('GET /settings/profile should return 200', function(done) {
        controller.gets('/settings/profile', done);
      });
    });
  });
});
