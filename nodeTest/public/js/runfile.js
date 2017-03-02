'use strict';
//External modules/packages

var DMX = require('dmx');
//Custom modules/packages
var devices = require('./devices').devices;
var api = require('./api');

// DMX setup
var A = DMX.Animation;
var dmx = new DMX();

// Universe Setup
var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/tty.usbserial-EN099731'); // Mac
//var universe = dmx.addUniverse('universe', 'enttec-usb-dmx-pro', '/dev/ttyUSB0'); // Debian

// Lights in the universe
dmx.devices = devices;
// console.log(dmx.devices);
// dmx.devices = [{ 'type': 'BLUELED', 'address': 17 }];

// Running Stats
var loopCount = 0;

// Callback, called when sequence finishes
var done = function done() {
  if (loopCount % 10 === 0) {
    console.log('Sequences Complete: ', loopCount);
  }
  if (loopCount > 999) {
    // Reset loopCount to prevent massive number potential
    loopCount = 0;
  }
  loopCount++;
  // To quit the script process.exit();
  process.exit();
};

// Sample Manual Animation sequence
// const firstArray = new A()
//   .add({0: 255, 1: 255, 2: 255, 3: 255, 4: 255}, 2000)
//   .delay(1000)
//   .add({0: 255, 1: 255, 2: 255, 3: 255, 4: 255})


// Random Information generation
var getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Select a random Channel
// const randomChannel = getRandomIntInclusive(0, dmx.devices.length);

var randomIntensity = function randomIntensity() {
  var intensity = getRandomIntInclusive(0, 255);
  return intensity;
};

var randomDuration = function randomDuration() {
  var duration = getRandomIntInclusive(0, sequenceDuration);
  return duration;
};

// New animation storage array
var storageArray = new A();

// How long to run each sequence for
var sequenceDuration = 5000; // Milliseconds

/////// 1st Test ////////////////
/*

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

*/

///////// 2nd Test //////
/*
// Create an empty storageArray
var storageArray2 = new A;

function randomIntensityChanges() {
  var arrayObject = {}; // Empty object to store the light settings
  // Loop through each light and add a setting for it to the arrayObject
  for (var i = 0, len = dmx.devices.length; i < len; i++) {
    arrayObject[i] = randomIntensity();
    // console.log('i is: ', i); // -> { '0': 113, '1': 164, '2': 237, '3': 135 }
  }
  // console.log(arrayObject);
  storageArray2
    .add(arrayObject, randomDuration())
    .delay(5000 - randomDuration)
    .run(universe);
}
*/

/////// Running the function ////////////
/*
// How often to loop through last number is the length of a sequence
setInterval(function () {
  // fade_up_then_down(); // First Test
  // storageArray.run(universe, done); // First Test
  randomIntensityChanges(); // Second Test
  storageArray2.run(universe, done); // First Test
}, sequenceDuration);
*/

///////////// Notes: /////////////////
// Will run on raspberry pi 3.
// Possible to have 80 channels.
// Visualiser, open sound control/DMX output

// Do a blackout function.
// Need to have error handling for:
// - No dmx connection, no usb-dmx connection
// - No api response
// Gulpfile ES6->ES5, src and public folder - DONE
// Npm v7 on pi
// node on pi
// sourcemaps

// Things to tidy up...
// Why the result of api.makeMultipleRequests(weatherInfoSource); is undefined...
// ES6 all files
// Tidy up the file structure, clean out unused out of public.
// What can be shortened / simplified

// Array of weather sources to use
var weatherInfoSource = ['LFPG', 'EGLL', 'KJFK', 'LFPO'];
// Error Testing Station, '123F'
//////// Airport info ////////////////////////////////////////
// Paris Charles de Gaulle Airport -> LFPG
// London Heathrow -> EGLL
// New York - John F. Kennedy International Airport -> KJFK
// Paris Orly Airport - > LFPO


// // Callback test
// let results = [];
// const setResults = ((info) => {
//   results = info;
//   console.log('Runfile results', results);
// });
//
// const getAPIInfo = ((callback) => {
//   const info = api.makeMultipleRequests(weatherInfoSource);
//   // if there is a callback function run it.
//   callback && callback(info);
// });
//
// getAPIInfo(setResults());

// let results = [];

// function run() {
//   return new Promise((resolve, reject) => {
//     resolve(api.makeMultipleRequests(weatherInfoSource));
//   }).then((info)=>{
//     const results = info;
//     return results;
//   });
// }
// run().then((returnedResult) => {
//   console.log('Runfile results', returnedResult);
// });
//

// Promises
// const main = ((callback) => {
//   if (callback) {
//     // wrap callback and return Promise
//     return Promise.resolve(callback());
//   }
// });
// // Callback
// const setResults = ((info) => {
//   console.log('Runfile results', info);
// });

// main(api.makeMultipleRequests(weatherInfoSource))
// .then((data, setResults) => {
//   setResults(data);
// });


// Promises v2
// function setResults(info){
//   console.log('Runfile results', info);
// }
var parisCDGInfo = {};
var londonInfo = {};
var nycInfo = {};
var parisOrlyInfo = {};

// Call the API
api.makeMultipleRequests(weatherInfoSource).then(function (data) {
  // setResults(data);
  console.log('Runfile results', data);
  parisCDGInfo = data[0];
  londonInfo = data[1];
  nycInfo = data[2];
  parisOrlyInfo = data[3];
  // Parse the info
  parisCDGInfo = api.parseData(parisCDGInfo);
  londonInfo = api.parseData(londonInfo);
  nycInfo = api.parseData(nycInfo);
  parisOrlyInfo = api.parseData(parisOrlyInfo);
  console.log('Parsed data, eg wind speed', parisCDGInfo.wind.speed);

  // Sample dmx with the api data...Animation sequence
  // alitmeter_hpa // 1016
  // windspeed //10 (16 * 10)
  sequenceDuration = parisCDGInfo.altimeter_hpa * 2; // 2036 approx
  var intensity = parisCDGInfo.wind.speed * 10;
  if (intensity > 255) {
    intensity = 255;
  }

  var testArray = new A().add({ 0: intensity }, sequenceDuration).delay(sequenceDuration).add({ 0: 0 }, sequenceDuration).delay(sequenceDuration).add({ 0: intensity }, sequenceDuration).delay(sequenceDuration).add({ 0: 0 }, sequenceDuration);

  testArray.run(universe, done);
}).catch(function (error) {
  console.log('Error: ', error);
});