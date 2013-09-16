var 
    Q       = require('q'),
    async   = require('async'),
    concat  = require('./../../../viadeo-trunk-less-parsing/assets/lessCompilation/concatFilesToString'),
    compileLessData = require('./compileLessData')
;

function lessCompilation(packages){

    var 
        deferred = Q.defer(),
        report = {}
    ;
    
    async.forEach(Object.keys(packages), compileLessPackage, function(err){ 
        deferred[err ? 'reject' : 'resolve'](err ? err : report);
    });
    
    function compileLessPackage(packageName, next){
        
        var filesReferencesArray = packages[packageName];
        
        concat(filesReferencesArray)
            .then(compileLessData)
            .then(function(res){
                report[packageName] = res;
                next();
            })
        ;
        
    }
    
    return deferred.promise;
    
}


module.exports = lessCompilation;