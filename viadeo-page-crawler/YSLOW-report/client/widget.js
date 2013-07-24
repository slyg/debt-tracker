// You can use 3rd-party libraries with your widget. For more information, 
// check out the Docs section titled 'Using 3rd-party JS libraries'.

// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  widget.append("<div id='message'>awaiting transmission ...</div>").hide().fadeIn('slow');
});
// This runs when the widget receives a transmission
this.on('transmission', function (data) {
    var message = widget.find('#message');
    var tbody = widget.find('tbody');
    tbody.empty();
    message.remove();
    tbody.empty();
    for (key in data) {
        var prop = data[key];
        if (prop.optional != undefined) {
                tbody.append("<tr><td><a href='" + prop.url + "' target='_blank'>" + prop.url.substring(0,20) + "</a></td><td>" + prop.req + "</td><td>" + prop.weight + " Ko</td><td class='note'><a href='#' class=" + getColor(prop.score) + " data-open='false'>" + prop.score + "</a></td></tr>" + getDetails(prop.report,prop.optional) + "");
        }
    }
    $('.war,.crit,.normal').off();
    $('.war,.crit,.normal').on('mousedown',
  	    function(e){
  	        if ($(this).attr('data-open')=="false") {
              $(this).parents('tr').nextUntil('tr:not(.details)').show('fast');
              $(this).attr('data-open','true');
  	        }
  	        else{
			  			$(this).parents('tr').nextUntil('tr:not(.details)').hide('fast');
              $(this).attr('data-open','false');
  	        }
      	    e.preventDefault();
        }
     );
});

function getColor(score){
    var classname = "normal";
    if (score < 75) classname = "war";
    else if(score<50) classname = "critical";
    return classname;
}

function getDetails(report,optional){
  console.log(optional);
    var tpl;
    for(rule in report){
      if(report[rule].score<100 && report[rule].message!=""){
      	if(report[rule].score<50){
              tpl+="<tr class='details'><td class='crit' colspan='4'>";
            }
        else{
               tpl+="<tr class='details'><td class='war' colspan='4'>";
            }
        tpl+=" - <b>"+report[rule].name+"</b><br />"+report[rule].message+"</td></tr>";
     }
    }
    
    for(rule in optional){
      if(optional[rule].score!=undefined && optional[rule].message!=""){
      	if(optional[rule].score<50){
              tpl+="<tr class='details'><td class='war' colspan='4'>";
            }
        else{
               tpl+="<tr class='details'><td class='' colspan='4'>";
            }
        tpl+="<b>"+optional[rule].name+"</b><br />"+optional[rule].message+"</td></tr>";
      }
    } 
      
    return tpl;
}
