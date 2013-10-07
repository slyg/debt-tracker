
    var 
        path            = require('path'),
        Q               = require('q'),
        reposCo         = require('./utils/repos-co'),
        enabledRepos    = require('../../conf/enabled.repos')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        Q   
            .all(reposCo(enabledRepos))
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
