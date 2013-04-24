
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        redmine     = new (require(__dirname + './../lib/redmine'))(conf.redmine),
        Q           = require('q'),
        trendValStack  = []
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        redmine.getIssues({query_id: "640", limit : "1"}, function(err, data) {
        
            if(err) deferred.reject(err);
            
            trendValStack.push(data['total_count']);
            
            if(trendValStack.length > 15) trendValStack = trendValStack.shift();
            
            deferred.resolve({"values": trendValStack});
            
        });
        
        return deferred.promise;

    }
    
    if(!module.parent) { main(); } else { module.exports = main; }