var 
    Q = require('q'),
    async = require('async'),
    fs = require('fs')
;

module.exports = function(files){

    var deferred = Q.defer();
    
    async.waterfall([
        async.apply(read, files),
        async.apply(write)
    ], function(result){
        if(typeof result == "string") deferred.resolve(result);
        deferred.resolve({err : result});
    });
        
    return deferred.promise;

}

function write(buffers, cb) {
    var buf = Buffer.concat(buffers);
    cb(buf.toString());
}

function read(files, cb) {
    async.mapSeries(files, readFile, cb);
    function readFile(filePath, cb) { fs.readFile(filePath, cb); }
}