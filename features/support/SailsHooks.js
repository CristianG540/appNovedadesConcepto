var sails = require('sails');

module.exports = function() {
  var self = this;

  // Should be replaced with a beforeAll hook..
  this.registerHandler('BeforeFeatures', function(event, done) {
    sails.lift({
      log: {
        level: 'error'
      },
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
      // Go on..
      done();
    });
  });

  // Should be replaced with an afterAll hook..
  this.registerHandler('AfterFeatures', function (event, callback) {
    sails.lower(callback);
  });
};
