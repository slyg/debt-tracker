var 
    async = require('async'),
    Q = require('q'),
    request = require('request'),
    statusList = [];
;


module.exports = function urlStatus(links) {

    var deferred = Q.defer();

    async.each(links, function (target, next) {
        request(target, function (error, response, body) {
            if (response != undefined) {
                console.log(response.statusCode);
                /*if(response.statusCode!=200){*/
                        statusList.push(
                        {
                            "url": target,
                            "status": response.statusCode
                        }
                     )
                /*}*/
                
                next();
            }
        })

    }, function (err) {
        if (err) { deferred.reject(err); } else { deferred.resolve(statusList); }
    });

    return deferred.promise;

};