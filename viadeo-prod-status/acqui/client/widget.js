// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  console.log('loaded');  
});
// This runs when the widget receives a transmission
this.on('transmission', function(data){
  widget.find('.prodstatus')[0]
    .hide()
    .text(data.value)
    .removeClass()
    .addClass(data.value == 200 ? 'green' : 'red')
    .fadeIn();
  widget.find('.proddelay')[0]
    .hide()
    .text(data.delay + ' seconds latency')
    .removeClass()
    .fadeIn();
});