var 
    Q = require('q'),
    async = require('async'),
    fs = require('fs')
;

module.exports= function(filePaths){
    
    var 
        deferred = Q.defer(),
        report = []
    ;
    
    async.each(filePaths, checkExistence, function(err){
        if(err) {
            console.log(err);
            deferred.reject(err);
        } else {
            deferred.resolve(report);
        }
    });
    
    function checkExistence(filePath, next){
        fs.exists(filePath, function (exists) {
            if(!exists) report.push(filePath);
            next();
        });
    }
    
    return deferred.promise;
    
}