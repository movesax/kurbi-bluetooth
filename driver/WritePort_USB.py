# EMANT300 USB DAQ example

import emant
import time

m = emant.Emant300()
# Windows
m.Open("COM5",dev="300")
# Ubuntu
# m.Open("/dev/ttyUSB0",dev="300")
print m.HwId()
count = 0
while count < 8:
    m.WriteDigitalPort(count)
    count += 1
    time.sleep(1)
m.Close()
