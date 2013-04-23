var lint = require("csslint").CSSLint;

module.exports = function(cssString){

    var 
        report = lint.verify(cssString, {
            'box-model': 1,
            'display-property-grouping': 1,
            'duplicate-properties' : 1,
            'empty-rules' : 1,
            'known-properties' : 1
        }),
        messages = report.messages;
        len = messages.length;
        hasError = false
    ;
    
    if(len > 0) {
        
        while(len--){
            
            if(messages[len].type == "error"){
                hasError = true;
                break;
            }
            
        }
        
    }
    
    return hasError;

}