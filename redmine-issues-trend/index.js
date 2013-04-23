
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        redmine     = new (require(__dirname + './../lib/redmine'))(conf.redmine),
        Transmission = require(process.env.PWD + '/lib/Transmission'),
        ref         = "redmine issues trend",
        trendValStack  = []
    ;
    
    function main(){
        
        redmine.getIssues({query_id: "640", limit : "1"}, function(err, data) {
        
            if(err) throw new Error(err, "KO : " + ref);
            
            trendValStack.push(data['total_count']);
            
            if(trendValStack.length > 15) trendValStack = trendValStack.shift();
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgets[ref].reference,
                    "values": trendValStack
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