var test = require('../init');

describe('User', function() {

  describe('#create', function() {

    before(function (done) {
      User.destroy(function() {
        done();
      });
    });

    it("should create new user", function(done) {
      createUser("Joe", function(err, user) {
        test.assert.notEqual(user, undefined);
        done();
      });
    }),

    it("should require username", function(done) {
      userCreationRequires("Jimmy", "username", done);
    }),

    it("should require email", function(done) {
      userCreationRequires("Jay", "email", done);
    }),

    it("should require password", function(done) {
      userCreationRequires("Fred", "password", done);
    }),

    it("should require password confirmation", function(done) {
      userCreationRequires("Spike", "password_confirmation", done);
    });

    function createUser(user, verify) {
      User.create(test.fixtures.users[user], verify);
    }

    function userCreationRequires(user, field, done) {
      createUser(user, function(err, user) {
        test.assert.notEqual(err.ValidationError[field], undefined);
        test.assert.equal(user, undefined);
        done();
      });
    }
  }),

  describe('interface', function() {

    before(function (done) {
      User.create(test.fixtures.users.Joe, function(err, user) {
        done();
      });
    });

    it("should not tell its password to the world", function(done) {
      User.find().done(function(err, user) {
        test.assert.equal(user.password, undefined);
        done();
      });
    }),

    it("should tell its name to the world", function(done) {
      userRespondsTo("name", done);
    });

    it("should tell its bio to the world", function(done) {
      userRespondsTo("bio", done);
    });

    it("should tell its location to the world", function(done) {
      userRespondsTo("location", done);
    });

    it("should tell its website to the world", function(done) {
      userRespondsTo("website", done);
    });

    it("should tell its email to the world", function(done) {
      userRespondsTo("email", done);
    });

    it("should tell if it's verified to the world", function(done) {
      userRespondsTo("isVerified", done);
    });

    it("should tell if it's verified to the world", function(done) {
      userRespondsTo("isVerified", done);
    });

    it("should tell its following to the world", function(done) {
      userRespondsTo("following", done);
    });

    it("should tell its followers to the world", function(done) {
      userRespondsTo("followers", done);
    });

    it("should tell when it's created to the world", function(done) {
      userRespondsTo("createdAt", done);
    });

    it("should tell when it's lastly updated to the world", function(done) {
      userRespondsTo("updatedAt", done);
    });

    function userRespondsTo(property, done) {
      User.findOne({ username: test.fixtures.users.Joe.username }, function(err, user) {
        test.assert.notEqual(user[property], undefined);
        done();
      });
    }
  });
});
