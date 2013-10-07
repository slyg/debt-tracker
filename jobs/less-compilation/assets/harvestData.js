var 
    Q = require('q'),
    async = require('async')
;

module.exports= function(wro){
    
    var 
        deferred = Q.defer(),
        packages = wro.groups.group,
        cssPackages = []
    ;
    
    async.each(packages, pushJSPackages, function(err){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(cssPackages);
        }
    });

    function pushJSPackages(package, next){
        // if package has css/less resources push it to the results
        if('css' in package) cssPackages.push(package['$'].name);
        next();
    }
    
    return deferred.promise;
    
}