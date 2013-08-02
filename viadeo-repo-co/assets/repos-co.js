// returns an array of promises launching checkouts 
// in current working directory
// of given references using conf to get path

var 
    Q           = require('q'),
    cwd         = process.cwd(),
    conf        = require('./../../conf/repos.json'), // that is a common conf
    checkout    = require('./svn-co-command')
;

module.exports = function(references){
    
    return references.map(repoCheckout);
    
}

function repoCheckout(ref){ //viadeo-jsp / frontend-framework
    
    var deferred = Q.defer();
    
    console.log(ref, ': started checkout');

    checkout(
        conf[ref].svn.repo, 
        process.cwd() + conf[ref].workspace.path,
        function(){ 
            console.log(ref, ': checkout finished'); 
            deferred.resolve(); 
        }
    );
    
    return deferred.promise;
}