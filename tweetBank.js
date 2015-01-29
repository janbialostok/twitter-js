var _ = require('underscore');
var data = [];
var counter = 0;

var add = function(name, text){
	data.push({name: name, text: text, id: counter++});
}

var list = function(){
	return _.clone(data);
}

var find = function(properties){
	return _.where(data, properties);
}

module.exports = { add: add, list: list, find: find }



//Sample generated data for tweetBank

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function(index) {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison','Fake'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return fakeFirsts[index] + " " + fakeLasts[index];
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  module.exports.add( getFakeName(i), getFakeTweet() );
}
