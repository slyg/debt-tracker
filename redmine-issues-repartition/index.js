
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        _           = require('underscore'),
        redmine     = new (require(__dirname + './../lib/redmine'))(conf.redmine),
        Transmission = require(process.env.PWD + '/lib/Transmission'),
        ref         = "redmine issues repartition"
    ;
    
    function main(){
        
        redmine.getIssues({query_id: "640", limit : "50"}, function(err, data) {
        
            var
                repartition = {}
                names       = [],
                counts      = []
            ;
        
            if(err) throw new Error(err, "KO : " + ref);
            
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
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgets[ref].reference,
                    "names": names,
                    "values" : counts
                }),
                function(err, res){ 
                    if(res.statusCode == 200) {
                        console.log("OK : " + ref);
                    } else { console.warn("KO : " + ref + " Transmission failed"); }
                }
            );
            
            
        });
        
    } 
    
    if(!module.parent) { main(); } else { module.exports = main; }