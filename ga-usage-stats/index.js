
    var 
        conf = require(process.env.PWD + '/conf'),
        Q    = require('q')
    ;
    
    function main(){
    
        var deferred = Q.defer(),
            spawn    = require('child_process').spawn,
            caspercl = spawn('casperjs', [
                '--ignore-ssl-errors=true', 
                '--load-images=false', 
                './assets/scraper.js'
            ])
        ;
        
        caspercl.stdout.on('data', function (data) {
        
            deferred.resolve({"avg_req_per_day" : data);
        
            console.log('stdout: ' + data);
        });
        
        caspercl.stout.on('error', function(err){ deferred.reject(err); });
            
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
