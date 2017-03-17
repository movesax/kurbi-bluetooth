import emant

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8")
print m.HwId()
volt, binval = m.ReadAnalog(emant.Emant300.AIN0,emant.Emant300.COM)
lux = 1333 * volt
print lux
m.Close()
