// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 9000;
require("dotenv").config();
const path = require("path");
// load express
const express = require("express");
const bodyparser = require("body-parser");
var ejs = require("ejs");

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// display these files statically as they are
app.use("/", express.static(path.join(__dirname, "/public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// use routes
app.use("/", require("./routes/check"));

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
