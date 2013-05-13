var 
    Q   = require('q'),
    fs  = require('fs'),
    parseString = require('xml2js').parseString
;

module.exports = function(path){

    var deferred = Q.defer();
    
    fs.readFile(path, function (err, data) {
    
        if (err) {  deferred.reject(err); } else {
      
          var xml = data.toString();
          
          parseString(xml, function (err, result) {
            if(err) {
                deferred.reject(err);
            } else { deferred.resolve(result); }
            
          });
      
        }
        
    });
    
    return deferred.promise;
    
}