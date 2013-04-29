// This module handles phantomjs process

var 
    async           = require('async'),
    phantom         = require('phantom'),
    Q               = require('q'),
    YSLOW           = require('yslow').YSLOW,
    doc = require('jsdom').jsdom(),
    yslowLog        ={}
;



module.exports = function yslowHandler(url, conf) { // conf ignored for now
    var deferred = Q.defer();

    async.each(url, function (url, next) {
        phantom.create('--load-images=no', function (ph) {
            ph.createPage(function (page) {
                page.address = url;
                page.resources = [];
               
                page.set('onLoadStarted', function (){
                    page.startTime = new Date();
                });

               page.set('onResourceRequested', function (req) { 
                    page.resources[req.id] = {
                        request: req,
                        startReply: null,
                        endReply: null
                    };
                });
                
                page.set('onResourceReceived', function (res) { 
                     if (res.stage === 'start') {
                        page.resources[res.id].startReply = res;
                    }
                    if (res.stage === 'end') {
                        page.resources[res.id].endReply = res;
                    }
                });


                  
                page.open(url, function (status,context) {
                    var har;

                    if (status !== 'success') {
                        ph.exit(); next();

                    } else {
                         page.title = page.evaluate(function () {
                            return document.title;
                        });
                        console.log(page.startTime)
                        har = createHAR(page.address, page.title, page.startTime, page.resources);
                        //console.log(JSON.stringify(har, undefined, 4));
                        parseHAR(har, status, runYSlow);
                        next();
                    }

                });

            });

        });

    }, function(err){
        if (err) { deferred.reject(err); } else { deferred.resolve(yslowLog); }
    });

    return deferred.promise;

};

function createHAR(address, title, startTime, resources)
{
    var entries = [];

    resources.forEach(function (resource) {
        var request = resource.request,
            startReply = resource.startReply,
            endReply = resource.endReply;

        if (!request || !startReply || !endReply) {
            return;
        }

        entries.push({
            startedDateTime: request.time.toString(),
            time: endReply.time - request.time,
            request: {
                method: request.method,
                url: request.url,
                httpVersion: "HTTP/1.1",
                cookies: [],
                headers: request.headers,
                queryString: [],
                headersSize: -1,
                bodySize: -1
            },
            response: {
                status: endReply.status,
                statusText: endReply.statusText,
                httpVersion: "HTTP/1.1",
                cookies: [],
                headers: endReply.headers,
                redirectURL: "",
                headersSize: -1,
                bodySize: startReply.bodySize,
                content: {
                    size: startReply.bodySize,
                    mimeType: endReply.contentType
                }
            },
            cache: {},
            timings: {
                blocked: 0,
                dns: -1,
                connect: -1,
                send: 0,
                wait: startReply.time - request.time,
                receive: endReply.time - startReply.time,
                ssl: -1
            }
        });
    });

    return {
        log: {
            version: '1.2',
            creator: {
                name: "PhantomJS"
               
            },
            pages: [{
                startedDateTime: startTime.toString(),
                id: address,
                title: title,
                pageTimings: {}
            }],
            entries: entries
        }
    };
}

if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () {
        function pad(n) { return n < 10 ? '0' + n : n; }
        function ms(n) { return n < 10 ? '00'+ n : n < 100 ? '0' + n : n }
        return this.getFullYear() + '-' +
            pad(this.getMonth() + 1) + '-' +
            pad(this.getDate()) + 'T' +
            pad(this.getHours()) + ':' +
            pad(this.getMinutes()) + ':' +
            pad(this.getSeconds()) + '.' +
            ms(this.getMilliseconds()) + 'Z';
    }
}

function runYSlow (har, context) {
        var results;

        if (!har) {
            return;
        }

        try {
            // YSlow analysis
            results = YSLOW.harImporter.run(doc, har, context.ruleset);
            results = YSLOW.util.getResults(results.context, context.info);

            // dictionary
            if (context.dict && context.format !== 'plain') {
                results.dictionary = YSLOW.util.getDict(context.info,
                    context.ruleset);
            }

            console.log(results);

        } catch (err) {
            console.log('THERE IS A YSLOW ERROR: '+err)
            return;
        }

}

function parseHAR(har, context, callback) {
        try {
            //console.log(har.log.entries);
            har = JSON.parse(JSON.stringify(har, undefined, 4));
            
            process.nextTick(function () {
                callback(har, context);
            });
        } catch (parseError) {
            console.log('THERE IS A PARSE ERROR: '+parseError)
        }
};
