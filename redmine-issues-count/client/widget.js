// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  console.log('loaded');  
});
// This runs when the widget receives a transmission
this.on('transmission', function(data){
  var alertClass = (data.value > 40) ? 'red' : (data.value > 20) ? 'orange' : 'green';
  widget.find('#bigNumber')
    .hide()
    .text(data.value)
    .removeClass()
    .addClass(alertClass)
    .fadeIn();
});