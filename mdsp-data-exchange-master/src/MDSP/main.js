//NPM
const express = require("express");
const appEnv = require("cfenv").getAppEnv();
const path = require("path");
const bodyParser = require("body-parser");

//Local
const mdsp = require("./mdsp");

//Express
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/../public"));

//Define Port
const port = appEnv.port || 8000;

//Start Server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

////Middleware - body parser to set req.body
app.use(bodyParser.json());

//Middleware - serve static File
app.use(express.static(path.join(__dirname, "/../public")));

//Middleware - MindSphere APIs
app.use("/api", mdsp);

//ROUTING
app.get("/", (req, res) => {
  res.render("index.html");
});
