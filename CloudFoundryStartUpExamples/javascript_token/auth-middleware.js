'use strict';
var JWT = require('jwt-simple');

module.exports = {
  verifyReq: function (req, res, next) {

    res.setHeader('Content-Type', 'text/html');
    res.write("<html><head><title>Token App</title></head><body>")
    res.write('<div id="_mdspcontent">');
    res.write("<h1>Hello World</h1>");

    var authorization = req.headers.authorization;

    if (authorization) {
      console.log("header authorization: " + authorization);

      try {
        var originalJWT = authorization.split(' ')[1];
        var decodedJWT = JWT.decode(originalJWT, "", true);

        res.write("<h2>Token (JWT)</h2>");
        res.write('<textarea id="myInput" rows="15" cols="150">');
        res.write(originalJWT);
        res.write('</textarea>');
        res.write('<br><button onclick="copyToClipboard()">Copy token (JWT)</button>');
        res.write('<script>function copyToClipboard() {var copyText = document.getElementById("myInput");copyText.select();document.execCommand("Copy");}</script>');

        res.write("<h2>Decoded token</h2>");
        res.write("<pre>" + JSON.stringify(decodedJWT, null, 2) + "</pre>");
        req.app.set("token", decodedJWT);
        next();

      } catch (e) {
        res.status(401); // Not Authorized
        res.end('Not Authorized!');
        return;
      }
    } else {
      res.status(401); // Not Authorized
      res.end('Not Authorized!');
      return;
    }

  }
};
