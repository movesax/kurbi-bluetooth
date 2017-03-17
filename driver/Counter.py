import emant
import time

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8",True)
print m.HwId()
# configure to Count
r = m.ConfigPWMCounter(emant.Emant300.POC_Count, emant.Emant300.EOT_Event, 100, 0)
print r

for i in range(5):
    count, period = m.ReadCounter()
    print count
    time.sleep(1)
m.Close()
