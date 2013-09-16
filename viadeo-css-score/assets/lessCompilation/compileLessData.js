var 
    Q       = require('q'),
    path    = require('path'),
    conf    = require('./../../../viadeo-trunk-less-parsing/conf'),
    less    = require('less'),
    cwd     = process.cwd(),
    lesspaths = conf["common"].lesspaths.map(function(lesspath){ return path.join(cwd, lesspath); }),
    cssScore = require('css-specificity-score')
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

                cssScore(css, function (err, report) {
                    deferred.resolve({
                        passed : true,
                        selectorsCount : report.length,
                        //cssReport : report,
                        err : err
                    });
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