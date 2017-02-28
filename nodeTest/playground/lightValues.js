var testArray = [];
// Array of typical ranges
for(var i=1; i <= 70; i++) {
  testArray.push(i);
}
console.log(testArray);

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
  const parisInfo = { wind:
   { speed: j} };
  // Average windspeed in Paris is 14, annual range is typically 0-63
  console.log('Here: ', parisInfo.wind.speed);

  const parisWindConstant = 3.8; // 255 / 75
  let parisLightValue = parisWindConstant * parisInfo.wind.speed;
  // lightValue needs to be between 60 and 255(inclsive)
  if(parisLightValue > 255 || parisLightValue < 60) {
    parisLightValue = 180; // Default fallback
  }
  console.log('Would set light value to be ', parisLightValue);

  // Produces output of 60 up to 254
}



