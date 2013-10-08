var express = require('express');
var app = express();
var config = require('../conf/server');
var jobs = require('../jobs')

app.get('/generate', function(req, res){
	res.json({success : true});
	jobs.start(function(){console.log('... done')});
});

app.get('/', function(req, res){
	res.end('coucou');
});

app.listen(config.port);