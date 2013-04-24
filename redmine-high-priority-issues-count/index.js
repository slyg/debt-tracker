
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        redmine     = new (require(__dirname + './../lib/redmine'))(conf.redmine),
        Q           = require('q')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        redmine.getIssues({query_id: "732", limit : "1"}, function(err, data) {
        
            if(err) deferred.reject(err);
            
            deferred.resolve({"value" : data['total_count']});
            
        });
        
        return deferred.promise;

    }
    
    if(!module.parent) { main(); } else { module.exports = main; }