var db = require("./database");

db.clearData(function(){
	console.log('Db cleared');
	insertUsers();
});

function insertUsers() {
	db.insertUsers(function(){
		console.log('Users added');
		insertTweets();
	});
}

function insertTweets() {
	db.insertTweets(function(){
		console.log('Tweets added');
		insertHashTags();
	});
}

function insertHashTags() {
	db.insertHashTags(function(){
		console.log('HashTags added');
		insertRelations();
	});
}

function insertRelations() {
	db.insertRelations(function(){
		console.log('Relations added');
	});
}
