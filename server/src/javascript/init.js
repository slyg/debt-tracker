var Detroit = require("Detroit");
var ScatterPlotChart = require("ScatterPlotChart");
var BarChart = require("BarChart");

var detroit = new Detroit();

detroit.json("reports/css-score.json", [
    cssScoreScatterPlotChart,
    cssScoreBarChart
]);

detroit.json("reports/js-complexity.json", [
    jsComplexityScatterPlotChart,
    jsComplexityBarChart
]);

//userHandlers();

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
