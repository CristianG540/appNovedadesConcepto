var zombie = require('zombie');
var assert = require('assert');
var _ = require('lodash');

exports.World = function ZombieWorld(callback) {
  var self = this;

  // Instantiate headless browser
  self.browser = new zombie({
    site: 'http://localhost:1337',
    runScripts: false
  });

  self.generateUser = function(userData, callback) {
    User.create(_.cloneDeep(userData), function(err, user) {
      if (err) {
        callback.fail(new Error("Could not generate user."));
      } else {
        callback();
      }
    });
  };

  self.signUpUser = function(userData, callback) {
    self.browser.visit('/user/new', function() {
      self.browser.fill('Username', userData.username).
                   fill('Email address', userData.email).
                   fill('Password', userData.password).
                   fill('Repeat password', userData.password_confirmation).
                   pressButton('Submit', callback);
    });
  };

  self.authenticateUser = function(userData, callback) {
    self.browser.visit('/', function(e, browser) {
      self.browser.fill('Username', userData.username).
                   fill('Password', userData.password).
                   pressButton('Sign in', callback);
    });
  };

  self.updateUserProfile = function(userData, callback) {
    self.browser.clickLink("#navigation-tools", function() {
      self.browser.clickLink("Edit profile", function() {
        self.browser.fill('Name', userData.name).
                     fill('Bio', userData.bio).
                     pressButton('Update', callback);
      });
    });
  };

  self.userIsAuthenticated = function(userData, callback) {
    self.browser.visit('/' + userData.username, function() {
      if (self.browser.text('body').indexOf(userData.username) == -1) {
        callback.fail(new Error("User is not authenticated."));
      } else {
        callback();
      }
    });
  };

  self.userIsUpdated = function(userData, callback) {
    self.browser.visit('/' + userData.username, function() {
      var content = self.browser.text('body');
      if (content.indexOf(userData.username) == -1 ||
          content.indexOf(userData.name) == -1 ||
          content.indexOf(userData.bio) == -1) {

        callback.fail(new Error("User info is updated."));
      } else {
        callback();
      }
    });
  };

  this.signOutUser = function(callback) {
    self.browser.clickLink("#navigation-tools", function() {
      self.browser.clickLink("Sign out", callback);
    });
  };

  this.userIsNotAuthenticated = function(callback) {
    self.browser.visit('/feed', function() {
      if (self.browser.location.pathname == '/feed') {
        callback.fail(new Error("User is authenticated."));
      } else {
        callback();
      }
    });
  };

  this.followUser = function(userData, callback) {
    self.browser.visit('/' + userData.username, function() {
      self.browser.clickLink('Follow', callback);
    });
  };

  this.userIsFollowed = function(userData, callback) {
    self.browser.clickLink('#navigation-profile', function() {
      self.browser.clickLink('#following', function() {
        var content = self.browser.text('body');
        if (content.indexOf(userData.username) == -1) {
          callback.fail(new Error("User does not follow."));
        } else {
          callback();
        }
      });
    });
  };

  this.userIsFollowing = function(userData, callback) {
    self.browser.clickLink('#navigation-profile', function() {
      self.browser.clickLink('#followers', function() {
        var content = self.browser.text('body');
        if (content.indexOf(userData.username) == -1) {
          callback.fail(new Error("User does not follow."));
        } else {
          callback();
        }
      });
    });
  };

  this.generateUserRelation = function(followerData, followingData, callback) {
    User.findOne({username: followerData.username}, function(err, follower) {
      User.findOne({username: followingData.username}, function(err, following) {
        User.update(follower.id, {following: [following.id]}, function() {
          User.update(following.id, {followers: [follower.id]}, callback);
        });
      });
    });
  };

  this.unfollowUser = function(userData, callback) {
    self.browser.visit('/' + userData.username, function() {
      self.browser.clickLink('Unfollow', callback);
    });
  };

  this.userIsNotFollowed = function(userData, callback) {
    self.browser.clickLink('#navigation-profile', function() {
      self.browser.clickLink('#following', function() {
        var content = self.browser.text('body');
        if (content.indexOf(userData.username) != -1) {
          callback.fail(new Error("User does follow."));
        } else {
          callback();
        }
      });
    });
  };

  this.generateUserVerification = function(userData, callback) {
    User.findOne({username: userData.username}, function(err, user) {
      User.update(user.id, {isVerified: true}, callback);
    });
  };

  this.userIsVerified = function(userData, callback) {
    self.browser.clickLink('#navigation-profile', function() {
      if (self.browser.query('#verified')) {
        callback();
      } else {
        callback.fail(new Error("User is not verified."));
      }
    });
  };

  this.userIsNotVerified = function(userData, callback) {
    self.browser.clickLink('#navigation-profile', function() {
      if (!self.browser.query('#verified')) {
        callback();
      } else {
        callback.fail(new Error("User is verified."));
      }
    });
  };

  this.deleteUserProfile = function(callback) {
    self.browser.clickLink("#navigation-tools", function() {
      self.browser.clickLink("Edit profile", function() {
        self.browser.clickLink('Delete', callback);
      });
    });
  };

  this.updateUserPassword = function(password, callback) {
    self.browser.clickLink("#navigation-tools", function() {
      self.browser.clickLink("Edit profile", function() {
        self.browser.fill('Password', password).
                     fill('Repeat password', password).
                     pressButton('Update', callback);
      });
    });
  };

  this.authenticateUserWithPassword = function(userData, password, callback) {
    self.browser.visit('/', function() {
      self.browser.fill('Username', userData.username).
                   fill('Password', password).
                   pressButton('Sign in', callback);
    });
  };

  this.tweet = function(message, callback) {
    self.browser.visit('/', function() {
      self.browser.fill('#tweet-content', message).
                   pressButton('Tweet', callback);
    });
  };

  this.userTweeted = function(user, message, callback) {
    self.browser.visit('/' + user.username, function() {
      self.browser.clickLink('#tweets', function() {
        var content = self.browser.text('body');
        if (content.indexOf(message) == -1) {
          callback.fail(new Error("Tweet is not displayed."));
        } else {
          callback();
        }
      });
    });
  };

  this.userNotTweeted = function(user, message, callback) {
    self.browser.visit('/' + user.username, function() {
      self.browser.clickLink('#tweets', function() {
        var content = self.browser.text('body');
        if (content.indexOf(message) != -1) {
          callback.fail(new Error("Tweet is not displayed."));
        } else {
          callback();
        }
      });
    });
  };

  callback();
};
