// This module handles yslowjs process

var 
    async           = require('async'),
    Q               = require('q'),
    yslowLog        ={},
    exec = require('child_process').exec
;



module.exports = function yslowHandler(url) {
    var deferred = Q.defer();

    function getYrules(log) {
        var obj = {
            "weight": log.w,
            "score": log.o,
            "req": log.r,
            "report": [log.g.ydupes, log.g.yredirects, log.g.yno404, log.g.yemptysrc, log.g.ymindom],
            "optional":[log.g.ynumreq,log.g.ycompress,log.g.yexpires,log.g.ycsstop,log.g.yjsbottom,log.g.yexpressions,log.g.yexternal,log.g.ydns,log.g.yminify,log.g.yetags,log.g.yxhr,log.g.yxhrmethod,log.g.ymincookie,log.g.ycookiefree,log.g.ynofilter,log.g.yimgnoscale,log.g.yfavicon]
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