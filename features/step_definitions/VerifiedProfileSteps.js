module.exports = function () {
  this.World = require("../support/ZombieWorld.js").World;

  this.Given("I have signed up", function(callback) {
    this.generateUser(this.fixtures.users.Joe, callback);
  });

  this.Given("I am verified", function(callback) {
    this.generateUserVerification(this.fixtures.users.Joe, callback);
  });

  this.When("I enter my credentials", function(callback) {
    this.authenticateUser(this.fixtures.users.Joe, callback);
  });

  this.Then("I should see the verification", function(callback) {
    this.userIsVerified(this.fixtures.users.Joe, callback);
  });

  this.Then("I should not see the verification", function(callback) {
    this.userIsNotVerified(this.fixtures.users.Joe, callback);
  });
};
