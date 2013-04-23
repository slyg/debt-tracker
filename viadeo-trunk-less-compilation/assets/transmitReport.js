var 
    conf        = require(process.env.PWD + '/conf'),
    Q           = require('q'),
    request     = require('request'),
    Transmission = require(process.env.PWD + '/assets/Transmission'),
    ref         = "viadeo trunk less compilation", 
    deferred    = Q.defer()
;

module.exports = function(report){

    request.post(
        new Transmission().addBodyParams({
            "_id" : conf.dashku.widgets[ref].reference,
            "data": report
        }),
        function(err, res){
            if(res.statusCode == 200) {
                console.log("OK : " + ref);
                deferred.resolve();
            } else { console.warn("KO : " + ref + " Transmission failed"); deferred.resolve(); deferred.reject(err); }
        }
    );
    
    return deferred.promise;

}