
    var 
        path        = require('path'),
        Q           = require('q')
    ;
    
    function main(){
    
        var 
            localConf   = require('./conf'),
            deferred    = Q.defer()
        ;
        
        Q
            .fcall(function(){return true})
            .then(require('./assets/buildTargetPath'))      // returns target file (wro.xml file)
            .then(require('./assets/parseXmlFile'))         // returns wro.xml as js object
            .then(require('./assets/getLessFiles'))         // returns an array of css files paths
            .then(require('./assets/lessCheck'))            // launch less parsind and returns a report
            .then(function(report){
                deferred.resolve({"data": report});
            }, function(err){
                deferred.reject(err);
            })
        ;
        
        return deferred.promise;
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }