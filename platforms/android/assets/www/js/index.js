
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
                scope.BT_TEST.begin();
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
        var parent = document.getElementById('app');
        parent.innerHTML += '<li>'+x.toString()+'</li>';

    }




})(this);
