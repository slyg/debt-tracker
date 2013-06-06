var 
    crawlability = require('crawlability'),
    confJSON = require('../conf.json'),
    status = require('../assets/urlStatus'),
    Q = require('q')
;


function main(){

    var deferred = Q.defer();
    console.log('Wait for report...');
    crawlability(confJSON)
    .then(status)
    .then(function (datas) {
         deferred.resolve(datas);
    });

    return deferred.promise;
    
}
    
if(!module.parent) { main(); } else { module.exports = main; }