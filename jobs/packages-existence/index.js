
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
            .fcall(function(){ return true; })              // used for dev only
            .then(require('./assets/parseWro'))             // returns wro.xml as js object -> wro
            .then(require('./assets/getFiles'))		        // returns an array of file paths
            .then(require('./assets/putAbsolutePath'))      // returns array of file paths w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./assets/checkExistence'))
            .then(function(report){
                deferred.resolve({"data": report});
            }, function(err){
                deferred.reject(err);
            })
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
