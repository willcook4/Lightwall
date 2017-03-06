'use strict';
//// Require the packages needed
const DMX = require('dmx');
//// create a new instance of DMX
const dmx = new DMX();

//// Universe Setup
const universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731'); // Mac
//var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/ttyUSB0'); // Debian

//// Single Device Setup
// dmx.devices = [{
//   'type': 'RED',
//   'address': 0
// }];

// Setup for all 512 channels in the universe.
dmx.devices = [];
for(var i=0; i < 512; i++){
  dmx.devices.push({'type': 'LED', 'address': i});
}

//// Change the number universe.update({ChannelNumber : Intensity(0-255)});
// E.G. Channel 11 to full intensity: `universe.update({11: 255});`
universe.update({11: 255});