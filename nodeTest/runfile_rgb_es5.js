'use strict';
//External modules/packages
var DMX = require('dmx');
//Custom modules/packages
var devices = require('./devices').devices;

// const sequenceSetup = require('./sequenceSetup');

var A = DMX.Animation;
var dmx = new DMX();

// Universe Setup
var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731'); // Mac
//var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/ttyUSB0'); // Debian


///!!!!!!!!!!!!!!!!!!!!!!!!! Move this to an external file!!!!!!!!!!
// Lights in the universe
dmx.devices = devices;
console.log(dmx.devices);
// dmx.devices = [{
//   'type': 'RED',
//   'address': 0
// }, {
//   'type': 'GREEN',
//   'address': 1
// }, {
//   'type': 'BLUE',
//   'address': 2
// }, {
//   'type': 'RED',
//   'address': 3
// },{
//   'type': 'GREEN',
//   'address': 4
// },{
//   'type': 'BLUE',
//   'address': 5
// },{
//   'type': 'RED',
//   'address': 6
// },{
//   'type': 'GREEN',
//   'address': 7
// },{
//   'type': 'BLUE',
//   'address': 8
// },{
//   'type': 'RED',
//   'address': 9
// },{
//   'type': 'GREEN',
//   'address': 10
// },{
//   'type': 'BLUE',
//   'address': 11
// },{
//   'type': 'RED',
//   'address': 12
// },{
//   'type': 'GREEN',
//   'address': 13
// },{
//   'type': 'BLUE',
//   'address': 14
// },,{
//   'type': 'RED',
//   'address': 15
// },{
//   'type': 'GREEN',
//   'address': 16
// },{
//   'type': 'BLUE',
//   'address': 17
// }
// ];

var loopCount = 0;

// Callback, called when sequence finishes
var done = function done() {
  if(loopCount/10 === 0) {
    console.log('Sequence Complete: ', loopCount);
  }
  loopCount++;
};

// Animation sequence
// const firstArray = new A()
//   .add({0: 255, 1: 255, 2: 255, 3: 255, 4: 255}, 2000)
//   // .add({0: 255, 1: 255, 2: 255, 3: 255, 4: 255})
//   .delay(1000)
//   .add({0: 0, 1: 0, 2: 0, 3: 0, 4: 0}, 2000);
// .add({0: 255, 1: 255, 2: 255, 3: 255, 4: 255})
// .delay(1000)
// .add({0: 0, 1: 0, 2: 0, 3: 0, 4: 0})
// .add({0: 255, 1: 255, 2: 255, 3: 255, 4: 255})
// .delay(1000)
// .add({0: 0, 1: 0, 2: 0, 3: 0, 4: 0});

// //Testing animation array
// firstArray.run(universe, done);

var getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomChannel = getRandomIntInclusive(0, dmx.devices.length);
// console.log('Channel: ', randomChannel);

var randomIntensity = function() {
  var intensity = getRandomIntInclusive(0, 255);
  return intensity;
};

var randomDuration = function() {
  var duration = getRandomIntInclusive(0, sequenceDuration);
  return duration;
};

var storageArray = new A();
var sequenceDuration = 5000; // Milliseconds

/////// 1st Test ////////////////

function fade_up_then_down() {
  var max = 255;
  var min = 0;
  storageArray
    .add({ 0: max, 1: parseInt(max/2), 2: max }, sequenceDuration / 3)
    .delay(sequenceDuration / 3)
    .add({ 0: min, 1: min, 2: min }, sequenceDuration / 3)
  //Run the sequence
  .run(universe);
}

///////// 2nd Test //////
// Create an empty storageArray
var storageArray2 = new A;

function randomIntensityChanges() {
  var arrayObject = {}; // Empty object to store the light settings
  // Loop through each light and add a setting for it to the arrayObject
  for (var i = 0, len = dmx.devices.length; i < len; i++) {
    arrayObject[i] = randomIntensity();
    // console.log('i is: ', i); // -> { '0': 113, '1': 164, '2': 237, '3': 135 }
  }
  console.log(arrayObject);
  storageArray2
    .add(arrayObject, randomDuration())
    .delay(5000 - randomDuration)
    .run(universe);
}

// randomIntensityChanges();
/////// Running the function ////////////
// How often to loop through last number is the length of a sequence
setInterval(function () {
  // fade_up_then_down();
  // storageArray.run(universe, done);

  randomIntensityChanges();
  storageArray2.run(universe, done);
}, sequenceDuration);


///////////// Notes:
// Will run on raspberry pi 3.
// Possible to have 80 channels.

// Do a blackout function.
// Need to have error handling for:
// - No dmx connection, no usb-dmx connection
// - No api response
// - No
// Gulpfile ES6->ES5, src and public folder
// Npm v7 on pi
// node on pi
// sourcemaps




