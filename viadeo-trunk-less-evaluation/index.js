
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
            //.all([
            //    require('./assets/svn-co').viadeoJsp(),         // svn checkout of viadeo-jsp module
            //    require('./assets/svn-co').viadeoFf()         // svn checkout of frontend-framework module
            //])
            .fcall(function(){ return true; })
            .then(require('./assets/parseWro'))          // returns wro.xml as js object -> wro
            .then(require('./assets/getLessPackages'))   // returns raw less packages & classpath & group-ref dependencies
            .then(require('./assets/putAbsolutePath'))   // returns wro w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./assets/evaluateGroupRef'))  // returns wro with group-ref replaced by original group
            .then(require('./assets/lessCompilation'))   // compiles groups and returns report
            //.then(function(stuff){
                //console.log( util.inspect(stuff, false, null) );
            //})
            //.then(function(report){
            //    deferred.resolve({"data": report});
            //}, function(err){
            //    deferred.reject(err);
            //})
            //.done()
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    