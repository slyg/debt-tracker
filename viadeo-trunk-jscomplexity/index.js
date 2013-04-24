 
    var 
        request     = require('request'),
        timeCounter = require(__dirname + './../lib/timeCounter'),
        Q           = require('q')
    ;
    
    function main(){
    
        var 
            svnconf = require('./conf'),
            scansvn = require('./assets/scan'),
            formatData = require('./assets/formatData'),
            repo = svnconf.svn.repo,
            deferred = Q.defer()
        ;
        
        scansvn(repo, function(err, report){
        
            if(err) deferred.reject(err);
            
            var data = formatData(report);
            
            deferred.resolve({
                "data": data
            });
            
        });
        
        return deferred.promise;
    
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }