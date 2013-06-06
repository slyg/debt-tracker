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
                "statusList": []
            }
        );
    }

    async.eachSeries(urlsStatus, function (urlList, next) {
        async.eachLimit(urlList.urlList, 10, function (url, next) {
            request(url, function (error, response, body) {
                if (response != undefined) {
                    if (response.statusCode != 200) {
                        urlList.statusList.push({
                            "url":url,
                            "status":response.statusCode
                        });
                    }
                        next();
                }
            })
        },function(){
            next();
        }
    );

    }, function (err) {
        //console.log(urlsStatus)
        deferred.resolve(urlsStatus);
    });

    return deferred.promise;

};