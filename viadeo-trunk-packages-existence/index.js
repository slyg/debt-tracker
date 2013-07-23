
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
            .all([
                require('./assets/svn-co').viadeoJsp(),   // svn checkout of viadeo-jsp module
                require('./assets/svn-co').viadeoFf()     // svn checkout of frontend-framework module
            ])
            //.fcall(function(){ return true; })          // used for dev only
            .then(require('./assets/parseWro'))             // returns wro.xml as js object -> wro
            .then(require('./assets/getFiles'))		        // returns an array of file paths
            .then(require('./assets/putAbsolutePath'))      // returns array of file paths w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./assets/checkExistence'))
            //.then(function(stuff){
            //    console.log( util.inspect(stuff, false, null) );
            //}, function(err){
		    //  console.log( util.inspect(err, false, null) );
            //})
            .then(function(report){
                deferred.resolve({"data": report});
            }, function(err){
                deferred.reject(err);
            })
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    
