var test = require('../init');

exports.gets = function(address, done) {
  test.request.get(address).expect(200).end(function(err, res) {
    done();
  });
};

exports.posts = function(address, done) {
  test.request.post(address).expect(200).end(function(err, res) {
    done();
  });
};

exports.redirects = function(requestAddress, expectedAddress, done) {
  test.request.get(requestAddress).expect(302).end(function(err, res) {
    test.assert.equal(res.headers.location, expectedAddress);
    done();
  });
};
