var test = require('../init');
var controller = require('./helper');

describe('User', function() {

  describe('Routes', function() {

    describe('Not logged', function(done) {

      before(function() {
        test.loggedOut();
      });

      it('GET /user/new should return 200', function(done) {
        controller.gets('/user/new', done);
      }),

      it('GET /1 should be redirected to /', function(done) {
        controller.redirects('/1', '/', done);
      }),

      it('GET /1/followers should be redirected to /', function(done) {
        controller.redirects('/1/followers', '/', done);
      }),

      it('GET /1/following should be redirected to /', function(done) {
        controller.redirects('/1/following', '/', done);
      }),

      it('GET /user should be redirected to /', function(done) {
        controller.redirects('/user', '/', done);
      }),

      it('POST /user/create should be redirected to /user/new', function(done) {
        controller.redirects('/user/create', '/user/new', done);
      }),

      it('POST /user/update should be redirected to /', function(done) {
        controller.redirects('/user/update', '/', done);
      }),

      it('POST /user/destroy should be redirected to /', function(done) {
        controller.redirects('/user/destroy', '/', done);
      });
    }),

    describe('Logged', function(done) {

      before(function() {
        test.loggedAs(test.fixtures.users.Joe);
      });

      it('GET /user/new should be redirected to /feed', function(done) {
        controller.redirects('/user/new', '/feed', done);
      }),

      it('GET /1 should return 200', function(done) {
        controller.gets('/1', done);
      }),

      it('GET /1/followers return 200', function(done) {
        controller.gets('/1/followers', done);
      }),

      it('GET /1/following return 200', function(done) {
        controller.gets('/1/following', done);
      }),

      it('GET /user should return 200', function(done) {
        controller.gets('/user', done);
      }),

      it('POST /user/create should return 200', function(done) {
        controller.posts('/user/create', done);
      }),

      it('POST /user/update should return 200', function(done) {
        controller.posts('/user/update', done);
      }),

      it('POST /user/destroy should return 200', function(done) {
        controller.posts('/user/destroy', done);
      });
    });
  });
});
