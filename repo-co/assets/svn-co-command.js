// dependencies

var cl = require('./cl-childprocess');

// launch command line instruction then launch callback

module.exports = function checkout(repoPath, targetPath, cb){

    // building instruction :
    // - remove existing workspace dir
    // - create workspace dir
    // - access workspace dir
    // - checkout svn 
    
    var instructions = "\
        rm -rf " + targetPath + " && \
        mkdir " + targetPath + " && \
        cd " + targetPath + " && \
        svn co svn://" + repoPath
    ;

    console.log('Checking out svn repo : ', repoPath );

    cl(instructions, function(){
        console.log('Workspace ready : ', targetPath );
        cb();
    });
    
};



