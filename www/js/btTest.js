
(function(scope){
    
    if(!scope.BT_TEST) scope.BT_TEST = {};

    scope.BT_TEST.begin = function(){
        // scanForDevices();
        console.log(checksum('i'));
        console.log(checksumOK('Abacon'));
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

    function checksum(string){
        var _cs = 0;
        for(var i = 0; i < string.length; i++){
            var ch = string[i];
            _cs = (_cs + ord(ch)) % 256;   
            }
        var res = string + _cs.toString(16);
        return res;
    }

    function checksumOK(string){
        var output = '';
        var chksum = '';
        if(string[0] == 'A') {
            output = string.slice(1,string.length - 2);  
            chksum = string.slice(string.length-2,string.length);
            }
        return chksum;      
    }


    function writeCommand(cmdString, success, fail){
        //cmdString
        //R = reset
        //i = initialize
        var command = '>' + checksum(cmdString);
        bluetoothSerial.write(command,function(){
            bluetoothSerial.read(function(buffer){
                if(buffer[0] == 'A') success();
                else fail();
            }, genFail);
        }, genFail);
        
    }


    
    function genFail(err){
        cosnole.log('error');
    }

    function ord (string) {
      //  discuss at: http://locutus.io/php/ord/
      // original by: Kevin van Zonneveld (http://kvz.io)
      // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
      // improved by: Brett Zamir (http://brett-zamir.me)
      //    input by: incidence
      //   example 1: ord('K')
      //   returns 1: 75
      //   example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
      //   returns 2: 65536
      var str = string + ''
      var code = str.charCodeAt(0)
      if (code >= 0xD800 && code <= 0xDBFF) {
        // High surrogate (could change last hex to 0xDB7F to treat
        // high private surrogates as single characters)
        var hi = code
        if (str.length === 1) {
          // This is just a high surrogate with no following low surrogate,
          // so we return its value;
          return code
          // we could also throw an error as it is not a complete character,
          // but someone may want to know
        }
        var low = str.charCodeAt(1)
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000
      }
      if (code >= 0xDC00 && code <= 0xDFFF) {
        // Low surrogate
        // This is just a low surrogate with no preceding high surrogate,
        // so we return its value;
        return code
        // we could also throw an error as it is not a complete character,
        // but someone may want to know
      }
      return code
}

})(this);
