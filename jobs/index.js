var Q = require('q');
var _ = require('underscore');
var enabledJobs = require('../conf/enabled.jobs');
var fs = require('fs');
var path = require('path');

exports.start = function(next){
	
	console.log("Grabbing data ...");

	var jobPromises = enabledJobs.map(function(ref){ return require('./' + ref)(); });

	Q.all(jobPromises).then(function(results){

		_.each(results, function(result, index){

			fs.writeFile(
				path.join(process.cwd(), "/reports/", enabledJobs[index] +'.json'), 
				JSON.stringify(result, null, 4),
				function(err) { if(err) throw new Error(err); }
			);

		});

		if(next) next();

	}, function(err){ console.log(err); })

	
}

exports.init = function(){} // TODO, checkout repos then generate report
exports.update = function(){} // TODO, update repos then generate report

if(!module.parent) { exports.start(); }