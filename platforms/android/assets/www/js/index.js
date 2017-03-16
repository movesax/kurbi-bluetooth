
(function(scope){

    scope.device = {};
    document.addEventListener('DOMContentLoaded', function(){ 
        init();
    }, false);

    var init = function(){
            var onDeviceReady = function(){
                loadPage('cordova');
            };

            var loadPage = function(type){
                log('ready');
                scope.device.type = type;
                if(type == 'cordova') scope.BT_TEST.begin();
                scope.CHART_TEST.begin();
            };

            this.bindEvents = function(){
                document.addEventListener('deviceready',onDeviceReady,false);
            };

            if(window.cordova !== undefined){
                log('cordova detected, waiting for device to be ready');
                this.bindEvents();
            } else {
                log('no cordova present');
                loadPage('browser');
            }
    }



    log = function(x){
        console.log(x);
        var parent = document.getElementById('notes');
        parent.innerHTML += '<li>'+x.toString()+'</li>';

    }




})(this);
