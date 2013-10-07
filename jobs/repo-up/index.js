
    var 
        path        = require('path'),
        Q           = require('q'),
        reposUp      = require('./utils/repos-up'),
        conf        = require('./conf')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        Q   
            .all(reposUp(conf.repos))
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
