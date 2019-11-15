var express = require('express');
var app = express();
var statusHandler = require('./status-handler');
var authMiddleware = require('./auth-middleware');
var scopesHandler = require('./scopes-handler');
var rootHandler = require('./root-handler');

var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();

// used by the MindSphere OSbar
app.use('/app-info.json', express.static('./app-info.json') , function(req, res){});

// comment: /status accessible without authentication
app.use('/status', statusHandler);

// comment: middleware to check for authentication
app.use(authMiddleware.verifyReq);

// comment: /scopes is only accessible if authentication via middleware was successful
app.use('/scopes', scopesHandler);

// end of the reuqest
app.use('/', rootHandler);

app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url)
});
