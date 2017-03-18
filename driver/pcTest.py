import emant
import time

m = emant.Emant300();
print('about to open')
m.Open("00:06:66:0A:32:9D")
print('done opening')

for i in range(1, 10):
	volt, binval = m.ReadAnalog(emant.Emant300.AIN0,emant.Emant300.AIN1)
	print volt
	time.sleep(1)

m.Close()

