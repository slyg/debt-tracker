function ScatterPlotChart(containerId, data, map, filter){

    /* Prepare dataset */

    var dataset = data;
    var mapper = {};

    // if a filter is defined use it
    if(typeof filter === "function") dataset = _.filter(dataset, filter);

    // maps x, y, z, label to the desired properties
    dataset = _.map(dataset, function(item){ 
        var mapper = {};
        for (var prop in map){ 
            mapper[prop] = (typeof map[prop] === "function") ? map[prop](item) : item[map[prop]];
        }
        return mapper;
    });

    // computing scales

    var xScale = d3.scale.linear(2)
        .domain([
            d3.min(dataset, function(d){ return +d.x; }), 
            d3.max(dataset, function(d){ return +d.x; })
        ])
        .range(["5%", "95%"])
    ;

    var yScale = d3.scale.linear()
        .domain([
            d3.min(dataset, function(d){ return +d.y; }), 
            d3.max(dataset, function(d){ return +d.y; })
        ])
        .range(["95%", "5%"])
    ;

    var zScale = d3.scale.linear()
        .domain([
            d3.min(dataset, function(d){ return +d.z; }), 
            d3.max(dataset, function(d){ return +d.z; })
        ])
        .range(["2px", "10px"])
    ;

    var colorScale = d3.scale.quantize()
        .domain([
            d3.min(dataset, function(d){ return +d.x; }),
            d3.max(dataset, function(d){ return +d.x; }) 
        ])
      .range(['#006aa8', '#d54243'])
    ;

    function render (){

        var chart = d3.select(containerId)
            .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
            .append("g").attr("transform", "translate(0,0)")
        ;

        /* plots */

        chart.selectAll("circle").data(dataset)
            .enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", function(d) { return zScale(d.z); })
                .style("fill", function(d){ return colorScale(d.z); })
                .on("mouseover", function(d, i){
                    tooltip
                        .style("visibility", "visible")
                        .text(function() { return d.l; })
                        .attr("x", xScale(d.x))
                        .attr("y", yScale(d.y))
                        .attr("dx", 0)
                        .attr("dy", -12)
                        .attr("text-anchor", "middle")
                    ;
                })
                .on("mouseout", function(d, i){
                    tooltip.style("visibility", "hidden");
                })
        ;

        /* tooltip */

        var tooltip = chart.append("text")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
        ;

        /* vertical rules */
    
        chart.selectAll("line").data(xScale.ticks(5))
          .enter()
            .append("line")
            .attr("class", "line")
            .attr("x1", xScale)
            .attr("x2", xScale)
            .attr("y1", 0)
            .attr("y2", dataset.length * 20)
        ;

        /* rules labels */

        chart.selectAll(".rule").data(xScale.ticks(5))
          .enter()
            .append("text")
            .attr("class", "rule")
            .attr("x", xScale)
            .attr("y", "100%")
            .attr("dy", -5)
            .attr("text-anchor", "middle")
            .text(String)
        ;

        /* x-axis label */

        chart
            .append("text")
            .attr("class", "axisLabel")
            .attr("x", 0)
            .attr("dx", 10)
            .attr("y", "100%")
            .attr("dy", -5)
            .attr("text-anchor", "start")
            .text(map.x)
        ;

        /* y-axis label */
        
        chart
            .append("text")
            .attr("class", "axisLabel")
            .attr("x", 0)
            .attr("dx", 5)
            .attr("y", "100%")
            .attr("dy", -10)
            .attr("text-anchor", "end")
            .style({
                "writing-mode": "tb",
                "glyph-orientation-vertical" : 90
            })
            .text(map.y)
        ;

    }

    // exports

    this.render = render;

}