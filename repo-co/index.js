
    var 
        path        = require('path'),
        Q           = require('q'),
        repoCo      = require('./assets/repos-co'),
        conf        = require('./conf')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        Q   
            .all(repoCo(conf.repos))
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
