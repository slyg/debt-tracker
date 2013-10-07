var 
    Q = require('q'),
    async = require('async')
;

module.exports= function(wro){
    
    var 
        deferred = Q.defer(),
        packages = wro.groups.group,
        resources = []
    ;
    
    async.each(packages, getLessPaths, function(err){
        if(err) {
            console.log(err);
            deferred.reject(err);
        } else {
            deferred.resolve(resources);
        }
    });
    
    function getLessPaths(package, next){

        if(
            typeof package.css === undefined || typeof package.js === undefined 
        ) { next(); } else { 
            
            if(typeof package.css != "undefined") { //console.log(package.css)
                Array.prototype.push.apply(resources, package.css);
            }
            if(typeof package.js != "undefined") { //console.log(package.css)
                Array.prototype.push.apply(resources, package.js);
            }
            next();

        }
        
    }
    
    return deferred.promise;
    
}