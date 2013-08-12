var casper  = require('casper').create();
var conf    = require('./conf');

casper.start(conf.loginPageUrl, function(){
    
    this.fill(conf.loginFormCSSSelector, { 
        Email : conf.email,
        Passwd : conf.password
    }, true);
    
});

casper.thenOpen(conf.statsPageUrl, function(){
    this.wait(4000, function(){
        this.echo(this.evaluate(function(){
            return parseFloat(document.querySelectorAll(".CNC:nth-child(2) .DNC")[1].innerText, 10);
        }));
    });
});

casper.then(function(){ this.exit(); });

casper.run();