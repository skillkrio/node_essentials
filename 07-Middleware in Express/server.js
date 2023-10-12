const path = require("path");
const express = require("express");
const { logger } = require("./middleware/logEvents");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");

//Custom Middleware
//Built-in Middleware internally has the next parameter inside them.
//built-in middleware to handle url encoded data

app.use(logger);
const whitelistedIp = ["https:www.yourwebsite.com", "https://www.google.com"];

//!origin is used to allow the localhost origin. Remove it in production
const corsOption = {
  origin: (origin, callback) => {
    if (whitelistedIp.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("You are Not allowed"));
    }
  },
  optionsSuccessStatus: 200,
};

//Cross Origin Resource Sharing
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));
//built-in middleware for json
app.use(express.json());
//serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
  //one way of serving the file
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  //302 status code means site has be temporarily moved to a new location
  // express will send this by default.
  res.redirect(301, "/new-page.html");
});

//One way of chaining route handler
app.get(
  "/hello(.html)?",
  (req, res, nextRouteHandler) => {
    console.log("attempted to load hello html");
    nextRouteHandler();
  },
  (req, res) => {
    //You can add extra parameter in this route handler if you want to chain another route handler
    //This is my last route handler so i am not adding additional parameter.
    res.send("hello");
  }
);

//Middleware
const one = (req, res, next) => {
  console.log("one");
  next();
};
//Middleware
const two = (req, res, next) => {
  console.log("two");
  next();
};

// Final Route handler because it lack the next parameter
const three = (req, res) => {
  res.send("finished");
};

// Another way of chaining route handler in a clean way
app.get("/chain(.html)?", [one, two, three]);

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
