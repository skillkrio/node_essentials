const fs = require("fs");
const path = require("path");

//Creating directory is not Exist
if (!fs.existsSync(path.join(__dirname, "new"))) {
  fs.mkdir(path.join(__dirname, "new"), (err) => {
    if (err) throw err;
    console.log("Directored Named 'New' Created");
  });
}

//Deleting directory if Exist
if (fs.existsSync(path.join(__dirname, "new"))) {
  fs.rmdir(path.join(__dirname, "new"), (err) => {
    if (err) throw err;
    console.log("Directory Named 'New' Deleted");
  });
}

//! exit on uncaught error. Try reading a non exist file to see this in action
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception err: ${err}`);
  exit(1);
});

//Always check before doing operating such as when reading make sure it exist at first,
// Or before renaming check the file is Exist, etc..
// This will minimise the usage of uncaught exception listener.
