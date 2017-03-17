import emant
import time

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8",True)
print m.HwId()
# configure to PWM
r = m.ConfigPWMCounter(emant.Emant300.POC_PWM)
print r
# period in us (5000 us or 200Hz), duty cycle % (50%)
print m.WritePWM(5000,50)
m.Close()
