// You can use 3rd-party libraries with your widget. For more information, 
// check out the Docs section titled 'Using 3rd-party JS libraries'.

// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget receives a transmission
this.on('transmission', function(res){
  
  widget.parent().removeClass('red-pulse');
  widget.find(".message").hide().fadeIn('slow').text((new Date()).toLocaleTimeString());
  
    if(typeof res.data[0] === 'undefined') {
      widget.find('.ok').removeClass('ko').text('OK');
      widget.find('.errors').empty();
    } else {
      widget.parent().addClass('red-pulse');
      widget.find('.ok').addClass('ko').text('KO');
      widget.append(
        "<ul class='errors'>"
        + res.data.map(function(i){ return "<li>"+i+"</li>" }).join("")
        + "</div>"
      ).hide().fadeIn('slow');
  }
});