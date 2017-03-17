import emant
import time

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8")
print m.HwId()
count = 0
while count < 3:
    m.WriteDigitalBit(count, False)
    count += 1
    time.sleep(1)
m.Close()
