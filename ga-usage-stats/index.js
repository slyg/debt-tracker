
    var 
        conf = require(process.env.PWD + '/conf'),
        Q    = require('q'),
        path = require('path')
    ;
    
    function main(){
    
        var deferred = Q.defer(),
            spawn    = require('child_process').spawn,
            caspercl = spawn('casperjs', [
                '--ignore-ssl-errors=true', 
                '--load-images=false', 
                path.resolve(__dirname, './scraper.js')
            ])
        ;
        
        caspercl.stdout.on('data', function (data) {
            deferred.resolve({"avg_req_per_day" : data.toString('utf8')});
        });
        
        caspercl.stdout.on('error', function(err){ deferred.reject(err); });
            
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
