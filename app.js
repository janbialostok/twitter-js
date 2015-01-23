var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);
app.use(express.static('public'));

app.engine('html', swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

var server = app.listen(3000);
