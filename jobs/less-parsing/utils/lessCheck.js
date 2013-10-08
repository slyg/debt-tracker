    
    var 
        path        = require('path'),
        fs          = require('fs'),
        less        = require('less'),
        conf        = require('../conf'),
        async       = require('async'),
        Q           = require('q'),
        ws          = conf.workspace.path,
        webappdir   = conf.workspace.webapp
    ;
    
    function main(lessFilesPaths){
    
        var 
            report      = [],
            deferred = Q.defer()
        ;
        
        async.each(lessFilesPaths, function(lessFilePath, next){
            
            checkLessFile(lessFilePath, function(fileReport){
                report.push(fileReport);
                next();
            });
            
        }, function(err){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(report);
            }
        });
        
        return deferred.promise;
    
    }
    
    function checkLessFile(filePath, cb){
    
        var 
            targetPath = path.join(process.cwd(), ws, webappdir, filePath),
            fileReport = {reference : filePath, found : false, valid : false, err : null}
        ;
        
        fs.readFile(targetPath, function (err, data) {
        
            if (err) {
                fileReport.err = {type : 'not found', details : err};
                cb(fileReport);
            } else {
                fileReport.found = true;
                var parser = new (less.Parser)({});
                parser.parse(data.toString(), function(err, tree){
                    if(err) {
                        fileReport.err = {type : 'parsing', details : err};
                    } else {
                       fileReport.valid = true;
                    }
                    cb(fileReport);
                });
            }
            
        });
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }