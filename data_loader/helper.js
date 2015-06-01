//***** Helper functions and variables *****
var userNames= ['Ivan', 'Stanislav', 'Valentin', 'Peter',
				'Angel', 'Iliqn', 'Emil', 'John',
				'Conka', 'Mariq', 'Penka', 'Donka'];
function generateRandomName() {
	return userNames[Math.floor(Math.random() * userNames.length)];
};

var locations= ['Pazardjik', 'Sofia', 'Prague', 'Peshtera',
				'Plovdiv', 'Varna', 'Burgas', ''];
function generateRandomLocation() {
	return locations[Math.floor(Math.random() * locations.length)];
};

var verbs =
[
    ["go to", "goes to", "#going to", "went to", "gone to"],
    ["look at", "looks at", "looking at", "#looked at", "looked at"],
    ["choose", "#chooses", "choosing", "#chose", "chosen"]
];
var tenses =
[
    {name:"Present", singular:1, plural:0, format:"%subject %verb %complement"},
    {name:"Past", singular:3, plural:3, format:"%subject %verb %complement"},
    {name:"Present Continues", singular:2, plural:2, format:"%subject %be %verb %complement"}
];
var subjects =
[
    {name:"I", be:"am", singular:0},
    {name:"#You", be:"are", singular:0},
    {name:"He", be:"is", singular:1}
];
var complementsForVerbs =
[
    ["#cinema", "#Egypt", "home", "#concert"],
    ["for a map", "them", "the stars", "the #lake"],
    ["a book for #reading", "a dvd for tonight"]
]
Array.prototype.random = function(){return this[Math.floor(Math.random() * this.length)];};

function generateRandomTweet(){
    var index = Math.floor(verbs.length * Math.random());
    var tense = tenses.random();
    var subject = subjects.random();
    var verb = verbs[index];
    var complement = complementsForVerbs[index];
    var str = tense.format;
    str = str.replace("%subject", subject.name).replace("%be", subject.be);
    str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
    str = str.replace("%complement", complement.random());
    return str;
}



exports.getName = generateRandomName;
exports.getLocation = generateRandomLocation;
exports.getTweet = generateRandomTweet;
