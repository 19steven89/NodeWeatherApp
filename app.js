const yargs = require("yargs");
const geocode = require("./GeoCode/geocode.js")

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
    console.log(JSON.stringify(results, undefined, 2));
  }
});
