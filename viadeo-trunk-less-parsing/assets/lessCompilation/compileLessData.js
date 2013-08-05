var 
    Q       = require('q'),
    path    = require('path'),
    conf    = require('./../../conf'),
    less    = require('less'),
    cwd     = process.cwd(),
    lesspaths = conf["common"].lesspaths.map(function(lesspath){ return path.join(cwd, lesspath); })
;

module.exports = function compileLessData(data){

    var 
        deferred = Q.defer(),
        parser = new (less.Parser)({ paths: lesspaths })
    ;
    
    if(typeof data != "string") {
    
        deferred.resolve(data);
    
    } else {
        
        parser.parse(data, function(err, tree) {
            
            if(err) deferred.resolve({
                passed : false, 
                err : err
            });
            
            try {
                var css = tree.toCSS({compress:true});
                deferred.resolve({
                    passed : true, 
                    err : null
                });
            } catch(err){
                deferred.resolve({
                    passed : false, 
                    err : err
                });
            };
            
        });
    
    }
    
    return deferred.promise;
}