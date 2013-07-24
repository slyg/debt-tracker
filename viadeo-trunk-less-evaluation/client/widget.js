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
      dom = widget.find('.container'),
      html = "",
      validClass = "",
      statusClass = ""
 	;
   
  for(var prop in data){
   
    validClass = (data[prop]["passed"] != true) ? "invalid" : "";
    
    html += "<span class=\"dot " + validClass + " \" id=\"" + prop + "\"></span>";
    
	}
  
  dom.empty().html(html);
  
});