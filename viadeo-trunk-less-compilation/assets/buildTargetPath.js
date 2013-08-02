var 
    Q       = require('q'),
    fs      = require('fs'),
    path    = require('path'),
    conf    = require('../conf'),
    dir     = conf.svn.dir,
    src     = conf.svn.src
    ws      = conf.workspace.path
;

module.exports = function(){
        
    var 
        deferred = Q.defer(),
        targetPath = path.join(process.cwd(), ws, dir, src)
    ;
    
    deferred.resolve(targetPath);
    
    return deferred.promise;
    
}