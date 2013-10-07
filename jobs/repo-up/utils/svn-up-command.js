// dependencies

var cl = require('../../repo-co/utils/cl-childprocess');

// launch command line instruction then launch callback

module.exports = function checkout(repoPath, targetPath, cb){

    // building instruction :
    // - remove existing workspace dir
    // - create workspace dir
    // - access workspace dir
    // - checkout svn 
    
    var instructions = "\
        cd " + targetPath + " && \
        svn up"
    ;

    console.log('updating svn repo : ', repoPath );

    cl(instructions, function(){
        console.log('Workspace ready : ', targetPath );
        cb();
    });
    
};



