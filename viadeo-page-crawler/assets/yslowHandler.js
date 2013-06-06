// This module handles yslowjs process

var 
    async           = require('async'),
    Q               = require('q'),
    yslowLog        = [],
    exec = require('child_process').exec
;



module.exports = function yslowHandler(urls) {
    var deferred = Q.defer();

    function getYrules(log, url) {
        log.g.ydupes.name = "Remove duplicate JS and CSS";
        log.g.yredirects.name = "Avoid redirects";
        log.g.yno404.name = "No 404s";
        log.g.yemptysrc.name = "Avoid empty src or href";
        log.g.ymindom.name = "Reduce the Number of DOM elements";
        log.g.ynumreq.name = "Make fewer HTTP requests";
        log.g.ycdn = "Use a CDN";
        log.g.ycompress.name = "Compress components";
        log.g.yexpires.name = "Add an Expires header";
        log.g.ycsstop.name = "Put CSS at top";
        log.g.yjsbottom.name = "Put Javascript at the bottom";
        log.g.yexpressions.name = "Avoid CSS expression";
        log.g.yexternal.name = "Make JS and CSS external";
        log.g.ydns.name = "Reduce DNS lookups";
        log.g.yminify.name = "Minify JS and CSS";
        log.g.yetags.name = "Configure ETags";
        log.g.yxhr.name = "Make Ajax cacheable";
        log.g.yxhrmethod.name = "Use GET for AJAX requests";
        log.g.ymincookie.name = "Reduce Cookie Size";
        log.g.ycookiefree.name = "Use Cookie-free Domains";
        log.g.ynofilter.name = "Avoid filters";
        log.g.yimgnoscale.name = "Don't Scale Images in HTML";
        log.g.yfavicon.name = "Make favicon Small and Cacheable";

        var obj = {
            "url": url,
            "weight": log.w,
            "score": log.o,
            "req": log.r,
            "report": [log.g.ydupes, log.g.yredirects, log.g.yno404, log.g.yemptysrc, log.g.ymindom],
            "optional": [log.g.ynumreq, log.g.ycdn, log.g.ycompress, log.g.yexpires, log.g.ycsstop, log.g.yjsbottom,
            log.g.yexpressions, log.g.yexternal, log.g.ydns, log.g.yminify, log.g.yetags, log.g.yxhr, log.g.yxhrmethod,
            log.g.ymincookie, log.g.ycookiefree, log.g.ynofilter, log.g.yimgnoscale, log.g.yfavicon]
        };

        return obj;
    }

    async.each(urls, function (url, next) {
        exec('phantomjs ' + __dirname + '/yslow.js --info grade ' + url, function (error, result) {
            //if (error) console.log(error);
            yslowLog.push(getYrules(JSON.parse(result), url));
            next();
        });


    }, function (err) {
        if (err) { deferred.reject(err); } else { deferred.resolve(yslowLog); }
    });

    return deferred.promise;

};