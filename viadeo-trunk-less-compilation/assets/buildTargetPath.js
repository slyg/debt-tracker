var 
    Q       = require('q'),
    fs      = require('fs'),
    path    = require('path'),
    conf    = require('../conf'),
    dir     = conf.svn.dir,
    src     = conf.svn.src
;

module.exports = function(ws){
        
    var 
        deferred = Q.defer(),
        targetPath = path.join(ws, dir, src)
    ;
    
    deferred.resolve(targetPath);
    
    return deferred.promise;
    
}