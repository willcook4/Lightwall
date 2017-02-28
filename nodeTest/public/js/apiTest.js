'use strict';

// External Packages
var axios = require('axios');
var parseMETAR = require('metar');

// API Request Config
var config = {
  baseURL: 'http://tgftp.nws.noaa.gov/data/observations/metar/stations/',
  timeout: 1000
};

//// Airport info
// Paris Charles de Gaulle Airport -> LFPG
// London Heathrow -> EGLL
// New York - John F. Kennedy International Airport -> KJFK

function getInfo(airportCode) {
  // Add to URL, URL needs 'airportcode.TXT' format
  var formattedAirportCode = airportCode + '.TXT';
  console.log('Getting ' + airportCode + ' data...');
  return axios.get(config.baseURL + formattedAirportCode);
}

// Parse the METAR Data, rawinfo.data-packet.not-first-16 characters
function parseData(rawData) {
  var parsedData = parseMETAR(rawData.data.substring(16));
  // console.log('Parsed Info: ', typeof(parsedData));
  // console.log('windspeed', parsedData.wind.speed);
  return parsedData;
}

// How often is the data updated?
function refreshRateOfData(rawData) {
  var refresh = rawData.data.substring(0, 16);
  return refresh;
}

setInterval(function () {
  // Sending multiple requests, only executes the then if all requests come back.
  axios.all([getInfo('LFPG') /*, getInfo('EGLL'), getInfo('KJFK') */
  ]).then(axios.spread(function (rawParisInfo /*, rawLondonInfo, rawUsaInfo*/) {
    console.log('Time of last refresh: ', refreshRateOfData(rawParisInfo));
    var parisInfo = parseData(rawParisInfo);
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

    // Average windspeed in Paris is 14, annual range is typically 0-63
    console.log('Here: ', parisInfo.wind.speed);
  })).catch(function (error) {
    console.log(error);
  });
}, 6000); // Everyminute