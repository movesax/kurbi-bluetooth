
(function(scope){
    
    if(!scope.CHART_TEST) scope.CHART_TEST = {};

    scope.CHART_TEST.begin = function(){
        makeDummyChart(onPointClick);
        
    }

    function makeDummyChart(clickHandler){
        new Chartist.Line('.ct-chart', {
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

    function onPointClick(event){
        var data = this.getAttribute('ct:value').split(',');
        var index = parseFloat(data[0]);
        var value = parseFloat(data[1]);
        console.log(index + ", " +value);
        
    }

})(this);
