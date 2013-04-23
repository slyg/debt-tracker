var 
    Q = require('q'),
    async = require('async')
;

module.exports= function(wro){
    
    var 
        deferred = Q.defer(),
        packages = wro.groups.group,
        lessFilesPath = []
    ;
    
        
    
    async.each(packages, getLessPaths, function(err){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(lessFilesPath);
        }
    });
    
    
    
    function getLessPaths(package, next){
        
        var lessPackages = package.css
        
        if(lessPackages && lessPackages.length > 0) {
             
            async.each(lessPackages, function(lessFilePath, next){
                if(validPath(lessFilePath)) lessFilesPath.push(lessFilePath);
                next();
            }, function(err){
                if(err) {
                    deferred.reject(err);
                } else {
                    next();
                }
            });
            
        } else { next(); }
    }
    
    
    
    function validPath(path){ return (path.indexOf("classpath") == -1) ? true : false; }
    
    
    
    return deferred.promise;
    
}