var 
    Q = require('q'),
    async = require('async')
;

module.exports= function(wro){
    
    var 
        deferred = Q.defer(),
        packages = wro.groups.group,
        lessPackages = {}
    ;
    
    async.each(packages, getLessPaths, function(err){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(lessPackages);
        }
    });
    
    function getLessPaths(package, next){
    
        var lessPackage = {
            name : "",
            resources : []
        }
        
        if(
            typeof package.css == "undefined" 
            || typeof package['$'].name == "undefined" 
            || typeof package.css == "undefined"
            || package['$'].name == ""
        ) { next(); } else {
        
            lessPackages[package['$'].name] = {
                resources : package.css,
                groupRefs : (typeof package['group-ref'] == "undefined" || package['group-ref'].length == 0) ? [] : package['group-ref']
            };
            
            next();
        }
        
    }
    
    return deferred.promise;
    
}