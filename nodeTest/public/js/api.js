'use strict';

// External Packages
var axios = require('axios');
var parseMETAR = require('metar');

// API Request Config
var config = {
  baseURL: 'http://tgftp.nws.noaa.gov/data/observations/metar/stations/',
  timeout: 10000 // 10 seconds
};

//////// Airport info ////////////////////////////////////////
// Paris Charles de Gaulle Airport -> LFPG
// London Heathrow -> EGLL
// New York - John F. Kennedy International Airport -> KJFK
// Paris Orly Airport - > LFPO

// Use the API to request data
function getInfo(airportCode) {
  // Add to URL, URL needs 'airportcode.TXT' format
  var formattedAirportCode = airportCode + '.TXT';
  console.log('Getting ' + formattedAirportCode + ' data...');
  return axios.get(config.baseURL + formattedAirportCode);
  // .then((responseObject) => {
  //   // console.log('This runs?', responseObject.data);
  //   return responseObject.data;
  // }).catch(function (error) {
  //   console.log(error);
  //   return error.response;
  // });
}

// Parse the METAR Data, rawinfo-data-packet.not-first-16 characters
function parseData(rawData) {
  // console.log('Raw data', rawData.substring(16));
  var parsedData = parseMETAR(rawData.substring(16));
  // console.log('Parsed Info: ', typeof(parsedData));
  // console.log('windspeed', parsedData.wind.speed);
  return parsedData;
}

// How often is the data updated?
function refreshRateOfData(rawData) {
  var refresh = rawData.data.substring(0, 16);
  return refresh;
}

// // Do the api request every 30 minutes...
// setInterval(() => {

// Function to call the requests individually and return the results as an array of raw METAR results .
function makeMultipleRequests(inputArray) {
  return new Promise(function (resolve, reject) {
    // console.log('inputArray', inputArray);
    // for(var i=0; i < inputArray.length; i++) {
    // const requestArray = [];
    // requestArray.push({ i: getInfo(inputArray[i])});
    // console.log('Here: ', requestArray);
    axios.all([getInfo(inputArray[0]), getInfo(inputArray[1]), getInfo(inputArray[2]), getInfo(inputArray[3])]).then(axios.spread(function (a, b, c, d) {
      // Add parameters to the spread, one for each weather request
      var results = [];
      results.push(a.data);
      results.push(b.data);
      results.push(c.data);
      results.push(d.data);
      // console.log('apiResults: ', results); // Testing
      resolve(results);
    }))
    // .then((results) => {
    //   console.log(results);
    //   return results;
    // })
    .catch(function (error) {
      if (error.response) {
        console.log('!!!!!!!! API ERROR !!!!!!!!!!');
        console.log('Error Code: ', error.response.status);
        reject(new Error(error.response.data));
        // return 'Api request error see terminal for errors';
      }
      return 'Api request error';
    });
  });
}

// makeMultipleRequests(['LFPG', 'EGLL', 'KJFK', 'LFPO']);


// Sending multiple requests, only executes the then if all requests come back.
//axios.all([
//  getInfo('LFPG')/*, getInfo('EGLL'), getInfo('KJFK') */
//]).then(axios.spread((rawParisInfo/*, rawLondonInfo, rawUsaInfo*/) => {
// console.log('Time of last refresh: ', refreshRateOfData(rawParisInfo));
// const parisInfo = parseData(rawParisInfo);
// console.log(parseData(rawLondonInfo));
// console.log(parseData(rawUsaInfo));

///////////////////// Sample cityInfo ////////////////////////////////
/* { type: 'METAR',
  station: 'LFPG',
  time: 2017-02-28T12:30:31.370Z,
  auto: false,
  correction: false,
  wind:
   { speed: 13,
     gust: null,
     direction: 270,
     variation: null,
     unit: 'KT' },
  cavok: false,
  visibility: 9999,
  weather:
   [ { abbreviation: '-', meaning: 'light intensity' },
     { abbreviation: 'SH', meaning: 'showers' },
     { abbreviation: 'RA', meaning: 'rain' } ],
  clouds:
   [ { abbreviation: 'FEW',
       meaning: 'few',
       altitude: 1100,
       cumulonimbus: false },
     { abbreviation: 'SCT',
       meaning: 'scattered',
       altitude: 2000,
       cumulonimbus: false } ],
  temperature: 7,
  dewpoint: 4,
  altimeter_hpa: 991 } */
//
//   // Average windspeed in Paris is 14, annual range is typically 0-63
//   console.log('Here: ', parisInfo.wind.speed);
//   // Max
//
//   const parisWindConstant = parisInfo.wind.speed / 75; // 75 is bit higher than the average 14/75 = 0.186
//   // lightValue needs to be between 60 and 255(inclsive)
//   let parisLightValue = 11.16 / parisWindConstant;// 60 = 11.16 / 0.186
//   if(parisLightValue > 255 || parisLightValue < 60) {
//     parisLightValue = 180;
//   }
//   console.log('Would set light value to be ', parisLightValue);
// }))
//   .catch((error) => {
//     console.log(error);
//   }
// );
// }
// }, 	1800000 ); // 1800000 Milliseconds = 30 Minutes

module.exports = {
  parseData: parseData, makeMultipleRequests: makeMultipleRequests
};