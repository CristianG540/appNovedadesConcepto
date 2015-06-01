module.exports = function () {
  this.World = require("../support/ZombieWorld.js").World;

  this.Given("I have signed up", function(callback) {
    this.generateUser(this.fixtures.users.Joe, callback);
  });

  this.Given("Another user has signed up", function(callback) {
    this.generateUser(this.fixtures.users.Dewey, callback);
  });

  this.Given("I follow the other user", function(callback) {
    this.generateUserRelation(this.fixtures.users.Joe,
      this.fixtures.users.Dewey, callback);
  });

  this.When("I enter my credentials", function(callback) {
    this.authenticateUser(this.fixtures.users.Joe, callback);
  });

  this.When("I follow a user", function(callback) {
    this.followUser(this.fixtures.users.Dewey, callback);
  });

  this.When("Another user signs in", function(callback) {
    this.authenticateUser(this.fixtures.users.Dewey, callback);
  });

  this.When("Another user follows me", function(callback) {
    this.followUser(this.fixtures.users.Joe, callback);
  });

  this.When("Another user signs out", function(callback) {
    this.signOutUser(callback);
  });

  this.When("I unfollow a user", function(callback) {
    this.unfollowUser(this.fixtures.users.Dewey, callback);
  });

  this.Then("I should see the user in my following list", function(callback) {
    this.userIsFollowed(this.fixtures.users.Dewey, callback);
  });

  this.Then("I should see the user in my followers list", function(callback) {
    this.userIsFollowing(this.fixtures.users.Dewey, callback);
  });

  this.Then("I should not see the user in my following list", function(callback) {
    this.userIsNotFollowed(this.fixtures.users.Dewey, callback);
  });
};
