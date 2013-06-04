var 
    Q = require('q'),
    data={
        urlList : []
    }
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


module.exports = function generateDatas(SEOreport) {

    var deferred = Q.defer();

    for (x in SEOreport) {
        data.url = x;
        data.rules = SEOreport[x];
        data.urlList.push(x);
    }

    data.note = getNotation(SEOreport[x]);

    deferred.resolve(data);

    return deferred.promise;

};

