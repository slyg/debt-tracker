var 
    async = require('async'),
    phantom = require('phantom'),
    Q = require('q'),
    request = require('request'),
    links = []
;


module.exports = function linkscraper(url) {

    var deferred = Q.defer();

    async.each(url, function (target, next) {

        phantom.create('--load-images=no', function (ph) {

            ph.createPage(function (page) {

                page.open(url, function (status) {

                    if (status !== 'success') {
                        ph.exit(); next();
                        
                    } else {
                        page.evaluate((function () {
                            var links = document.getElementsByTagName("a"), linklist = [];
                            for(var i=0, len=links.length; i<len; ++i){
                                linklist.push(links[i].href);
                            }
                            return linklist;
                        }), function (result) {
                           
                            for (var key in result) {
                                //console.log('RESULT = ' + result[key]);
                                if (result[key]!=null && result[key] != undefined) {
                                    links.push(result[key]);
                                }
                            }
                            next();
                            return ph.exit();
                        });
                    }

                });

            });

        });

    }, function (err) {
        if (err) { deferred.reject(err); } else { deferred.resolve(links); }
    });

    return deferred.promise;

};