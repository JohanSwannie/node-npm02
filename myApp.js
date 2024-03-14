require("dotenv").config();
let express = require("express");
let app = express();

console.log("Hello World");

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let response;
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({
    message: response,
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

module.exports = app;
