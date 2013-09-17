// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  head.js('//cdnjs.cloudflare.com/ajax/libs/d3/3.3.3/d3.min.js');
});
// This runs when the widget receives a transmission
this.on('transmission', render);

var 
    chart,
    scale,
    alreadyUsed = false
;

/* render function */

function render(transport){
  
  data = transport.data.sort(function(a, b){ return +a.score < +b.score; });
  
  if (alreadyUsed) { chart.remove(); }
  
  chart = d3.select("#bar-graph-holder").append('svg');
  
  scale = d3.scale.linear()
    .domain([0, d3.max(data, function(d){ return d.score; })])
    .range(["0", "100%"])
    ;
  
  /* Bars */
  
  chart.selectAll("rect").data(data)
    .enter()
    .append('rect')
    .attr('y', function(d, i) { return i * 20; })
    .attr('height', 20)
    .attr('width', function(d){return scale(d.score);})
    .text(function(d){ return d.label; })
    ;
  
  /* labels */
  
  chart.selectAll("text").data(data)
    .enter()
    .append("text")
    .attr("x", function(d){return scale(d.score);})
    .attr("y", function(d, i) { return (i * 20) + 8; })
    .attr("dx", -5) // padding-right
    .attr("dy", 6) // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    .text(function(d){ return d.label; })
    ;
  
  /* adding rules */
  
  chart.selectAll("line").data(scale.ticks(10))
    .enter()
    .append("line")
    //.attr("class", "rule")
    .attr("x1", scale)
    .attr("x2", scale)
    .attr("y1", 0)
    .attr("y2", data.length * 20)
    .style("stroke", "#ccc")
    ;
  
  /* adding rules labels */
  
  chart.selectAll(".rule").data(scale.ticks(10))
    .enter()
    .append("text")
    .attr("class", "rule")
    .attr("x", scale)
    .attr("y", data.length * 20)
    .attr("dy", 20)
    .attr("text-anchor", "middle")
    .text(String);
  
  alreadyUsed = true;
  
}