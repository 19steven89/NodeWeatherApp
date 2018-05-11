const request = require ("request");


var geocodeAddress = (address, callback) => {
  //var gets user address entered by the user frkm the terminal when the prog is argument
  //such as-  node app.js -a "flat 11 bute court 30 dirleton drive glasgow"
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    //convert string data into json object
    json: true
  }, (error, response, body) => {
    if(error){
      callback("Unable to connect to google servers");
      //body.status = no results then the user may hev entered incorrect address
      //body.status is part of the Google Geocode api for finding addresses etc..
    }else if(body.status === "ZERO_RESULTS"){
        callback("unable to find the entered address");
    }else if(body.status === "OK"){

      callback(undefined, {
        address: body.results[0].formatted_address,
        latitide: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });

      //args define a nicer output for the object, the 2 is used to specify
      //spaces in the object output to make it easier to read
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Latitide: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }

  });
};

//make the geocodeAddress function available using
//module.exports so that it can be called from another file
module.exports.geocodeAddress = geocodeAddress;
