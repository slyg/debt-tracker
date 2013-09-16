var 
    Q       = require('q'),
    async	= require('async'),
    cssScore = require('css-specificity-score')
;

module.exports = function(rawData){

	var deferred = Q.defer();

	async.each(Object.keys(rawData), function(packageName, next){

		var packageItem = rawData[packageName];

		if(packageItem.passed) {
			try {
				cssScore(packageItem.css, function(err, report){
					if(!err){
						packageItem['selectorCount'] = report.length;
					}
					delete packageItem.css;
					next();
				})
			} catch (e) {
				delete packageItem.css;
				next();
			}
		} else { next(); }

	}, function(err){

		if (!err) {
			deferred.resolve(rawData);
		} else {
			deferred.reject(err);
		}

	});

    return deferred.promise;

}

