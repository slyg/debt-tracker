// returns an array of promises launching checkouts 
// in current working directory
// of given references using conf to get path

var 
    Q           = require('q'),
    cwd         = process.cwd(),
    conf        = require('./../../../conf/repos.conf.json'), // that is a common conf
    update      = require('./svn-up-command')
;

module.exports = function(references){
    
    return references.map(repoUpdate);
    
}

function repoUpdate(ref){
    
    var deferred = Q.defer();
    
    console.log(ref, ': started update');

    update(
        conf[ref].svn.repo, 
        process.cwd() + conf[ref].workspace.path,
        function(){ 
            console.log(ref, ': update finished'); 
            deferred.resolve(); 
        }
    );
    
    return deferred.promise;
}