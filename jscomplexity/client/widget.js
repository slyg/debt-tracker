// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){

  head.js('//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
  head.js('//cdnjs.cloudflare.com/ajax/libs/graphael/0.5.0/g.raphael-min.js');
  head.js('//cdnjs.cloudflare.com/ajax/libs/graphael/0.5.0/g.dot-min.js');
  
});

this.on('transmission', function(res){
  
    widget.find("#graph-holder").empty();
  
    var 
        data        = res.data,
            
        difficulty  = data.difficulty,
        complexity  = data.complexity,
        lineNum     = data.lineNum,
        ref         = data.reference,
                  
        posx        = 0,
        posy        = -10,
        width       = 800,
        height      = 300,
        opt         = {
            symbol  : "o",
            max     : 10,
            heat    : true,
            axis    : "0 0 1 1"
        }
    ;
  
    console.log(lineNum, complexity, difficulty, ref)
  
    new Graph({
      holder : "graph-holder",
      xs : lineNum,
      ys : complexity,
      heat : difficulty
    });
  
    function Graph(){
      var options = arguments[0];             
      var
          r = Raphael(options.holder),
          index = ref.length - 1,
          xs = options.xs,
          ys = options.ys,
          heat = options.heat   
      ;
      
      r
        .dotchart(posx, posy, width, height, xs, ys, heat, opt)
        .attr([{}, {fill : "#fff"}])
        .hover(function(){
          var markerLabel = this.label;
          this.marker = 
            this.marker || 
            r
            .tag(this.x, this.y, markerLabel, 0, this.r + 2)
            .insertBefore(this);
          this.marker.show();
        }, function(){
          this.marker && this.marker.hide();
        }).each(function(){
          this.index = index--;
          this.label = this.value;
        }).click(function(){
          widget.find("#path").val(ref[this.index]);
        })
        ;
      return r;
    }

});