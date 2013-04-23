    
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(__dirname + './../lib/timeCounter'),
        Transmission = require(process.env.PWD + '/assets/Transmission'),
        ref         = "viadeo main prod status"
    ;
    
    function main(){
    
        // Prod status
        timeCounter.register('prod status');
        request.get({url : conf.viadeo.url.main.prod}, function(error, response){
            
            if(error) throw new Error(err, "KO : viadeo main prod status");
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgets[ref].reference,
                    "value": response.statusCode,
                    "delay": timeCounter.getFormatedDelay('prod status')
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