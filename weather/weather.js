//api key 7505323d970265e8ebe0f6268fd43cb4
//https://api.forecast.io/forecast/7505323d970265e8ebe0f6268fd43cb4/55.84493320000001,-4.2928336

const request = require("request");


var getWeather = (lat, long, callback) => {
  request(
    `https://api.forecast.io/forecast/7505323d970265e8ebe0f6268fd43cb4/${lat},${long}`,
    {json: true},
      //the callback function gets fired when the url request gets made
      (err, response, body) => {
        if (err) {
          callback("Unable to connect to forecast.io servers");
        }else if(response.statusCode === 400){
            callback("unable to fetch weather");
        }else if(response.statusCode === 200){
          var cel = (body.currently.temperature - 32) * 5 / 9;
          //undefined is passed back as the "error" callback parameter
          //is undefined
          callback(undefined,{
            temperature: body.currently.temperature,
            celsius: parseFloat(cel).toFixed(2),
            hourlySummary: body.minutely.summary

          });
          //
          // var cel = (body.currently.temperature - 32) * 5 / 9
          // console.log("Current temperature is: " + body.currently.temperature + " Celsius: " + parseFloat(cel).toFixed(2));
          // console.log("Hourly Summary: " + body.minutely.summary);
        }
      });
};

//export weather function so it can be accessed from app.js
module.exports.getWeather = getWeather;
