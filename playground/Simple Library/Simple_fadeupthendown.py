import pysimpledmx
import time

mydmx = pysimpledmx.DMXConnection("/dev/ttyUSB0")

def draft(n):  # Counts up to n then back down, a generator
    while True:
        for i in xrange(1, n+1):
            yield i
        for i in xrange(n, 0, -1):
            yield i

while(True):
    for number in draft(255):
        print(number)
        mydmx.setChannel(2, number)
        mydmx.setChannel(3, number)
        mydmx.setChannel(4, number)
        mydmx.render()
        time.sleep(0.1)
