var express = require('express');
var app = express();
var config = require('../conf/server');
var jobs = require('../jobs')

app.use('/', express.static(__dirname + '/public'));

app.get('/generate', function(req, res){
	res.json({success : true});
	jobs.start().then(function(){console.log('... done')});
});

app.listen(config.port);