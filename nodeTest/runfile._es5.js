'use strict';

var DMX = require('dmx');
// const sequenceSetup = require('./sequenceSetup');

var A = DMX.Animation;
var dmx = new DMX();

// Universe Setup
var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731');

// Lights in the universe
dmx.devices = [{
  'type': 'led1',
  'address': 0
}, {
  'type': 'led2',
  'address': 1
}, {
  'type': 'led3',
  'address': 3
}, {
  'type': 'led4',
  'address': 4
}];

// Callback, called when sequence finishes
var done = function done() {
  console.log('Sequence Complete');
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

var randomIntensity = function randomIntensity() {
  var intensity = Math.floor(Math.random() * (255 - 0 + 1));
  // console.log('Intensity: ', intensity);
  return intensity;
};

// let loopCount = 0;

// while(true) {
// setInterval(function () {
// console.log('Running loop: ', loopCount);

var secondArrayObject = { 0: randomIntensity(), 1: randomIntensity(), 2: randomIntensity(), 3: randomIntensity(), 4: randomIntensity() };

// secondArray.run(universe, done);

// loopCount++;
// }, 2001);
// }
var storageArray = new A();
var sequenceDuration = 10000; // Milliseconds

function fade_up_then_down() {
  var max = 255;
  var min = 0;
  storageArray.add({ 0: max, 1: max, 2: max }, sequenceDuration / 3).delay(sequenceDuration / 3).add({ 0: min, 1: min, 2: min }, sequenceDuration / 3)
  //Run the sequence
  .run(universe);
}

// How often to loop through
setInterval(function () {
  fade_up_then_down();
  storageArray.run(universe, done);
}, sequenceDuration);