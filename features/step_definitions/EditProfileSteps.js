module.exports = function () {
  this.World = require("../support/ZombieWorld.js").World;

  this.Given("I have signed up", function(callback) {
    this.generateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I enter my credentials", function(callback) {
    this.authenticateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I enter my new credentials", function(callback) {
    this.authenticateUserWithPassword(this.fixtures.users.Joe, "newpassword", callback);
  });

  this.When("I sign out", function(callback) {
    this.signOutUser(callback);
  });

  this.When("I update my password", function(callback) {
    this.updateUserPassword("newpassword", callback);
  });

  this.When("I update my profile", function(callback) {
    this.updateUserProfile(this.fixtures.users.Joe, callback);
  });

  this.Then("I should see the updated information", function(callback) {
    this.userIsUpdated(this.fixtures.users.Joe, callback);
  });
};
