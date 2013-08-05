var widget = this.widget;

this.on('load', function(){
	widget.parent().removeClass('red-pulse');
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
  
  while(len--){ console.log(data[len]['reference']);
    
    validClass = (data[len]["valid"] != true) ? "invalid" : "";
    statusClass = (data[len]["found"] != true) ? "unreached" : "";
    
    if(data[len]["valid"] === false || data[len]["found"] === false) { console.log('coucou')
    	widget.parent().addClass('red-pulse');
      widget.find(".status").text("KO").addClass("ko");
      html += "<li class=\"" + validClass + " " + statusClass + " \">" + data[len]["reference"] + "</li>";
    }
    
  }
 
  dom.html(html).fadeIn('slow');
  
  
});