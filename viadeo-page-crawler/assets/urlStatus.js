var 
    async = require('async'),
    Q = require('q'),
    request = require('request'),
    urlsStatus = [];
;


module.exports = function urlStatus(report) {

    var deferred = Q.defer();

    for (key in report) {
        urlsStatus.push(
            {
                "name": key,
                "urlList": report[key].href,
                "statusList": [],
                "ratio": 0
            }
        );
    }

    async.eachSeries(urlsStatus, function (urlList, next) {
        var err4 = 0;
        async.eachLimit(urlList.urlList, 10, function (url, next) {
            request(url, function (error, response, body) {
                if (response != undefined) {
                    if (response.statusCode != 200) {
                        urlList.statusList.push({
                            "url": url,
                            "status": response.statusCode
                        });
                        if (response.statusCode == 401 || response.statusCode == 403) {
                            err4++;
                        }
                    }
                    urlList.ratio = Math.round(err4 / urlList.urlList.length * 100);
                    next();
                }
            })
        }, function (err) {
            if (err) console.log;
            next();
        }
    );

    }, function (err) {
        deferred.resolve(urlsStatus);
    });

    return deferred.promise;

};