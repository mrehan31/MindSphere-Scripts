var includes = require('lodash.includes')

module.exports = function(req, res) {

  var scopes = req.app.get("token").scope;
  console.log("scopes:" + scopes)

  if (includes(scopes, "tbtoken.admin")) {
    res.write("<div><h2>You are ADMIN of this application</h2></div>");
  } 
  if (includes(scopes, "tbtoken.user")) {
    res.write("<div><h2>You are USER of this application</h2></div>");
  } 

  res.write("</div>");
  res.write('<script>_msb.init({title: "Token App",appId: "_mscontent"});</script>')
  res.write("</body></html>");
  res.end();
}