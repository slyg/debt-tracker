var 
    Q = require('q'),
    async = require('async'),
    conf = require('./../conf'),
    path = require('path')
;

module.exports = function(rawWro){
    
    var 
        deferred = Q.defer(),
        formatedWro = {}
    ;

    async.forEach(Object.keys(rawWro), insertGroupRef, function(err){
        deferred[err ? 'reject' : 'resolve'](err ? err : formatedWro);
    });
    
    function insertGroupRef(objKey, next){
        
        var 
            packageName = objKey,
            groupRefs = rawWro[objKey].groupRefs
            len = groupRefs.length,
            groupRefResources = []
        ;
        
        formatedWro[packageName] = rawWro[packageName].resources;
        
        if(len > 0) {
            while(len--){
            
                groupRefResources = rawWro[groupRefs[len]];
            
                if (typeof groupRefResources != "undefined") {
                
                    formatedWro[packageName] = groupRefResources.resources.concat(formatedWro[packageName]);
                    
                }
            }
        }
        
        // remove duplicates
        formatedWro[packageName] = formatedWro[packageName].filter(function(elem, pos, self) {
            return self.indexOf(elem) == pos;
        });
        
        next();
        
    }
    
    return deferred.promise;
    
}