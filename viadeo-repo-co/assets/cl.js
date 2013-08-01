module.exports = function (command, cb){

    "use strict";

    var terminal = require('child_process').spawn('bash');
    
    terminal.on('exit', cb);
    terminal.on('error', console.log);
    
    terminal.stdin.write(command);
    
    terminal.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    
    terminal.stdin.end();

};