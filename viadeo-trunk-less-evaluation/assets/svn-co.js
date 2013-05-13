// dependencies

var 
    Q           = require('q'),
    cwd         = process.cwd(),
    conf        = require('./../conf.json'),
    cl          = require('./cl')
;

// launch command line instruction then launch callback

function checkout(checkoutRepo, workspacePath, cb){

    // building instruction :
    // - remove existing workspace dir
    // - create workspace dir
    // - access workspace dir
    // - checkout svn 
    
    //var deferred = Q.defer();
    
    var instructions = "\
        rm -rf " + workspacePath + " && \
        mkdir " + workspacePath + " && \
        cd " + workspacePath + " && \
        svn co svn://" + checkoutRepo
    ;

    console.log('Checking out svn repo...');

    cl(instructions, function(){
        console.log('Workspace ready...');
        cb();
        //deferred.resolve(cwd + conf.workspace.path);
    });
    
    //return deferred.promise;

};

module.exports = {
    viadeoJsp : function(){ 
    
        var deferred = Q.defer();
        
        console.log('start viadeoJsp');
    
        checkout(
            conf["viadeo-jsp"].svn.repo, 
            process.cwd() + conf["viadeo-jsp"].workspace.path,
            function(){ deferred.resolve(); }
        );
        
        return deferred.promise;
    },
    viadeoFf : function(){
    
        var deferred = Q.defer();
        
        console.log('start viadeoFf');
    
        checkout(
            conf["frontend-framework"].svn.repo, 
            process.cwd() + conf["frontend-framework"].workspace.path,
            function(){ deferred.resolve(); }
        );
        
        return deferred.promise;
         
    }
}



