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
var blackout = new Promise(function (resolve, reject) {
  for (var i = 0, len = 512; i < len; i++) {
    universe.update({ i: 0 });
    if (i === 255) {
      resolve('All Done');
    }
  }
});

blackout.then(function (successMessage) {
  console.log('Turning all channels to 0 intensity');
  process.on('exit', function () {
    console.log(successMessage + ', About to exit, All channels set to 0 Intensity');
    process.exit();
  });
}).catch(function (err) {
  console.log('Error: ', err);
});

// module.exports = blackout;