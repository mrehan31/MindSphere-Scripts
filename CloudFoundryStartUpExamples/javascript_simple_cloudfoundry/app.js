var express = require('express');
var app = express();
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();

app.use(express.static(__dirname));

// used by the MindSphere OSbar
app.use('/app-info.json', express.static('./app-info.json') , function(req, res){});

app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url)
});
