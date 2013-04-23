 
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(process.env.PWD + '/assets/timeCounter'),
        Transmission = require(process.env.PWD + '/assets/Transmission'),
        ref         = "viadeo trunk jscomplexity"
    ;
    
    function main(){
    
        var 
            svnconf = require('./conf'),
            scansvn = require('./assets/scan'),
            formatData = require('./assets/formatData'),
            repo = svnconf.svn.repo
        ;
        
        scansvn(repo, function(err, report){
            
            var data = formatData(report);
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgets[ref].reference,
                    "data": data
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