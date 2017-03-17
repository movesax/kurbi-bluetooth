import emant
import math

A = 0.001129148
B = 0.000234125
C = 0.0000000876741

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8")
print m.HwId()
m.WriteAnalog(0.1)
volt, binval = m.ReadAnalog(emant.Emant300.AIN3,emant.Emant300.AIN2)
R = volt / 0.0001
temp = 1 /  ( A + B * math.log(R) + C * pow(math.log(R), 3) )
temp = temp - 273
print R
print temp
m.Close()
