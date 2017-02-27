import pysimpledmx
import time

mydmx = pysimpledmx.DMXConnection("/dev/ttyUSB0")

while(True):
    count = 0  # start at 0
    operator
    mydmx.setChannel(2, count)
    mydmx.setChannel(3, count)
    mydmx.setChannel(4, count)
    count += 1
    mydmx.render()
    time.sleep(0.1)
    if()