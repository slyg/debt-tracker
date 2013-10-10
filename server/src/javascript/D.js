function D(){

    this.json = function(jsonPath, callbacksArray){

        d3.json(jsonPath, function(err, data){
            var len = callbacksArray.length;
            while(len--){ callbacksArray[len](err, data); }
        });

    };

}