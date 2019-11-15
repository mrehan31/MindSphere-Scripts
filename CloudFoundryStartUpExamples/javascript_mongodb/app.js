var express = require('express');
var app = express();
var mongoUtils = require('./mongoUtilities');
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var pretty = require('express-prettify');

var queryName;
var paramName;

app.use(pretty({ query: 'pretty' }));

app.get("/", function(req, res, next) {
    res.send("Mongo DB Service");
});

// call <url>/write?name=foo
app.get("/write", function(req, res, next) {

    queryName = undefined;
    if(req.query.name){
        // replace %20 with space
        queryName = req.query.name.replace(/%20/g, ' ');
    }
    console.log("queryName: " + queryName);
    var db = mongoUtils.getDatabaseHandle();
    var data = {
		// if no data parameter is passed use "No Data"
        name: queryName || 'No Data',
        time: new Date()
    };
    db.mycollection.insert(data);
    res.json(data);
});

app.get("/get", function(req, res, next) {
    console.log("get...");
    var db = mongoUtils.getDatabaseHandle();
    db.mycollection.find({}, function(err, docs) {
        res.json(docs);
        db.close();
    });
});

// call <url>/get/<name>
app.get("/get/:name", function(req, res, next) {    
    
    paramName = undefined;
    if(req.params.name){
        // replace %20 with space
        paramName = req.params.name.replace(/%20/g, ' ');
    }
    console.log("get... paramName: " + paramName);

    var db = mongoUtils.getDatabaseHandle();
   
    db.mycollection.find({name : paramName}, function(err, docs) {
        res.json(docs);
        db.close();
    });
});

app.get("/clear", function(req, res, next) {
    var db = mongoUtils.getDatabaseHandle();
    db.mycollection.remove();
    res.end();
});

app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url)
});





