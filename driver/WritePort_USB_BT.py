# Combine EMANT380 Bluetooth DAQ and
# EMANT300 USB DAQ example

import emant
import time

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8",dev="380")

ms = emant.Emant300()
# Windows
ms.Open("COM5",dev="300")
# Ubuntu
# ms.Open("/dev/ttyUSB0",dev="300")

print m.HwId()
print ms.HwId()
count = 0
while count < 8:
    m.WriteDigitalPort(count)
    ms.WriteDigitalPort(7-count)
    count += 1
    time.sleep(1)
m.Close()
ms.Close()
