// You can use 3rd-party libraries with your widget. For more information, 
// check out the Docs section titled 'Using 3rd-party JS libraries'.

// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  widget.append("<div id='message'>awaiting transmission ...</div>").hide().fadeIn('slow');
});
// This runs when the widget receives a transmission
this.on('transmission', function(data){
    var message = widget.find('#message');
    var url = widget.find('#url');
    var note = widget.find('#note');
    var yslowReport = widget.find('#yslowReport');
    var alerts = widget.find('#alerts').empty();
    var warnings = widget.find('#warnings').empty();
    var links = widget.find('#links').empty();
    var status = widget.find('#status').empty();
  
    yslowReport.find('.error,.warning').empty();
  
    for(var key in data.yslowLog){
  	    var rule = widget.find('#'+key);
    
        if(data.yslowLog[key]!=null){
          rule.text(data.yslowLog[key]);
        }
    
        if(key=="report" || key=="optional" ){
          for(var rule in data.yslowLog[key]){
            if(data.yslowLog[key][rule].score<100){
        	    if(key=="report")yslowReport.append("<li class='error'>"+data.yslowLog[key][rule].message+"</li>");
              else yslowReport.append("<li class='warning'>"+data.yslowLog[key][rule].message+"</li>");
            }
          }
        } 
    }
    for(var key in data.logLinks){
        links.append("<li>"+data.logLinks[key].url+"</li>");
        status.append("<li>"+data.logLinks[key].status+"</li>");
   		//console.log(data.logLinks[key]);
    }
  
      for(var key in data.rules){
        var str = key.replace(':','-');
        var rule = widget.find('#'+str);
   	    if(data.rules[key]!=null){
          rule.text(data.rules[key].result);
    					    if(data.rules[key].result==false||data.rules[key].result=="void")rule.addClass('error');
    
        if(data.rules[key].details.length!=0){
    		    for(x in data.rules[key].details)
    		    {
              if(data.rules[key].required)alerts.append("<li>"+data.rules[key].details[x]+"</li>");
              else warnings.append("<li>"+data.rules[key].details[x]+"</li>");
       		    //console.log(data.rules[key].details[x]);
            }
    	    }
        }
      }
 
  message.text(data.message).hide().fadeIn();
  switch(data.note){
  	case 0:note.addClass("error").text("CRITICAL");
    break;
    case 1:note.addClass("warning").text("WARNING");
    break;
    case 3:note.addClass("success").text("GOOD");
    break; 
  }
  url.text(data.url);
});