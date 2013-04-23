var moment = require('moment');

module.exports = (function(name){

    var timers = {};
    
    return {
        register : function(name){
            timers[name] = {start : Date.now()};
            return this;
        },
        getDelay : function(name){
            return parseInt(Date.now() - timers[name].start);
        },
        getFormatedDelay : function(name){
            return moment.duration(this.getDelay(name)).asSeconds();
        }
    };
}());