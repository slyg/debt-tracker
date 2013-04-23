module.exports = function (command, cb){

    "use strict";

    var terminal = require('child_process').spawn('bash');
    
    terminal.on('exit', function(){ cb(); });
    
    terminal.stdin.write(command);
    terminal.stdin.end();

};