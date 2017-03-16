
(function(scope){
    
    if(!scope.CHART_TEST) scope.CHART_TEST = {};
    var chart = null;
    scope.CHART_TEST.begin = function(){
        var targetDiv = '.ct-chart'
        makeDummyChart(targetDiv, onPointClick);
        
    }

    function makeDummyChart(targetDiv, clickHandler){
        chart = new Chartist.Line(targetDiv, {
              series: [[
                {x: 1, y: 100},
                {x: 2, y: 50},
                {x: 3, y: 25},
                {x: 5, y: 12.5},
                {x: 8, y: 6.25}
              ]]
            }, {
              axisX: {
                type: Chartist.AutoScaleAxis,
                onlyInteger: true
              }
            });

        if(clickHandler) 
            setTimeout(function(){
            var points = document.getElementsByClassName('ct-point')
            for(var i = 0; i < points.length; i++)
                    points[i].addEventListener('click', clickHandler);
                
            }, 300);
        

        }

    function onPointClick(mouseEvent){
        var object = this;
        var dataString = this.getAttribute('ct:value').split(',');
        var index = parseFloat(dataString[0]);
        var value = parseFloat(dataString[1]);
        log(index + ", " +value);


        // demonstrates how to add data to the chart
        // var data = chart.data;
        // data.series[0].push({x: 9, y:5.5})
        // chart.update();
        
    }

})(this);
