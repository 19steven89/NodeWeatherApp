const request = require ("request");

request({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia",
  //convert string data into json object
  json: true
}, (error, response, body) => {
  //args define a nicer output for the object, the 2 is used to specify
  //spaces in the object output to make it easier to read
  console.log(JSON.stringify(body, undefined, 2));
});
