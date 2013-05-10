var 
    crawlability = require('crawlability'),
    confJSON = require('./conf.json'),
    conf = require(process.cwd() + '/conf'),
    request = require('request'),
    timeCounter = require(__dirname + './../lib/timeCounter'),
    Q = require('q'),
    yslowH = require('./assets/yslowHandler'),
    urlList = []
;



function getNotation(report){
    var result = 3;
    for (x in report) {
        if (x == "title" || x == "description" || x == "headings") {
            if (report[x].result == false) return 0;
        }
        if (x == "link-img-alt" || x == "img-alt" || x == "microformats") {
            if (report[x].result == false) return 1;
        }
    }
    return result;
}

    
function main(){
    var deferred = Q.defer();
    // Prod status
    timeCounter.register('page crawler');
    request.get({ url: conf.dashku.url }, function (err, response) {
        var data = {};
        if (err) deferred.reject(err);
        crawlability(confJSON).then(
            function (report) {
                for (x in report) {
                    data.url = x;
                    data.rules = report[x];
                    urlList.push(x);
                }

                data.note = getNotation(report[x]);
                 yslowH(urlList).then(
                    function (yslowLog) {
                        deferred.resolve({
                            "url": data.url,
                            "rules": data.rules,
                            "note": data.note,
                            "yslowLog":yslowLog,
                            "value": response.statusCode,
                            "delay": timeCounter.getFormatedDelay('page crawler')
                        });
                        console.log(yslowLog);
                        console.log(report);
                    },
                    function (err) {
                        console.log('ERROR YSLOW');
                    }
                  );
            },
            function (err) {
                console.log('ERROR CRAWLABILITY');
            }
        );

       


    });
        
    return deferred.promise;
         
}
    
if(!module.parent) { main(); } else { module.exports = main; }