// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  console.log('loaded');  
});
// This runs when the widget receives a transmission
this.on('transmission', function(data){
  var alertClass = (data.value > 10) ? 'red' : (data.value > 5) ? 'orange' : 'green';
  widget.find('#highprioissues')
    .hide()
    .text(data.value)
    .removeClass()
    .addClass(alertClass)
    .fadeIn();
});