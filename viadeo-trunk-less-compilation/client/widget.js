var widget = this.widget;

this.on('load', function(){
  
  widget.on("click", ".dot", function(){
    var ref = this.id;
    widget.find('#packagename').val(ref);
  });

});

this.on('transmission', function(res){
  
  var 
      data = res.data,
      len = data.length,
      dom = widget.find('.errors'),
      html = "",
      validClass = "",
      statusClass = ""
  ;
  
  widget.parent().removeClass('red-pulse');
  widget.find(".message").hide().fadeIn('slow').text((new Date()).toLocaleTimeString());
  widget.find(".status").text("OK").removeClass("ko");
  dom.empty().hide();
  
  for(var prop in data){
    
      if(data[prop]["passed"] != true) {
        
        widget.parent().addClass('red-pulse');
        widget.find(".status").text("KO").addClass("ko");
        
        html += "<li id='" + prop + "'>" + prop + "</li>";
        
      }
     
  }
  
  dom.html(html).fadeIn('slow');
  
});