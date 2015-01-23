var express = require('express');
var tweetBank = require('../tweetBank');
var router = express.Router();

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

module.exports = router;