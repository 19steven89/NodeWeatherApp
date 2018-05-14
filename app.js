const yargs = require("yargs");
const geocode = require("./GeoCode/geocode.js")
const weather = require("./weather/weather.js")

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

//pass in the address entered in the CLI to the function
//then have the callback function (errorMsg, results) => to
//deal with error msg or the result which will be the Lat and Long values
geocode.geocodeAddress(argv.address, (errorMsg, results) => {
  if(errorMsg){
    console.log(errorMsg);
  }else if(results){
    console.log(results.address);

    var lat = 55.84493320000001;
    var long = -4.2928336;

    //chained the weather callback with the GeoCode callback to make the app dynamic
    //this now gets the weather for the results.latitide & results.longitude
    //passed in by the users address entered
    weather.getWeather(results.latitide, results.longitude, (error, weatherResults) => {
      if(error){
        console.log(error);
      }else if(weatherResults){
        console.log(`It's currently ${weatherResults.temperature} Fahrenheit, ${weatherResults.celsius} Celsius. \nIt is ${weatherResults.hourlySummary}`);
      }
    });
  }
});
