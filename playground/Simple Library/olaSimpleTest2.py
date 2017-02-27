import array
from ola.ClientWrapper import ClientWrapper

def DmxSent(state):
    wrapper.Stop()


universe = 1

def upThenDown(n):  # Counts up to n then back down to zero, a generator
    while True:
        for i in xrange(1, n+1):
            yield i
        for i in xrange(n, 0, -1):
            yield i


while(True):
    for number in draft(255):
        print(number)
        # Data Channel, Intensity
        data = array.array('B', [1, 2, number])
        wrapper = ClientWrapper()
        client = wrapper.Client()
        client.SendDmx(universe, data, DmxSent)
        wrapper.Run()







        mydmx.setChannel(2, number)
        mydmx.setChannel(3, number)
        mydmx.setChannel(4, number)
        mydmx.render()
        time.sleep(0.1)
