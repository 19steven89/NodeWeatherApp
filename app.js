// const yargs = require("yargs");
// const geocode = require("./GeoCode/geocode.js")
//
// const argv = yargs
//   .options({
//       a: {
//         demand: true,
//         alias: "address",
//         describe: "address to fetch weather for",
//         string: true
//         //string: true = always parse argument as string
//       }
//   })
//   .help()
//     //set alias for help command as "h"
//   .alias("help", "h")
//   .argv;

// //pass in the address entered in the CLI to the function
// //then have the callback function (errorMsg, results) => to
// //deal with error msg or the result which will be the Lat and Long values
// geocode.geocodeAddress(argv.address, (errorMsg, results) => {
//   if(errorMsg){
//     console.log(errorMsg);
//   }else if(results){
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });


//api key 7505323d970265e8ebe0f6268fd43cb4
//https://api.forecast.io/forecast/7505323d970265e8ebe0f6268fd43cb4/55.84493320000001,-4.2928336

const request = require("request");

request(
  "https://api.forecast.io/forecast/7505323d970265e8ebe0f6268fd43cb4/55.84493320000001,-4.2928336",
  {json: true},
    //the callback function gets fired when the url request gets made
    (err, response, body) => {
      if (err) {
        return console.log("Unable to connect to forecast.io servers");
      }else if(response.statusCode === 400){
          console.log("unable to fetch weather");
      }else if(response.statusCode === 200){
        var cel = (body.currently.temperature - 32) * 5 / 9
        console.log("Current temperature is: " + body.currently.temperature + " Celsius: " + parseFloat(cel).toFixed(2));
        console.log("Hourly Summary: " + body.minutely.summary);
      }
    });
