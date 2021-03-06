#!/usr/bin/python
from random import uniform
import time
import pysimpledmx

# Connect via usb
mydmx = pysimpledmx.DMXConnection("/dev/ttyUSB0")

# Notes:
# Channels are x+1, i.e. Channel 1 is 2.

loopCount = 0


def fadeUp():
    print "fading up"
    count = 0
    randomNumber = uniform(0, 1)
    while (count < 300):
        time.sleep(randomNumber)  # delays for 1/4 second
        mydmx.setChannel(2, count)  # set DMX channel 1 to full
        mydmx.setChannel(3, count)  # set DMX channel 1 to full
        mydmx.setChannel(4, count)  # set DMX channel 1 to full
        # mydmx.setChannel(8, count) # set DMX channel 1 to full
        # mydmx.setChannel(9, count) # set DMX channel 1 to full
        # mydmx.setChannel(10, count) # set DMX channel 1 to full
        mydmx.render()  # render the universe
        count += 10


def fadeDown():
    print "fadingDown"
    count = 0
    randomNumber = uniform(0, 9)
    while (count > 0):
        time.sleep(randomNumber)  # delays for 1/4 second
        mydmx.setChannel(2, count)  # set DMX channel 1 to full
        mydmx.setChannel(3, count)  # set DMX channel 1 to full
        mydmx.setChannel(4, count)  # set DMX channel 1 to full
        # mydmx.setChannel(8, count) # set DMX channel 1 to full
        # mydmx.setChannel(9, count) # set DMX channel 1 to full
        # mydmx.setChannel(10, count) # set DMX channel 1 to full
        mydmx.render()  # render the universe
        count -= 5


while (loopCount < 100):
    randomLength = uniform(1, 30)
    fadeUp()
    time.sleep(randomLength)
    fadeDown()
    print loopCount
    loopCount += 1


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
