module.exports = function() {

  this.Before(function(done) {
    User.destroy(done);
  });
};
