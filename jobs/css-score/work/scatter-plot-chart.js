function scatterPlotChart(error, data){

	var containerId = "#scatter-plot-chart-holder";

	var dataset = _.filter(data, function(item){ 
		return (item.score != undefined);
	});

    dataset = _.map(dataset, function(item){ 
    	return [
	    	+item.cssLength, 			// x
	    	+item.avgScore, 			// y
	    	+item.score,				// z
	    	item.label
	    ]; 
	});

    var xScale = d3.scale.linear()
    	.domain([0, d3.max(dataset, function(d){ return d[0]; })])
    	.range(["0", "90%"])
    ;

    var yScale = d3.scale.linear()
    	.domain([0, d3.max(dataset, function(d){ return d[1]; })])
    	.range(["100%", "10%"])
    ;

    var zScale = d3.scale.linear()
    	.domain([0, d3.max(dataset, function(d){ return d[2]; })])
    	.range(["2px", "30px"])
    ;

    function draw(){

    	var chart = d3.select(containerId)
            .append("svg")
	            .attr("width", "100%")
	            .attr("height", "100%")
	        .append("g").attr("transform", "translate(0,0)")
        ;

        var colorScale = d3.scale.linear()
	      .domain([0, d3.max(dataset, function(d){ return +d[2]; }) ])
	      .range(["#829b13", "#d54243"])
	    ;

   		/* plots */

        chart.selectAll("circle").data(dataset)
			.enter()
				.append("circle")
				.attr("cx", function(d) { return xScale(d[0]); })
	   			.attr("cy", function(d) { return yScale(d[1]); })
	   			.attr("r", function(d) { return zScale(d[2]); })
	   			.style("fill", function(d){ return colorScale(d[2]); })
	   			.on("mouseover", function(d, i){
	   				tooltip
	   					.style("visibility", "visible")
		   				.text(function() { return d[3]; })
		   				.attr("x", xScale(d[0]))
		   				.attr("y", yScale(d[1]))
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
   	}

   	draw();

}