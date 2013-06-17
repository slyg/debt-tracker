var 
    crawlability = require('crawlability'),
    confJSON = require('../conf.json'),
    Q = require('q'),
    generateDatas = require('../assets/generateDatas')
;


function main(){

    var deferred = Q.defer();

    crawlability(confJSON)
        .then(generateDatas)
        .then(function (datas) {
            deferred.resolve(datas);
        });

    return deferred.promise;
    
}
    
if(!module.parent) { main(); } else { module.exports = main; }