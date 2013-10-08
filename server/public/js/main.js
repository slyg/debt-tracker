(function(){

	var detroit = new D;

	detroit.json("public/reports/css-score.json", [barChart, scatterPlotChart, uiHandlers]);

	function uiHandlers(){

		$('li').click(function(){

		  $(this).addClass('active').siblings().removeClass('active');
		  updateBarGraph($(this).data('filter'));

		});

	}

	function D(){

		this.json = function(jsonPath, callbacksArray){

			d3.json(jsonPath, function(err, data){
				var len = callbacksArray.length;
				while(len--){ callbacksArray[len](err, data); }
			});

		}

	}

}())

