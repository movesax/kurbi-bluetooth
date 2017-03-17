
(function(scope){
    
    if(!scope.BT_TEST) scope.BT_TEST = {};

    var AIN0 = 0;
    var AIN1 = 1;
    var AIN2 = 2;
    var AIN3 = 3;
    var AIN4 = 4;
    var AIN5 = 5;
    var COM = 8;
    var DIODE = 15;
    Unipolar = 1;
    Bipolar = 0;
    V2_5 = 1
    V1_25 = 0
    POC_Count = 0 
    POC_PWM = 1
    EOT_Timed = 0
    EOT_Event = 1
    

    var _HwId = ""
    var _CommOpen = false;
    var _DIO_Config = 8;
    var _DIO = 255;
    var _Polarity = Unipolar;
    var _Gain = 0;
    var _VRef = V2_5;
    var _ODAC = 0;
    var _ADCON0 = 0x30;
    var _ADCON1 = 0x41;
    var _Decimation = 0x07F1;
    var _ACLK = 0x10;
    var _sock = null;
    var _MSINT = 100;

    var _EventOrTimed = EOT_Timed
    var _PWMOrCnt = POC_PWM
    
    var _Counter = 0


    scope.BT_TEST.begin = function(){
        // scanForDevices();
        console.log(checksum('i'));
        console.log(checksumOK('Abacon snitzel'));
        console.log(configAnalog(0.1,0,10));
        //console.log(configAnalogAdvance());
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
        var res = string + ("00" + _cs.toString(16)).substr(-2).toUpperCase();
        return res;
    }

    function checksumOK(string){
        var output = '';
        var chksum = '';
        if(string[0] == 'A') {
            output = string.slice(1,string.length - 3);  
            chksum = string.slice(string.length-3,string.length-1);
            var _cs = 0;
     
            for(var i = 0; i < output.length; i++){
              var ch = output[i];
              _cs = (_cs + ord(ch)) % 256;
            }
            if(("00" + _cs.toString(16)).substr(-2).toUpperCase() == chksum)
              return {success: true, value: output}

            }
          return {success:false, value: 'err'}
         
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

    function configAnalog(InputLimit, Polarity, SampleFreq){
        if (_VRef == V2_5) reflimit = 2.5;
        else reflimit = 1.25;

        if (InputLimit > reflimit) InputLimit = reflimit;

        Gain = Math.floor(Math.log(reflimit / InputLimit)/Math.log(2))
        
        _ADCON0 = _ADCON0 & 0xF8;
        _ADCON0 = Math.floor(Gain | _ADCON0);
        _Gain = Gain;

        _ADCON1 = _ADCON1 & 0xBF;
        _ADCON1 = Math.floor(Polarity << 6) | _ADCON1;
        _Polarity = Polarity;

        var temp = (170/SampleFreq) - 1;
        if(temp < 0) temp = 1;


        _ACLK = Math.floor(temp)

        // # 345606.25 = 22118800 / 64
        _Decimation = Math.floor(345606.25/((_ACLK + 1) * SampleFreq))

        // # correct for Decimation bug

        if(_Decimation > 2047){
          _ACLK = _ACLK + 1;
          _Decimation = Math.floor(345606.25 / ((_ACLK + 1) * SampleFreq));
        }

        
        return configAnalogAdvance();
        
    }

    function configAnalogAdvance(){
        c = "03F" + ("00" + _ODAC.toString(16)).substr(-2).toUpperCase() + 
            ("00" + _ADCON0.toString(16)).substr(-2).toUpperCase()+ ("00" + _ADCON1.toString(16)).substr(-2).toUpperCase()+
            ("0000"+_Decimation.toString(16)).substr(-4).toUpperCase()+ ("00" + _ACLK.toString(16)).substr(-2).toUpperCase();
        console.log( "03F" + ("00" + _ODAC.toString(16)).substr(-2).toUpperCase())
        console.log(("00" + _ADCON0.toString(16)).substr(-2).toUpperCase())
        console.log(("00" + _ADCON1.toString(16)).substr(-2).toUpperCase())
        console.log(("0000"+_Decimation.toString(16)).substr(-4).toUpperCase())
        console.log(("00" + _ACLK.toString(16)).substr(-2).toUpperCase())

        // actSampFreq = 22118800/((self._ACLK + 1) * self._Decimation * 64)
        // return (self._writecmd(c),actSampFreq)
        return c;
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
