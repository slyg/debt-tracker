var 
    crawlability = require('crawlability'),
    confJSON = require('./conf.json'),
    conf = require(process.cwd() + '/conf'),
    request = require('request'),
    timeCounter = require(__dirname + './../lib/timeCounter'),
    Q = require('q'),
    yslowH = require('./assets/yslowHandler'),
    linkscraper = require('./assets/linkscraper'),
    status = require('./assets/urlStatus'),
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
        console.log('WAITING FOR CRAWLING SEO RULES...');
        crawlability(confJSON).then(
            function (report) {
                for (x in report) {
                    data.url = x;
                    data.rules = report[x];
                    urlList.push(x);
                }

                data.note = getNotation(report[x]);
                console.log('WAITING FOR YSLOW REPORT...');
                yslowH(urlList).then(
                    function (yslowLog) {

                        console.log(yslowLog);
                        console.log(report);

                        data.logLinks = [];
                        console.log('WAITING FOR URL SCAN...');
                        linkscraper(urlList).then(
                            function (links) {
                                status(links).then(
                                       function (statusList) {
                                           data.logLinks = statusList;
                                           console.log(data.logLinks);
                                           deferred.resolve({
                                               "url": data.url,
                                               "rules": data.rules,
                                               "note": data.note,
                                               "yslowLog": yslowLog,
                                               "logLinks": data.logLinks,
                                               "value": response.statusCode,
                                               "delay": timeCounter.getFormatedDelay('page crawler')
                                           });
                                       }
                                    ),
                                    function (err) {
                                        console.log('ERROR STATUS');
                                    }
                            },
                            function (err) {
                                console.log('ERROR SCRAPER');
                            }
                        );
                        console.log(urlList);
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