const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

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

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  res.send("finished");
};

// Another way of chaining route handler in a clean way
app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`PORT running on ${PORT}`);
});
