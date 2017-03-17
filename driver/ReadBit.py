import emant

m = emant.Emant300()
m.Open("00:06:66:00:A1:D8")
print m.HwId()
print m.ReadDigitalBit(3)
m.Close()
