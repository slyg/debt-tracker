var express = require('express');
var app = express();
var config = require('../conf/server');
var jobs = require('../jobs')

app.use('/public', express.static(__dirname + '/public'));
app.use('/home', express.static(__dirname + '/views'));

app.get('/', function(req, res){
	res.redirect('/home')
});

app.get('/generate', function(req, res){
	res.json({success : true});
	jobs.start().then(function(){console.log('... done')});
});

app.listen(config.port);