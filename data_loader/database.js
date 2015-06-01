var databaseUrl = "hirundo_dev";
var collections = ["user", "tweet", "hashtag"]
var db = require("mongojs").connect(databaseUrl, collections);

var helper = require("./helper");
var async = require('async');
var bcrypt = require('bcrypt');

function clearData(callback) {
	// ***** Remove data *****
	db.user.remove({}, function(err1){
		db.tweet.remove({}, function(err2){
			db.hashtag.remove({}, function(err3){
				callback();
			});
		});
	});
}

function insertUsers(callback) {
	var index = 1,
		lastIndex = 50;

	async.whilst(function () {
	  return index <= lastIndex;
	},
	function (next) {
		bcrypt.hash("password", 8, function(err, encryptedPassword) {
      var user = {
				"username" : helper.getName() + index,
				"email" : "user"+index+"@gmail.bg",
				"password" : encryptedPassword,
				"followers" : [],
				"following" : [],
				"isVerified" : index%3==0,
				"location" : "",
				"name" : "",
				"website" : "",
				"bio" : ""
			};

			db.user.insert(user, function(err, addedUser) {
				index++;
				next();
			});
    });
	},
	function (err) {
		callback();
	});
}

function insertTweets(callback) {
	db.user.find({}, function(err, users){
		if(err || !users) {
			callback();
		}
		var index=0
			lastIndex = users.length;

		async.whilst(function () {
			return index < lastIndex;
		},
		function (next) {

			var jIndex = 1,
				jLastIndex = 50;

			async.whilst(function () {
			  return jIndex <= jLastIndex;
			},
			function (nextFunction) {
				db.tweet.insert({
					"content": helper.getTweet(),
					"location": helper.getLocation(),
					"authorId": users[index]["_id"].toHexString(),
					"hashTags": []
				}, function(err, tweet) {
					jIndex++;
					nextFunction();
				});
			},
			function (err) {
				index++;
				next();
			});

		},
		function (err) {
			callback();
		});
	});
}

function insertHashTags(callback) {
	db.tweet.find({}, function(err, tweets){
		if(err || !tweets) {
			callback();
		}
		var index=0
			lastIndex = tweets.length;

		async.whilst(function () {
			return index < lastIndex;
		},
		function (next) {
			var hashTags = tweets[index].content.match(/#([^\s]*)/g);
			if (hashTags) {
				async.map(hashTags, function(tag, callbackFunc) {
					var tagText = tag.replace('#', '');
					db.hashtag.update({text: tagText}, {text: tagText}, {upsert:true}, function(err, hashTagInserted) {
						db.hashtag.find({text: tagText},function(err, hashTag){
							callbackFunc(null, hashTag[0]["_id"].toHexString());
						});
					});
				}, function(err, hashTagIds) {
					if (!err) {
						if (typeof hashTagIds === 'string') {
							hashTagIds = [hashTagIds];
						}
						db.tweet.update({
							_id: tweets[index]._id
						}, {
							$set:{hashTags: hashTagIds}
						}, function () {
							index++;
							next();
						});
					}
				});
			}
			else {
				index++;
				next();
			}
		},
		function (err) {
			callback();
		});

	});
}

function insertRelations(callback){
	db.user.find({}, function(err, users){
		if(err || !users) {
			callback();
		}
		var index=0
			lastIndex = users.length
			followersCount = 20;

		async.whilst(function () {
			return index < lastIndex;
		},
		function (next) {
			var arr = getNumbersInRange(lastIndex, followersCount, index);
			var jIndex=0
				jLastIndex = arr.length;

			async.whilst(function () {
				return jIndex < jLastIndex;
			},
			function (callbackFunc) {
				addRelation(users[index]['_id'], users[arr[jIndex]]['_id'], function() {
					jIndex++;
					callbackFunc();
				});
			},
			function (err) {
				index++;
				next();
			});
		},
		function (err) {
			callback();
		});
	});
}

function getNumbersInRange(maxCount, neededCount, initialValue) {
	var result = [];
	for (var i=0;i<neededCount;i++){
		var currentValue;
		do {
			currentValue = Math.floor(Math.random()*maxCount);
		}
		while (result.indexOf(currentValue) != -1 && currentValue == initialValue);
		result.push(currentValue);
	}
	return result;
}

function addRelation(followerId, followingId, callback) {
	db.user.update(
		{'_id': followerId}, {
			$push:{following:followingId.toHexString()}
		}, function(err, userModified) {
			db.user.update(
				{'_id': followingId}, {
					$push:{followers:followerId.toHexString()}
				}, function(err, user) {
					callback();
				});
	});
}


exports.clearData = clearData;
exports.insertUsers = insertUsers;
exports.insertTweets = insertTweets;
exports.insertHashTags = insertHashTags;
exports.insertRelations = insertRelations;
