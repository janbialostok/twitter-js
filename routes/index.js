var tweetBank = require('../tweetBank');
var User = require('../models').User;
var Tweet = require('../models').Tweet;
module.exports = function (app, io){

	app.get('/', function(req, res){
		Tweet.findAll({ include: [User] }).complete(function(err, tweets){
			res.render('index', {title: 'Twitter.sql', tweets: tweets, showForm: true} );
		});
	});

	// app.get('/', function (req, res) {
	//   var tweets = tweetBank.list();
	//   res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	// });

	app.get('/users/:id', function(req, res){
		var userId = req.params.id;
		User.find(userId).complete(function(err, user){
			user.getTweets().complete(function(err, tweets){
				res.render('index', { title: 'Twitter.sql - Posts by ' + user.name, tweets: tweets, showForm: true, name: user.name});
			});
		});
	});

	// app.get('/users/:name', function(req, res) {
	//   var name = req.params.name;
	//   var tweets = tweetBank.find( {name: name} );
	//   res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, showForm: true, name: name } );
	// });

	app.get('/users/:userId/tweets/:tweetId', function(req, res){
		var uid = req.params.userId;
		var tid = req.params.tweetId;
		Tweet.findAll({ where: { id: tid }, include: [User] }).complete(function(err, tweet){
			res.render('index', { title: 'Twitter.sql - Post ID# ' + tid, tweets: tweet, showForm: true });
		});
	});

	// app.get('/users/:name/tweets/:id', function(req, res) {
	//   var name = req.params.name;
	//   var id = req.params.id;
	//   var tweets = tweetBank.find( {name: name, id: Number(id)} );
	//   res.render( 'index', { title: 'Twitter.js - Post by ' + name, tweets: tweets } );
	// });

		// User.findOrCreate({
		// 		where: {name:req.params.name},
		// 		defaults: {name:req.params.name}
		// })
	app.post('/submit', function(req, res){
		var name = req.body.name;
		var text = req.body.text;
		var userHolder;
		User.findOrCreate({ where: { name: name }, defaults: { name: name } }).then(function(user){
			userHolder = user;
				Tweet.create({ UserId: userHolder[0].id, tweet: text }).then(function(){
					io.sockets.emit('new_tweet');
					res.redirect('/');
				});
			});
		});

	// app.post('/submit', function(req, res) {
	//   var name = req.body.name;
	//   var text = req.body.text;
	//   tweetBank.add(name, text);
	//   io.sockets.emit('new_tweet', tweetBank.find({ name: name, text: text })[0]);
	//   res.redirect('/');
	// });	
}
