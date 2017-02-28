// External Packages
const axios = require('axios');
const parseMETAR = require('metar');

// API Request Config
const config = {
  baseURL: 'http://tgftp.nws.noaa.gov/data/observations/metar/stations/',
  timeout: 1000
};

//// Airport info
// Paris Charles de Gaulle Airport -> LFPG
// London Heathrow -> EGLL
// New York - John F. Kennedy International Airport -> KJFK

function getInfo(airportCode) {
  // Add to URL, URL needs 'airportcode.TXT' format
  const formattedAirportCode = airportCode + '.TXT';
  console.log(`Getting ${airportCode} data...`);
  return axios.get(config.baseURL+formattedAirportCode);
}

// Parse the METAR Data, rawinfo.data-packet.not-first-16 characters
function parseData(rawData) {
  const parsedData = parseMETAR(rawData.data.substring(16));
  // console.log('Parsed Info: ', typeof(parsedData));
  // console.log('windspeed', parsedData.wind.speed);
  return parsedData;
}

// How often is the data updated?
function refreshRateOfData(rawData) {
  const refresh = rawData.data.substring(0,16);
  return refresh
}

setInterval(() => {
  // Sending multiple requests, only executes the then if all requests come back.
  axios.all([
    getInfo('LFPG')/*, getInfo('EGLL'), getInfo('KJFK') */
  ]).then(axios.spread((rawParisInfo/*, rawLondonInfo, rawUsaInfo*/) => {
    console.log('Time of last refresh: ', refreshRateOfData(rawParisInfo));
    const parisInfo = parseData(rawParisInfo);
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
    // Max 

    const parisWindConstant = parisInfo.wind.speed / 75; // 75 is bit higher than the average 14/80 = 0.175
    // lightValue needs to be between 60 and 255(inclsive)
    const parisLightValue = // 342 = 60/0.175

  }))
    .catch((error) => {
      console.log(error);
    }
  );
}, 6000); // Everyminute


