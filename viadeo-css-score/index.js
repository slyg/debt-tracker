
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
            .then(require('./../viadeo-trunk-less-parsing/assets/parseWro'))          // returns wro.xml as js object -> wro
            .then(require('./../viadeo-trunk-less-parsing/assets/getLessPackages'))   // returns raw less packages & classpath & group-ref dependencies
            .then(require('./../viadeo-trunk-less-parsing/assets/putAbsolutePath'))   // returns wro w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./../viadeo-trunk-less-parsing/assets/evaluateGroupRef'))  // returns wro with group-ref replaced by original group
            .then(require('./../viadeo-trunk-less-parsing/assets/lessCompilation'))   // compiles groups and returns report
            .then(require('./assets/computeStatistics'))
            .then(function(report){

                var formatedReport = _.map(report, function(item, key){ item.label = key; return item; });

                console.log( util.inspect(formatedReport, false, null) );
                deferred.resolve({"data": formatedReport});
                
            }, function(err){
                deferred.reject(err);
            })
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    