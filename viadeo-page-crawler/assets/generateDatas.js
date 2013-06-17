var 
    Q = require('q'),
    objList =[]
;

module.exports = function generateDatas(SEOreport) {

    var deferred = Q.defer();
    for (x in SEOreport) {
        var data = {
            "url": x,
            "rules": SEOreport[x]
        }
        for (var key in data.rules) {
            if (key == "title" || key == "description" || key == "headings") {
                if (data.rules[key].result == false){
                   data.note = "CRITICAL";
                   break;  
                }
            }
            if (key == "link-img-alt" || key == "img-alt" || key == "microformats") {
                if (data.rules[key].result == false){
                   data.note = "WARNING"; 
                   break; 
                }
            }
            else data.note = "OK";
        }
        objList.push(data);
    }

    deferred.resolve(objList);

    return deferred.promise;

};

