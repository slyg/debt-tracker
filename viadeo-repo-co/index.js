
    var 
        path        = require('path'),
        Q           = require('q'),
        repoCo      = require('./assets/repo-co')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        Q   
            .all(repoCo([
                'viadeo-jsp',
                'frontend-framework'
            ]))
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
