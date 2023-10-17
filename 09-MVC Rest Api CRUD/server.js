const path = require("path");
const express = require("express");
const { logger } = require("./middleware/logEvents");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOption = require("./configuration/cors_option");
const errorHandler = require("./middleware/errorhandler");

//Custom Middleware
//Built-in Middleware internally has the next parameter inside them.
//built-in middleware to handle url encoded data

app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));
//built-in middleware for json
app.use(express.json());
//serve static files
// app.use("/",express.static(path.join(__dirname, "public")));
// Default static path has been to set to '/'.
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

//Route Handler
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// Custom CORS Error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`PORT running on ${PORT}`);
});
