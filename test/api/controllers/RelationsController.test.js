var test = require('../init');
var controller = require('./helper');

describe('Relations', function() {

  describe('Routes', function() {

    describe('Not logged', function(done) {

      before(function() {
        test.loggedOut();
      });

      it('POST /follow/1 should be redirected to /', function(done) {
        controller.redirects('/follow/1', '/', done);
      }),

      it('POST /unfollow/1 should be redirected to /', function(done) {
        controller.redirects('/unfollow/1', '/', done);
      });
    }),

    describe('Logged', function(done) {

      before(function() {
        test.loggedAs(test.fixtures.users.Joe);
      });

      it('POST /follow/1 should return 200', function(done) {
        controller.posts('/follow/1', done);
      }),

      it('POST /unfollow/1 should return 200', function(done) {
        controller.posts('/unfollow/1', done);
      });
    });
  });
});
