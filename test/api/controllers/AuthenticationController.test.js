var test = require('../init');
var controller = require('./helper');

describe('Authentication', function() {

  describe('Routes', function() {

    describe('Not logged', function(done) {

      before(function() {
        test.loggedOut();
      });

      it('POST /login should be redirected to /', function(done) {
        controller.redirects('/login', '/', done);
      }),

      it('POST /logout should be redirected to /', function(done) {
        controller.gets('/logout', done);
      });
    }),

    describe('Logged', function(done) {

      before(function() {
        test.loggedAs(test.fixtures.users.Joe);
      });

      it('POST /login should return 200', function(done) {
        controller.posts('/login', done);
      }),

      it('POST /logout should return 200', function(done) {
        controller.redirects('/logout', '/', done);
      });
    });
  });
});
