
    var 
        path            = require('path'),
        Q               = require('q'),
        reposUp         = require('./utils/repos-up'),
        enabledRepos    = require('../../conf/enabled.repos')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        Q   
            .all(reposUp(enabledRepos))
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
