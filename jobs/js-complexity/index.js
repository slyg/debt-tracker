    
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

            report.map(function(item){ 
                var path = item.path;
                var spath = path.split(conf.workspace.targetDir)
                item.relPath = spath[1];
                return item;
            });
            
            deferred.resolve(report);
            
        });
        
        return deferred.promise;
    
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }