
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        _           = require('underscore'),
        redmine     = new (require(__dirname + './../lib/redmine'))(conf.redmine),
        Q           = require('q')
    ;
    
    function main(){
    
        var deferred = Q.defer();
        
        redmine.getIssues({query_id: "640", limit : "50"}, function(err, data) {
        
            var
                repartition = {}
                names       = [],
                counts      = []
            ;
        
            if(err) deferred.reject(err);
            
            _.each(data.issues, function(issue){
            
                var assignee = issue.assigned_to.name;
                
                if(repartition[assignee] == undefined) {
                    repartition[assignee] = 1;
                } else {
                    repartition[assignee] = repartition[assignee]+1
                }
                
            });
            
            for (var key in repartition) {
                if (repartition.hasOwnProperty(key)) {
                    console.log(key, repartition[key]);
                    names.push(key);
                    counts.push(repartition[key])
                }
            }
            
            deferred.resolve({"values" : counts});
            
        });
        
        return deferred.promise;
        
    } 
    
    if(!module.parent) { main(); } else { module.exports = main; }