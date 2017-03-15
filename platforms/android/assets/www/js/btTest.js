
(function(scope){
    
    if(!scope.BT_TEST) scope.BT_TEST = this;

    this.begin = function(){
        scanForDevices();
    }


    function scanForDevices(){
        log('Scanning for Bluetooth Devices');
        bluetoothSerial.list(
            function(list){
                log('success')
                list.forEach(function(x){
                    log(x.name + ", " + x.address);
                });
                log(list);
            }
            ,function(){
                log('error');
            })
    }

})(this);
