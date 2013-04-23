    
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(__dirname + './../lib/timeCounter'),
        Transmission = require(process.env.PWD + '/assets/Transmission'),
        ref         = "viadeo acqui prod status"
    ;
    
    function main(){
        
        // Acqui status
        timeCounter.register('acqui status');
        request.get({url : conf.viadeo.url.acqui.prod}, function(error, response){
        
            if(error) throw new Error(err, "KO : viadeo-acqui-prod-status");
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgets[ref].reference,
                    "value": response.statusCode,
                    "delay": timeCounter.getFormatedDelay('acqui status')
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