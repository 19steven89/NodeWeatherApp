var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === "number" && typeof b === "number"){
          resolve(a + b);
      }else{
        reject("Parameters must be numbers");
      }
    }, 1500);
  });
};

asyncAdd(2, "3").then((res) => {
  console.log("result: ", res);
  return asyncAdd(res, 33);
}).then((res) => {
  //added promise chaining, to get the result of the 1st promise then add another
  //promise below
  console.log("Should be 38. Actual result: ", res);
}).catch((errorMsg) => {
  console.log(errorMsg);
});


// //the promise function takes an argument which Ive defined as
// //an anonymous arrow function
// //resolve & reject are the 2 states that the promise can fulfill
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Hey it worked!");
//     //reject("unable to fulfill promise!");
//   }, 2500);
// });
//
// //after promise is fulfilled output success or error msg
// somePromise.then((message) => {
//   console.log("Success!!", message);
// }, (errorMsg) => {
//   console.log("Error: ", errorMsg);
// });
