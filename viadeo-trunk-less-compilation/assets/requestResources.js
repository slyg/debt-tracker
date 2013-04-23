var 
    Q = require('q')
    request = require('request'),
    async = require('async'),
    hasCSSErrors = require('./hasCSSErrors'),
    conf = require('../conf')
;

module.exports = function(resourcesList){

    var 
        deferred = Q.defer(),
        url = conf.remote.location,
        type = ".css",
        report = []
    ;
    
    async.each(resourcesList, requestResource, function(err){
        
        if(err) { deferred.reject(report); } else {
            deferred.resolve(report);
        }
        
    });
    
    function requestResource(resourceRef, next){
        var resourceUrl = url + resourceRef + type;
        request.get({url : resourceUrl}, function(err, res){
        
            if(err) deferred.reject(err);
        
            report.push({
                url     : resourceUrl,
                status  : res.statusCode,
                valid   : !hasCSSErrors(res.body.toString())
            });
            
            next();
        
        }); 
    }

    return deferred.promise;
    
}