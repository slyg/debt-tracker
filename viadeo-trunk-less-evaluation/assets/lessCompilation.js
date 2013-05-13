var 
    Q       = require('q'),
    path    = require('path'),
    conf    = require('./../conf'),
    async   = require('async'),
    less    = require('less'),
    concat  = require('./concatFilesToString'),
    path    = require('path')
;

function lessCompilation(packages){

    var 
        deferred = Q.defer(),
        report = {}
    ;
    
    async.forEach(Object.keys(packages), compileLessPackage, function(err){ 
        deferred[err ? 'reject' : 'resolve'](err ? err : report);
    });
    
    function compileLessPackage(packageName, next){
        
        var filesReferencesArray = packages[packageName];
        
        concat(filesReferencesArray)
            .then(compileLessFiles)
            .then(function(report){
                report[packageName] = report;
                next();
            })
        ;
        
    }
    
    return deferred.promise;
    
}

function compileLessFiles(data){

    var 
        deferred = Q.defer(),
        parser = new (less.Parser)({
            paths: [
                path.join(process.cwd(), conf["viadeo-jsp"].lessfiles.path, "/css"),
                path.join(process.cwd(), conf["frontend-framework"].lessfiles.path, "/less/foundation")
            ]
        })
    ;
    
    if(typeof data != "string") {
    
        deferred.resolve(data);
    
    } else {
        
        parser.parse(data, function(err, tree) {
        
            if (err) { return console.error(err) }
            
            if(err) deferred.resolve({err : err});
            
            deferred.resolve(tree.toCSS());
        });
    
    }
    
    return deferred.promise;
}

module.exports = lessCompilation;