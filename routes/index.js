var express = require('express');
var tweetBank = require('../tweetBank');
var router = express.Router();

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, showForm: true, name: name } );
});

router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = req.params.id;
  var tweets = tweetBank.find( {name: name, id: Number(id)} );
  res.render( 'index', { title: 'Twitter.js - Post by ' + name, tweets: tweets } );
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;