'use strict';
// Require the packages needed
var DMX = require('dmx');
// create a new instance of DMX
var dmx = new DMX();

// Universe Setup
var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731'); // Mac
//var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/ttyUSB0'); // Debian

// Device Setup
dmx.devices = [{
  'type': 'RED',
  'address': 0
},{
  'type': 'GREEN',
  'address': 1
},{
  'type': 'BLUE',
  'address': 2
},{
  'type': 'RED',
  'address': 3
},{
  'type': 'GREEN',
  'address': 4
},{
  'type': 'BLUE',
  'address': 5
}];

// Change the number universe.update({ChannelNumber : Intensity(0-255)});
universe.update({11: 255});