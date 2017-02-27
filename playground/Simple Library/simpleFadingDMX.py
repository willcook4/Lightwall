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
        print count


# def turnOff():
#     print "Now Turning Off"
#     mydmx.setChannel(2, 0) # set DMX channel 1 to full
#     mydmx.setChannel(3, 0) # set DMX channel 1 to full
#     mydmx.setChannel(4, 0) # set DMX channel 1 to full
#     mydmx.setChannel(8, 0) # set DMX channel 1 to full
#     mydmx.setChannel(9, 0) # set DMX channel 1 to full
#     mydmx.setChannel(10, 0) # set DMX channel 1 to full
#     mydmx.render()
#     return
#
# def turnOn():
#     print "Now Turning On"
#     mydmx.setChannel(2, 255) # set DMX channel 1 to full
#     mydmx.setChannel(3, 255) # set DMX channel 1 to full
#     mydmx.setChannel(4, 255) # set DMX channel 1 to full
#     mydmx.setChannel(8, 255) # set DMX channel 1 to full
#     mydmx.setChannel(9, 255) # set DMX channel 1 to full
#     mydmx.setChannel(10, 255) # set DMX channel 1 to full
#     mydmx.render()
#     return
#
#
# print "Running Program"
#
# turnOn() # turns on
# time.sleep( 30 ) # delays for 30 seconds
# turnOff() # turns off

print "All Done, bye"
