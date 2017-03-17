# uses the Bridge Sensor Application Adaptor
# Bridge Completion Network & Pinch Meter Assembly
import emant
import time

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8")
print m.HwId()
m.ConfigAnalog(0.1,emant.Emant300.Bipolar,10)
# bridge output is connected to AIN3, AIN2
volt, binval = m.ReadAnalog(emant.Emant300.AIN3,emant.Emant300.AIN2)
zero = volt

for i in range(1, 10):
    volt, binval = m.ReadAnalog(emant.Emant300.AIN3,emant.Emant300.AIN2)
    ustrain = -1000000 * (volt-zero) / 1.66
    print '%5.0f ustrain' % ustrain
    time.sleep(1)
m.Close()
