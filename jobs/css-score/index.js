
    var 
        path        = require('path'),
        Q           = require('q'),
        util        = require('util'),
        _           = require('underscore')
    ;
    
    function main(){
    
        var 
            deferred    = Q.defer()
        ;
        
        Q   
            .fcall(function(){ return true; })
            .then(require('./../less-compilation/utils/parseWro'))          // returns wro.xml as js object -> wro
            .then(require('./../less-compilation/utils/getLessPackages'))   // returns raw less packages & classpath & group-ref dependencies
            .then(require('./../less-compilation/utils/putAbsolutePath'))   // returns wro w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./../less-compilation/utils/evaluateGroupRef'))  // returns wro with group-ref replaced by original group
            .then(require('./../less-compilation/utils/lessCompilation'))   // compiles groups and returns report
            .then(require('./utils/computeStatistics'))
            .then(function(report){

                var formatedReport = _.map(report, function(item, key){ item.label = key; return item; });

                //console.log( util.inspect(formatedReport, false, null) );
                deferred.resolve(formatedReport);
                
            }, function(err){
                deferred.reject(err);
            })
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    