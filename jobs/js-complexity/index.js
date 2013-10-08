    
    var 
        Q           = require('q'),
        cwd         = process.cwd(),
        path        = require('path'),
        conf        = require('./conf'),
        jscr        = require('jscomplexity'),
        util        = require('util')
    ;
    
    function main(){
    
        var 
            deferred = Q.defer(),
            jsTreeFilePath = path.join(cwd, conf.workspace.path, conf.workspace.targetDir)
        ;
        
        jscr(jsTreeFilePath, function(err, report){
        
            if(err) deferred.reject(err);
            
            deferred.resolve(report);
            
        });
        
        return deferred.promise;
    
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }