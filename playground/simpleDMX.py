import time
import pysimpledmx

# Connect via usb
mydmx = pysimpledmx.DMXConnection("/dev/ttyUSB0")

t_end = time.time() + 15
print "Turning on for 15 seconds"
while time.time() < t_end:

    # Channels are x+1, i.e. Channel 1 is 2.
    mydmx.setChannel(2, 255) # set DMX channel 1 to full
    mydmx.setChannel(3, 255) # set DMX channel 1 to full
    mydmx.setChannel(4, 255) # set DMX channel 1 to full
    mydmx.setChannel(8, 255) # set DMX channel 1 to full
    mydmx.setChannel(9, 255) # set DMX channel 1 to full
    mydmx.setChannel(10, 255) # set DMX channel 1 to full
    mydmx.render() #render

print "Now Turning Off"
mydmx.setChannel(2, 0) # set DMX channel 1 to full
mydmx.setChannel(3, 0) # set DMX channel 1 to full
mydmx.setChannel(4, 0) # set DMX channel 1 to full
mydmx.setChannel(8, 0) # set DMX channel 1 to full
mydmx.setChannel(9, 0) # set DMX channel 1 to full
mydmx.setChannel(10, 0) # set DMX channel 1 to full
mydmx.render()

print "All Done, bye"




