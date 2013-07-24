var widget = this.widget;

this.on('load', function(){
  
  widget.on("click", ".dot", function(){
    var ref = this.id;
    widget.find('#csspath').val(ref);
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
  
  while(len--){
    
    validClass = (data[len]["valid"] != true) ? "invalid" : "";
    statusClass = (data[len]["found"] != true) ? "unreached" : "";
    
    html += "<span class=\"dot " + validClass + " " + statusClass + " \" id=\"" + data[len]["reference"] + "\"></span>";
    
  }
  
  dom.empty().html(html);
  
  
});