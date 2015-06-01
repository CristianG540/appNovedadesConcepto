module.exports = function () {
  this.World = require("../support/ZombieWorld.js").World;

  this.Given("I have signed up", function(callback) {
    this.generateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I enter my credentials", function(callback) {
    this.authenticateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I tweet something less than 140 characters", function(callback) {
    this.tweet("My cool message!", callback);
  });

  this.When("I tweet something longer than 140 characters", function(callback) {
    this.tweet(
      "My message is really really really really really really really really " +
      "really really really really really really really really really really long!",
      callback);
  });

  this.Then("I should see the message", function(callback) {
    this.userTweeted(this.fixtures.users.Joe, "My cool message!", callback);
  });

  this.Then("I should not see the message", function(callback) {
    this.userNotTweeted(this.fixtures.users.Joe,
      "My message is really really really really really really really really " +
      "really really really really really really really really really really long!",
      callback);
  });
};

