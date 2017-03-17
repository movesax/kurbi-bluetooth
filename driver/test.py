
import math

AIN0, AIN1, AIN2, AIN3, AIN4, AIN5, COM, DIODE = (0,1,2,3,4,5,8,15)
Unipolar, Bipolar = (1,0)
V2_5, V1_25 = (1,0)
POC_Count, POC_PWM = (0,1)
EOT_Timed, EOT_Event = (0,1)
    


    

_HwId = ""
_CommOpen = False
_DIO_Config = 8
_DIO = 255
_Polarity = Unipolar
_Gain = 0
_VRef = V2_5
_ODAC = 0
_ADCON0 = 0x30
_ADCON1 = 0x41
_Decimation = 0x07F1
_ACLK = 0x10
_sock = None
_MSINT = 100

_EventOrTimed = EOT_Timed
_PWMOrCnt = POC_PWM

_Counter = 0

# def Reset(self):
#     if (self._writecmd('R')):
#         time.sleep(0.5)
#         return True
#     else:
#         return False

# def _TransactCommand(self, sendstring):
#     if (self._device=='380'):
#         self._sock.send(sendstring)
#         return self._bt_receive_data()
#     if (self._device=='300'):
#         self._serial.write(sendstring)
#         return self._serial_receive_data()

# def _serial_receive_data(self):
#     buffer = ""
#     while 1:
#         data = self._serial.read(1)
#         buffer = buffer + data
#         if data == '\r':
#             return buffer

# def _bt_receive_data(self):
#     buffer = ""
#     while 1:
#          data = self._sock.recv(1)
#          buffer = buffer + data
#          if data == '\r':
#              return buffer

# def _DeadTimeComp(self, RawValue):
#     temp = 65535 + 11 - int(RawValue)
#     if temp < 0:
#         return 0
#     elif temp > 65535:
#         return 65535
#     else:
#         return temp

# def _writecmd(self, str_input):
#     c = '>' + self._checksum(str_input)
#     r = self._TransactCommand(c)
#     if r[0:1] == 'A':
#         return True
#     else:
#         return False

def _checksum(str_input):
    _cs = 0
    for i in xrange(len(str_input)):
       ch=str_input[i]
       _cs = (_cs + ord(ch)) % 256
    res = str_input + ("%02x" % _cs).upper()
    return res

def _checksum_OK(str_input):
    str_input = str_input[0:len(str_input)-1]
    str_output = ''
    if str_input[0:1] == 'A':
        str_output = str_input[1:len(str_input)-2]
        chksum = str_input[len(str_input)-2:len(str_input)]
        _cs = 0
        print str_output
        for i in xrange(len(str_output)):
            ch=str_output[i]
            _cs = (_cs + ord(ch)) % 256
        if ("%02x" % _cs).upper() == chksum:
            return (True,str_output)
    return (False,"Err")


def ConfigAnalog(InputLimit, Polarity, SampleFreq):
	global _ADCON0, _ADCON1, _Polarity, _ACLK, _Decimation

	if (_VRef == V2_5):
		reflimit = 2.5
	else:
		reflimit = 1.25

	if (InputLimit > reflimit):
		InputLimit = reflimit
	Gain = int(math.log(reflimit / InputLimit)/math.log(2))
    
	_ADCON0 = _ADCON0 & 0xF8
	_ADCON0 = int(Gain | _ADCON0)
	_Gain = Gain

	_ADCON1 = _ADCON1 & 0xBF
	_ADCON1 = int(Polarity << 6) | _ADCON1
	_Polarity = Polarity

	temp = (170/SampleFreq) - 1
	if (temp < 1):
		temp = 1

	_ACLK = int(temp)

    # 345606.25 = 22118800 / 64
	_Decimation = int(345606.25/((_ACLK + 1) * SampleFreq))

    # correct for Decimation bug

	if (_Decimation > 2047):
		_ACLK = _ACLK + 1
		_Decimation = int(345606.25 / ((_ACLK + 1) * SampleFreq))

    # end of add
	return ConfigAnalogAdvance()


def ConfigAnalogAdvance():
	c = ("03F" + ("%02x" % _ODAC).upper() + ("%02x" % _ADCON0).upper()+ ("%02x" % _ADCON1).upper() + ("%04x" % _Decimation).upper()+ ("%02x" % _ACLK).upper())
	print "03F" + ("%02x" % _ODAC).upper()
	print ("%02x" % _ADCON0).upper()
	print ("%02x" % _ADCON1).upper()
	print ("%04x" % _Decimation).upper()
	print ("%02x" % _ACLK).upper()

	return c
    # actSampFreq = 22118800/((_ACLK + 1) * _Decimation * 64)
    # return (_writecmd(c),actSampFreq)

print ConfigAnalog(.1,0,10)
