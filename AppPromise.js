const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
      a: {
        demand: true,
        alias: "address",
        describe: "address to fetch weather for",
        string: true
        //string: true = always parse argument as string
      }
  })
  .help()
    //set alias for help command as "h"
  .alias("help", "h")
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios.get(geoCodeURL).then((response) => {
    if(response.data.status === "ZERO_RESULTS"){
      throw new Error("Unable to find that address");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.forecast.io/forecast/7505323d970265e8ebe0f6268fd43cb4/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temp = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temp}, it feels like ${apparentTemp}.`);
  }).catch((e) => {
    if(e.code === "ENOTFOUND"){
      console.log("Unable to connect to API servers");
    }else {
      console.log(e.message);
    }
  });


//google API key:  AIzaSyC_FLn6lOel5kGJVzEHue53XXXdEb_w8dg
