// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  head.js('//cdnjs.cloudflare.com/ajax/libs/d3/3.3.3/d3.min.js');
  head.js('//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js');
});
// This runs when the widget receives a transmission
this.on('transmission', render);

var 
    chart = null,
    scale
;

/* render function */

function render(transport){
  
  var data = _.filter(transport.data, function(pkg){ return pkg.score; });
  data = _.sortBy(data, function(pkg){ return -(+pkg.score); });
  
  if (chart !== null) { chart.remove(); }
  
  chart = d3.select("#bar-graph-holder").append('svg')
    .append("g").attr("transform", "translate(5,0)");
  
  scale = d3.scale.linear()
    .domain([0, d3.max(data, function(d){ return d.score; })])
    .range(["0", "100%"])
  ;
  
  /* Bars */
  
  chart.selectAll("rect").data(data)
    .enter()
    .append('rect')
    .attr('y', function(d, i) { return i * 21; })
    .attr('height', 20)
    .attr('width', function(d){return scale(d.score);})
    .text(function(d){ return d.label; })
    ;
  
  /* labels */
  
  chart.selectAll("text").data(data)
    .enter()
    .append("text")
    .attr("x", 10)
    .attr("y", function(d, i) { return (i * 21) + 8; })
    .attr("dx", -5) 
    .attr("dy", 6) 
    .attr("text-anchor", "start")
    .text(function(d){ return d.label; })
  ;
  
  /* adding rules */
  
  chart.selectAll("line").data(scale.ticks(10))
    .enter()
    .append("line")
    .attr("class", "line")
    .attr("x1", scale)
    .attr("x2", scale)
    .attr("y1", 0)
    .attr("y2", data.length * 21)
  ;
  
  /* adding rules labels */
  
  chart.selectAll(".rule").data(scale.ticks(10))
    .enter()
    .append("text")
    .attr("class", "rule")
    .attr("x", scale)
    .attr("y", data.length * 21)
    .attr("dy", 20)
    .attr("text-anchor", "middle")
    .text(String)
  ;
  
}