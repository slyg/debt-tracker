var 
    Q = require('q'),
    parseXml = require('./parseXml.js'),
    path = require('path'),
    conf = require('./../conf')
;

module.exports = function(){

    var deferred = Q.defer();
    
    var wroPath = path.join(
        process.cwd(),
        conf['viadeo-jsp'].workspace.path, 
        conf['viadeo-jsp'].wro.path
    );
    
    parseXml(wroPath).then(deferred.resolve, deferred.reject);
    
    return deferred.promise;
    
}