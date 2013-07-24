// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){

  head.js('/javascripts/peity.min.js')
  head.ready(function(){
    
  widget.options = {
     width: widget.width()*0.8,
     height: widget.height()*0.4,
     colour: "cyan",
     strokeColour: "white",
     strokeWidth: 0
   };

    widget.find(".line").peity("line", widget.options);
  });

});
// This runs when the widget receives a transmission
this.on('transmission', function(data){
  widget.find(".line").text(data.values.toString(",")).change();
});
