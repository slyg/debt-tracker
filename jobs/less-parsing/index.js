
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
            .then(require('./utils/buildTargetPath'))      // returns target file (wro.xml file)
            .then(require('./utils/parseXmlFile'))         // returns wro.xml as js object
            .then(require('./utils/getLessFiles'))         // returns an array of css files paths
            .then(require('./utils/lessCheck'))            // launch less parsing and returns a report
            .then(deferred.resolve, deferred.reject)
        ;
        
        return deferred.promise;
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }