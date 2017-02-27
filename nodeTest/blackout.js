'use strict';
// Require the packages needed
var DMX = require('dmx');
var devices = require('./devices.js').devices;
// create a new instance of DMX
var dmx = new DMX();

// Universe Setup
var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731'); // Mac
//var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/ttyUSB0'); // Debian

// Connect the devices to the instance of node dmx
dmx.devices = devices;

//The blackout function
var blackout = function() {
  for (var i=0, len=dmx.devices.length; i < len; i++) {
    universe.update({i: 0});
  }
  console.log('Turning all channels to 0 intensity');
};

blackout();

module.exports = blackout;
