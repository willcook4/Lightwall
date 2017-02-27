#!/usr/bin/python

import time
import pysimpledmx

# Connect via usb
mydmx = pysimpledmx.DMXConnection("/dev/ttyUSB0")

# Notes:
# Channels are x+1, i.e. Channel 1 is 2.

count = 0
while (True):
        time.sleep(0.25)  # delays for 1/4 second
        mydmx.setChannel(2, count)  # set DMX channel 1
        mydmx.setChannel(3, count)  # set DMX channel 2
        mydmx.setChannel(4, count)  # set DMX channel 2
        mydmx.render()  # render the universe
        count += 1
        if(count >= 255):
            count = 0
        print "Count: %s" % (count)

print "All Done, bye"
