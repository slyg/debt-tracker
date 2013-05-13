// This module handles yslowjs process

var 
    async           = require('async'),
    Q               = require('q'),
    yslowLog        ={},
    exec = require('child_process').exec
;

module.exports = function yslowHandler(url, conf) { // conf ignored for now
    var deferred = Q.defer();

    function getYrules(log) {
        var obj = {
            "weight":log.w,
            "score":log.o,
            "req":log.r,
            "report":[log.g.ydupes,log.g.yredirects,log.g.yno404,log.g.yemptysrc,log.g.ymindom]
        };
       
        return obj;
    }

    async.each(url, function (url, next) {
        exec('phantomjs ' + process.cwd() + '/widgets/viadeo-page-crawler/assets/yslow.js --info grade ' + url, function (error, result) {
            //if (error) console.log(error);
            yslowLog = getYrules(JSON.parse(result));
            next();
        });


    }, function (err) {
        if (err) { deferred.reject(err); } else { deferred.resolve(yslowLog); }
    });

    return deferred.promise;

};