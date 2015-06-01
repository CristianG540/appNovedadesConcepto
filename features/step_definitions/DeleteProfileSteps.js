module.exports = function () {
  this.World = require("../support/ZombieWorld.js").World;

  this.Given("I have signed up", function(callback) {
    this.generateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I enter my credentials", function(callback) {
    this.authenticateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I delete my profile", function(callback) {
    this.deleteUserProfile(callback);
  });

  this.Then("I should not be authenticated", function(callback) {
    this.userIsNotAuthenticated(callback);
  });
};
