'use strict';
// Require the packages needed
const DMX = require('dmx');
const devices = require('./devices.js').devices;
// create a new instance of DMX
const dmx = new DMX();

// Universe Setup
const universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731'); // Mac
//var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/ttyUSB0'); // Debian

// Connect the devices to the instance of node dmx
dmx.devices = devices;

//The blackout function
const blackout = new Promise((resolve) => {
  for (var i=0, len=512; i < len; i++) {
    universe.update({i: 0});
    // if(i === 255 ){
    resolve('All Done');
    // }
  }
});

export const allOff = () => {
  blackout.then((successMessage) => {
    console.log('Turning all channels to 0 intensity');
    process.on('exit', () => {
      console.log(`${successMessage}, About to exit, All channels set to 0 Intensity`);
      process.exit();
    });
  }).catch((err) => {
    console.log('Error: ', err);
  });
};

allOff(); // Turns all channels to zero.