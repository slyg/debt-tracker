(function(){

    function userHandlers(){

        $('li').click(function(){

          $(this).addClass('active').siblings().removeClass('active');
          updateCssScoreBarChart($(this).data('filter'));

        });

    }

    window.userHandlers = userHandlers;

}());

