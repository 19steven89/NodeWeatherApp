console.log("Starting app..");

setTimeout(() => {
  console.log("Inside of callback");
}, 2000);

setTimeout(() => {
  console.log("Second set timeout callback function");
}, 0);


console.log("Finishing up");
