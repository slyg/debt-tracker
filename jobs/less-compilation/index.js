
    var 
        path        = require('path'),
        Q           = require('q'),
        util        = require('util')
    ;
    
    function main(){
    
        var 
            deferred    = Q.defer()
        ;
        
        Q   
            .fcall(function(){ return true; })
            .then(require('./utils/parseWro'))          // returns wro.xml as js object -> wro
            .then(require('./utils/getLessPackages'))   // returns raw less packages & classpath & group-ref dependencies
            .then(require('./utils/putAbsolutePath'))   // returns wro w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./utils/evaluateGroupRef'))  // returns wro with group-ref replaced by original group
            .then(require('./utils/lessCompilation'))   // compiles groups and returns report
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    