const request = require ("request");
const yargs = require("yargs");

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

//var gets user address entered by the user frkm the terminal when the prog is argument
//such as-  node app.js -a "flat 11 bute court 30 dirleton drive glasgow"
var encodedAddress = encodeURIComponent(argv.address);

console.log(argv);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  //convert string data into json object
  json: true
}, (error, response, body) => {
  //args define a nicer output for the object, the 2 is used to specify
  //spaces in the object output to make it easier to read
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitide: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

});
