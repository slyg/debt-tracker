var 
    Q = require('q'),
    async = require('async'),
    conf = require('./../conf'),
    path = require('path')
;

module.exports = function(filesRelPaths){
    
    var 
        deferred = Q.defer(),
        currentDir = process.cwd(),
        absolutePaths = []
    ;
    
    async.each(filesRelPaths, putAbsolutePaths, function(err){ 
        deferred[err ? 'reject' : 'resolve'](err ? err : absolutePaths);
    });
    
    function putAbsolutePaths(fileRelativePath, next){
        
        
            if(fileRelativePath.indexOf("classpath") != -1) {
            
                absolutePaths.push(
                    path.join(
                        currentDir,
                        conf['frontend-framework'].workspace.path,
                        conf['frontend-framework'].lessfiles.path,
                        fileRelativePath.replace("classpath:", "")
                    )
                ); 
            } else {
                absolutePaths.push(
                    path.join(
                        currentDir,
                        conf['viadeo-jsp'].workspace.path, 
                        conf['viadeo-jsp'].lessfiles.path,
                        fileRelativePath
                    )
                )
            }
        
        next();
        
    }
    
    return deferred.promise;
    
}