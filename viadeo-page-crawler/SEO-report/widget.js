// You can use 3rd-party libraries with your widget. For more information, 
// check out the Docs section titled 'Using 3rd-party JS libraries'.

// The widget's html as a jQuery object
var widget = this.widget;
// This runs when the widget is loaded
this.on('load', function(data){
  widget.append("<div id='message'>awaiting transmission</div>").hide().fadeIn('slow');
});
// This runs when the widget receives a transmission
this.on('transmission', function(data){
  var message = widget.find('#message');
  var tbody = widget.find('tbody');
  tbody.empty();
  message.remove();
  tbody.empty();
  console.log(data);
  message.text(data.message).hide().fadeIn();
  for(key in data){
  	if(data[key].note!=undefined){
    	tbody.append("<tr><td><a href='"+data[key].url+"' target='_blank'>"+data[key].url.substring(0,20)+"</a></td><td class='note'><a href='#' class="+data[key].note.toLowerCase()+" data-open='false'>"+data[key].note+"</a></td></tr>"+getDetails(data[key].rules)+"");
    }
  }
    $('.warning,.critical').off();
    $('.warning,.critical').on('mousedown',
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

function getDetails(rules){
    var tpl;
    for(rule in rules){
      if(rules[rule]!=null && rules[rule].details!=undefined && rules[rule].details[0]!=undefined){
          if(rules[rule].required){
            tpl+="<tr class='details'><td class='critical' colspan='2'>";
          }
          else{
          	 tpl+="<tr class='details'><td colspan='2'>";
          }
          tpl+=" - "+rules[rule].details[0]+"</td></tr>";
        }
		}
    return tpl;
}