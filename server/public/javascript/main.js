function D(){

    this.json = function(jsonPath, callbacksArray){

        d3.json(jsonPath, function(err, data){
            var len = callbacksArray.length;
            while(len--){ callbacksArray[len](err, data); }
        });

    };

};function ScatterPlotChart(containerId, data, map, filter){

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

};function BarChart(containerId, data, map, filter){

  var dataset = data;
  var mapper = {};
  var chart = null;
  var store, numScaler, colorScaler;
  var tickNum = 5;

  // if a filter is defined use it
  if(typeof filter === "function") dataset = _.filter(dataset, filter);

  // maps x, label to the desired properties
  dataset = _.map(dataset, function(item){ 
      var mapper = {};
      for (var prop in map){ 
          mapper[prop] = (typeof map[prop] === "function") ? map[prop](item) : item[map[prop]];
      }
      return mapper;
  });
  
  store = new Store(dataset);
  numScaler = new NumScaler(dataset);
  colorScaler = new ColorScaler(dataset);

  /* render function */

  function render(param){

    var data = store.orderBy(param).getAll();

    d3.select(containerId).style('height', function(){ return (data.length + 1) * 21 + "px"; });
    
    chart = d3.select(containerId).append('svg')
      .append("g").attr("transform", "translate(5,20)");
    
    /* Computing scale */

    var numScale = numScaler.calc(param);

    /* Computing colors */

    var colorScale = colorScaler.calc(param);
    
    /* Bars */
    
    chart.selectAll("rect").data(data)
      .enter()
        .append('rect')
        .attr('y', function(d, i) { return i * 21; })
        .attr('height', 20)
        .attr('width', function(d){return numScale(d[param]);})
        .attr('fill', function(d, i){ return colorScale(i); })
    ;
    
    /* labels */
    
    chart.selectAll(".label").data(data)
      .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", 10)
        .attr("y", function(d, i) { return (i * 21) + 8; })
        .attr("dx", -5) 
        .attr("dy", 6) 
        .attr("text-anchor", "start")
        .text(function(d){ return d.l; })
    ;
    
    /* adding rules */
    
    chart.selectAll("line").data(numScale.ticks(tickNum))
      .enter()
        .append("line")
        .attr("class", "line")
        .attr("x1", numScale)
        .attr("x2", numScale)
        .attr("y1", 0)
        .attr("y2", data.length * 21)
    ;
    
    /* adding rules labels */
    
    chart.selectAll(".rule").data(numScale.ticks(tickNum))
      .enter()
        .append("text")
        .attr("class", "rule")
        .attr("x", numScale)
        .attr("y", 0)
        .attr("dy", -5)
        .attr("text-anchor", "middle")
        .text(String)
    ;
    
  }

  function update(param){

    var data = store.getAll();

    /* recomputing scale */

    var numScale = numScaler.calc(param);

    /* updating bars */

    chart.selectAll("rect").data(data)
      .transition()
        .attr('width', function(d){return numScale(d[param]);})
    ;

    chart.selectAll(".line").remove();
    chart.selectAll(".rule").remove();

    /* adding rules */
    
    chart.selectAll("line").data(numScale.ticks(tickNum))
      .enter()
        .append("line")
        .attr("class", "line")
        .attr("x1", numScale)
        .attr("x2", numScale)
        .attr("y1", 0)
        .attr("y2", data.length * 21)
    ;
    
    /* adding rules labels */
    
    chart.selectAll(".rule").data(numScale.ticks(tickNum))
      .enter()
        .append("text")
        .attr("class", "rule")
        .attr("x", numScale)
        .attr("y", 0)
        .attr("dy", -5)
        .attr("text-anchor", "middle")
        .text(String)
    ;

  }

  function Store(data){

    this._data = data;

    this.add = function(data){
      this._data = data;
      return this;
    };

    this.orderBy = function(param){
      this._data = _.filter(this._data, function(pkg){ return +pkg[param]; });
      this._data = _.sortBy(this._data, function(pkg){ return -(+pkg[param]); });
      return this;
    };

    this.update = this.add;

    this.getAll = function(){ return this._data; };

  }

  function NumScaler(data){

    this._data = data;

    this.calc = function(param){
      return d3.scale.linear()
        .domain([0, d3.max(this._data, function(d){ return +d[param]; })])
        .range(["0", "100%"])
      ;
    };

  }

  function ColorScaler(data){

    this.len = data.length;
    this.colorLow = '#7dcde3'; 
    this.colorHigh = '#006aa8';

    this.calc = function(){
      return d3.scale.linear()
      .domain([0, this.len])
      .range([this.colorHigh, this.colorLow]);
    };

  }

  // exports

  this.render = render;
  this.update = update;

}


;(function(){

    function userHandlers(){

        $('li').click(function(){

          $(this).addClass('active').siblings().removeClass('active');
          updateCssScoreBarChart($(this).data('filter'));

        });

    }

    window.userHandlers = userHandlers;

}());

;(function(){

    var detroit = new D();

    detroit.json("reports/css-score.json", [
        cssScoreScatterPlotChart,
        cssScoreBarChart
    ]);

    detroit.json("reports/js-complexity.json", [
        jsComplexityScatterPlotChart,
        jsComplexityBarChart
    ]);

    userHandlers();

    function cssScoreScatterPlotChart(error, data){

        var chart = new ScatterPlotChart(
            "#css-score-scatter-plot-chart",
            data,
            {
                x : 'cssLength',
                y : 'avgScore',
                z : 'score',
                l : 'label'
            },
            function(item){ return (item.score !== undefined);  }
        );

        chart.render();

    }

    function cssScoreBarChart(error, data){

        var chart = new BarChart(
            "#css-score-bar-chart",
            data,
            {
                s   : 'score',
                avg : 'avgScore',
                w   : 'cssLength', 
                sc  : 'selectorsCount',
                l   : 'label'
            },
            function(item){ return (item.score !== undefined);  }
        );

        chart.render('avg');

        // expose update method
        window.updateCssScoreBarChart = chart.update;

    }

    function jsComplexityScatterPlotChart(error, data){

        var chart = new ScatterPlotChart(
            "#js-complexity-scatter-plot-chart",
            data,
            {
                x : 'lineNumber',
                y : 'complexity',
                z : function(d){ return d.halstead.length; },
                l : 'relPath'
            }
        );

        chart.render();

    }

    function jsComplexityBarChart(error, data){

        var chart = new BarChart(
            "#js-complexity-bar-chart",
            data,
            {
                l : 'relPath',
                c : 'complexity',
                ln : 'lineNumber',
                d : function(d){ return d.halstead.difficulty; }
            }
        );

        chart.render('d');

    }

}());

