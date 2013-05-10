// This module handles yslowjs process

var 
    async           = require('async'),
    Q               = require('q'),
    yslowLog        ={},
    exec = require('child_process').exec
;

module.exports = function yslowHandler(url, conf) { // conf ignored for now
    var deferred = Q.defer();
    var yrules = {
        id: "yrules",
        name: "Yrules",
        rules: {
            ydupes: {},
            yredirects: {},
            yno404: {},
            yemptysrc: {},
            ymindom: {}

        },
        weights: {}
    };

    function getYrules(log) {
        var obj = {};
        obj.poids = log.w;
        obj.score = log.o;
        obj.req = log.r;
        obj.report =[
            log.g.ydupes,
            log.g.yredirects,
            log.g.yno404,
            log.g.yemptysrc,
            log.g.ymindom
        ]
        obj.mindom = log.g.ymindom;
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