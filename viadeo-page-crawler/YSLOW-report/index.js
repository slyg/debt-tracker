var 
    confJSON = require('../conf.json'),
    Q = require('q'),
    yslowH = require('../assets/yslowHandler'),
    urlList =[]
;

function main(){
    var deferred = Q.defer();
    for(prop in confJSON.targets){
        urlList.push(confJSON.targets[prop].url);
    }
    yslowH(urlList)
    .then(function (result) {
        deferred.resolve(result);
    });

    return deferred.promise;
}
    
if(!module.parent) { main(); } else { module.exports = main; }