var getUser = (id, callback) => {
  var user = {
    id: id,
    name: "Sam"
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(3, (userObject) => {
  console.log(userObject);
});
