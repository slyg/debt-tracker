var require = patchRequire(require);
var casper = require('casper').create();
var conf = require('./conf.json');

// evaluated in browser env, returns average usage
var getData = function(){
    return parseFloat(document.querySelectorAll(".CNC:nth-child(2) .DNC")[1].innerText, 10);
}

// start by login in with google account
casper.start(conf.loginPageUrl, function(){
    this.fill('form#gaia_loginform', {
        "Email" : conf.email,
        "Passwd" : conf.password
    }, true);
});

// weird but necessary... going twice to report page
casper.thenOpen(conf.statsPageUrl);
casper.thenOpen(conf.statsPageUrl);

// getting back data
casper.then(function(){
    this.wait(4000, function() { this.echo(this.evaluate(getData)); });
});

// closing phantomjs
casper.then(function(){
    this.exit();
});

casper.run();