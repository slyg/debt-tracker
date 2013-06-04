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
    generateDatas = require('./assets/generateDatas'),
    urlList = [],
    data = {}
;


function main(){
    var deferred = Q.defer();
     timeCounter.register('page crawler');
     request.get({ url: conf.dashku.url }, function (err, response) {

         crawlability(confJSON)
        .then(generateDatas)
        .then(function (datas) {
            data = datas;
            return Q.all([yslowH(datas.urlList), linkscraper(datas.urlList)])
        })
        .then(
            function (arr) {
                data.yslowLog = arr[0];
                return arr[1];
            }
        )
        .then(status)
        .then(
            function (result) {
                data.logLinks = result;
                console.log('OK ' + result);
                deferred.resolve(
                {
                    "url": data.url,
                    "rules": data.rules,
                    "note": data.note,
                    "yslowLog": data.yslowLog,
                    "logLinks": data.logLinks,
                    "value": response.statusCode,
                    "delay": timeCounter.getFormatedDelay('page crawler')
                });
            }

        , function () {
            console.log(deferred.reject);
        })
     });
    return deferred.promise;
    
}
    
if(!module.parent) { main(); } else { module.exports = main; }