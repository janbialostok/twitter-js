var tweetBank = require('../tweetBank');
module.exports = function (app, io){

	app.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	app.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var tweets = tweetBank.find( {name: name} );
	  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, showForm: true, name: name } );
	});

	app.get('/users/:name/tweets/:id', function(req, res) {
	  var name = req.params.name;
	  var id = req.params.id;
	  var tweets = tweetBank.find( {name: name, id: Number(id)} );
	  res.render( 'index', { title: 'Twitter.js - Post by ' + name, tweets: tweets } );
	});

	app.post('/submit', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  io.sockets.emit('new_tweet', tweetBank.find({ name: name, text: text })[0]);
	  res.redirect('/');
	});	
}
