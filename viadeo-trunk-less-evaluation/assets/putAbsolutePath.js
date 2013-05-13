var 
    Q = require('q'),
    async = require('async'),
    conf = require('./../conf'),
    path = require('path')
;

module.exports = function(rawWro){
    
    var 
        deferred = Q.defer(),
        formatedWro = rawWro,
        currentDir = process.cwd()
    ;
    
    async.forEach(Object.keys(rawWro), putPaths, function(err){  
        deferred[err ? 'reject' : 'resolve'](err ? err : formatedWro);
    });
    
    function putPaths(objKey, next){
        
        var 
            packageName = objKey,
            resources = rawWro[objKey].resources,
            len = resources.length, i = 0,
            formatedResources = []
        ;
        
        for(; i<len;i++){
        
            if(resources[i].indexOf("classpath") != -1) {
            
                formatedResources.push(
                    path.join(
                        currentDir,
                        conf['frontend-framework'].workspace.path,
                        conf['frontend-framework'].lessfiles.path,
                        resources[i].replace("classpath:", "")
                    )
                ); 
            } else {
                formatedResources.push(
                    path.join(
                        currentDir,
                        conf['viadeo-jsp'].workspace.path, 
                        conf['viadeo-jsp'].lessfiles.path,
                        resources[i]
                    )
                )
            }
        
        }
        
        rawWro[packageName].resources = formatedResources;
        
        next();
        
    }
    
    return deferred.promise;
    
}