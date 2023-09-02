const logEvent = require("./logEvents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

//? initialize Event object
const myEmitter = new MyEmitter();

//Add listener to the log Event
myEmitter.on("log", (message) => {
  logEvent(message);
});

setTimeout(() => {
  //Emitting Event
  myEmitter.emit("log", "Log Event Emitted");
}, 2000);
