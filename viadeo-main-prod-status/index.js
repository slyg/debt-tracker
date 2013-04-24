    
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(__dirname + './../lib/timeCounter'),
        Q           = require('q')
    ;
    
    function main(){
    
        var deferred = Q.defer();
    
        // Prod status
        timeCounter.register('prod status');
        request.get({url : conf.viadeo.url.main.prod}, function(err, response){
            
            if(err) deferred.reject(err);
            
            deferred.resolve({
                "value": response.statusCode,
                "delay": timeCounter.getFormatedDelay('prod status')
            });
                
        });
        
        return deferred.promise;
         
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }