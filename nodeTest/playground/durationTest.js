var testArray = [];
// Array of typical ranges( -15 up to 44)
for(var i=-15; i <= 44; i++) {
  testArray.push(i);
}
// console.log(testArray);

////////// Basic single value test ///////////////////////
/*
let parisInfo.wind.speed = 14;

// Average windspeed in Paris is 14, annual range is typically 0-63
console.log('Here: ', parisInfo.wind.speed);
// Max

const parisWindConstant = parisInfo.wind.speed / 75; // 75 is bit higher than the average 14/75 = 0.186
let parisLightValue = 11.16 / parisWindConstant;// 60 = 11.16 / 0.186
// lightValue needs to be between 60 and 255(inclsive)
if(parisLightValue > 255 || parisLightValue < 60) {
  parisLightValue = 180;
}
console.log('Would set light value to be ', parisLightValue);
*/

///////////// Array based test, range testing /////////////

for(var j=0, aLength = testArray.length; j < aLength; j++) {
  const parisInfo = { temperature: j-15};
  // Average temp in Paris is 14, annual range is typically -7 to 36
  console.log('Here temp is: ', parisInfo.temperature);

  const parisTempConstant = 1385; // // Array of typical ranges( 2000 - 60000)
  let parisDurationValue = parisTempConstant * parisInfo.temperature;
  // lightValue needs to be between 60 and 255(inclsive)
  if(parisDurationValue > 60000 || parisDurationValue < 2000) {
    parisDurationValue = 5000; // Default fallback
  }
  console.log('Would set duration value to be ', parisDurationValue);

  // Produces output of 60 up to 254
}



