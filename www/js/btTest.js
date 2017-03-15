
(function(scope){
    
    if(!scope.BT_TEST) scope.BT_TEST = {};

    scope.BT_TEST.begin = function(){
        scanForDevices();
    }


    function scanForDevices(){
        log('Scanning for Bluetooth Devices');
        bluetoothSerial.list(
            function(list){
                log('success')
                log('devices found:');
                list.forEach(function(x){
                    log(x.name + ", " + x.address);
                });
            }
            ,function(){
                log('error');
            })
    }

})(this);
