var Q = require('q');
var _ = require('underscore');
var enabledJobs = require('../conf/enabled.jobs');
var fs = require('fs');
var path = require('path');
var conf = require('../conf/server')

exports.start = function(){

	var deferred = Q.defer();
	var cwd = process.cwd()
	
	console.log("Grabbing data ...");

	var jobPromises = enabledJobs.map(function(ref){ return require('./' + ref)(); });

	Q.all(jobPromises).then(function(results){

		_.each(results, function(result, index){

			fs.writeFile(
				path.join(cwd, conf.reportsPath, enabledJobs[index] +'.json'), 
				JSON.stringify(result, null, 4),
				function(err) { if(err) throw new Error(err); }
			);

		});

		deferred.resolve();

	}, deferred.reject)

	return deferred.promise;

}

exports.init = function(){} // TODO, checkout repos then generate report
exports.update = function(){} // TODO, update repos then generate report

if(!module.parent) { exports.start(); }