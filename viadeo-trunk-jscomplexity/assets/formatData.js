var 
	path = require('path'),
	conf = require('../conf');

module.exports = function(data){

    var 
        formatted = {
            difficulty  : [],
            complexity  : [],
            lineNum     : [],
            reference   : [],
            maintainability : []
        },
        len = data.length
    ;
    
    while(len--){
        formatted.reference.push(path.relative(process.cwd() + conf.workspace.path, data[len].escapedPath));
        formatted.lineNum.push(data[len].lineNumber);
        formatted.complexity.push(data[len].complexity);
        formatted.difficulty.push(data[len].halstead.difficulty);
        formatted.maintainability.push(data[len].maintainability);
    }

    return formatted;
    
}
