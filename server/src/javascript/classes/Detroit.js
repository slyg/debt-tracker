require('d3'); // d3 hack, d3 is a global when required :-/

function Detroit(){

    this.json = function(jsonPath, callbacksArray){

        d3.json(jsonPath, function(err, data){
            var len = callbacksArray.length;
            while(len--){ callbacksArray[len](err, data); }
        });

    };

}

module.exports = Detroit;