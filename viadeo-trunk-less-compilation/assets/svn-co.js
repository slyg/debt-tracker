// dependencies

var 
    Q           = require('q'),
    cwd         = process.cwd(),
    conf        = require('../conf'),
    cl          = require('./cl')
;

// conf data aggregation

var 
    workspacePath   = cwd + conf.workspace.path
;

// launch command line instruction then launch callback

module.exports = function(checkoutRepo, cb){

    // building instruction :
    // - remove existing workspace dir
    // - create workspace dir
    // - access workspace dir
    // - checkout svn 
    
    var deferred = Q.defer();
    
    var instructions = "\
        rm -rf " + workspacePath + " && \
        mkdir " + workspacePath + " && \
        cd " + workspacePath + " && \
        svn co svn://" + checkoutRepo
    ;

    console.log('Checking out svn repo...');

    cl(instructions, function(){
        console.log('Workspace ready...');
        deferred.resolve(cwd + conf.workspace.path);
    });
    
    return deferred.promise;

};



