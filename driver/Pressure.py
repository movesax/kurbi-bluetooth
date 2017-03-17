# uses the Pressure Application Adaptor
import emant
import time

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8")
print m.HwId()
m.ConfigAnalog(0.1,emant.Emant300.Bipolar,10)
volt, binval = m.ReadAnalog(emant.Emant300.AIN3,emant.Emant300.AIN4)
zero = volt

for i in range(1, 10):
    volt, binval = m.ReadAnalog(emant.Emant300.AIN3,emant.Emant300.AIN4)
    mmHg = 112500 * (volt-zero)
    print '%5.1f mmHg' % mmHg
    time.sleep(1)
m.Close()
