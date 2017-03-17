30 Sep 11

Python Driver for the 
1) EMANT380 Bluetooth DAQ for Android/Emulator, Windows and Ubuntu.
2) EMANT300 Bluetooth DAQ for Windows and Ubuntu.

The examples are written for the Light Application Adaptor which comes with the Bluetooth Starter Kit and USB DAQ Training Kit. If you do not have the Light Application Adaptor, you will only read the HwId.

Most of the examples are written for the Bluetooth Starter Kit. You will need to modify the code to run the USB DAQ Training Kit.

WritePort_USB.py USB example
WritePort_BT.py Bluetooth example
WritePort_USB_BT.py USB and Bluetooth modules running together

Requirements

EMANT380 Bluetooth DAQ
1) Windows XP, Vista, 7
  a) Python 2.6
  b) PyBluez-0.19-py2.6
2) Ubuntu 11.04
  a) Python 2.7
  b) PyBluez
3) Android Emulator
  a) Py4A Release 5
  b) Python & PyBluez as per Windows Platform

EMANT300 USB DAQ
1) Windows
  a) Python 2.6
  b) pyserial 2.5
2) Ubuntu 11.04
  a) Python 2.7 (Installed)
  b) pyserial 2.5 (Installed)

For Android
1) You must modify the bluetooth MAC address for your EMANT380 module before running the examples. 
2) The scripts should be stored in the SD Drive->sl4a->scripts folder
3) If you are new to Android Python programming, please familiarise yourself with the environment before attempting to run the following examples. This folder files are for Android Emulator Only.


For Windows
1) For EMANT300 install drivers and get serial port (use diagnostic.exe)
2) For EMANT380 pair module
3) Modify example as per mac address (EMANT380), serial com port (EMANT300)

For Ubuntu
1) For EMANT300 check driver installed correctly and get serial port
$ dmesg | grep tty
[    0.000000] console [tty0] enabled
[  849.395479] usb 2-1: FTDI USB Serial Device converter now attached to ttyUSB0
2) For EMANT380 pair module
3) Modify example as per mac address (EMANT380), serial com port /dev/ttyUSB0 (EMANT300)


