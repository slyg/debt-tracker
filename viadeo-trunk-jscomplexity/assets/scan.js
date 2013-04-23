// dependancies

var 
    cwd         = process.cwd(),
    conf        = require('../conf'),
    cl          = require('./cl'),
    jscr        = require('jscomplexity')
;

// conf data aggregation

var 
    workspacePath   = cwd + conf.workspace.path
;

// launch command line instruction then launch scan on it

module.exports = function(checkoutRepo, cb){

    // building instruction :
    // - remove existing workspace dir
    // - create workspace dir
    // - access workspace dir
    // - checkout svn 
    
    var instructions = "\
        rm -rf " + workspacePath + " && \
        mkdir " + workspacePath + " && \
        cd " + workspacePath + " && \
        svn co svn://" + checkoutRepo
    ;

    console.log('Updating trunk...');

    cl(instructions, function(){
    
        console.log('Workspace ready, launching scan...');
        
        jscr(cwd + conf.workspace.path, cb);
        
    });

};



