function BarChart(containerId, data, map, filter){

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


