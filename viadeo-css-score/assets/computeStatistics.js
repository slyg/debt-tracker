var 
    Q       = require('q'),
    async	= require('async'),
    _		= require('underscore'),
    cssScore = require('css-specificity-score')
;

module.exports = function(rawData){

	var deferred = Q.defer();

	async.each(Object.keys(rawData), function(packageName, next){

		var packageItem = rawData[packageName];

		if(packageItem.passed) {
			// TODO : REMOVE THIS TRY/CATCH
			try {
				cssScore(packageItem.css, function(err, report){
					if(!err){

						packageItem['selectorsCount'] = report.length;

						if(packageItem['selectorsCount'] == 0) { 

							packageItem['passed'] = false;
							packageItem['err'] = { message : "no selector found" };

						} else {

							packageItem['cssLength'] = packageItem.css.length;

							packageItem['score'] = _.reduce(report, function(memo, selector){ return memo + selector.score; }, 0);
							packageItem['avgScore'] = packageItem['score'] % packageItem['selectorsCount'];
							packageItem['highestScore'] = _.max(report, function(selector){ return selector.score; });

							packageItem['explainScore'] = _.reduce(report, function(memo, selector){ return memo + selector.explainScore; }, 0);
							packageItem['explainAvgScore'] = packageItem['explainScore'] % packageItem['selectorsCount'];
							packageItem['explainHighestScore'] = _.max(report, function(selector){ return selector.explainScore; });

						}

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

