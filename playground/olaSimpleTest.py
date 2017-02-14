import array
from ola.ClientWrapper import ClientWrapper

def DmxSent(state):
  wrapper.Stop()

universe = 1

# Data Channel, Intensity
data = array.array('B', [1, 2, 255])
wrapper = ClientWrapper()
client = wrapper.Client()
client.SendDmx(universe, data, DmxSent)
wrapper.Run()

