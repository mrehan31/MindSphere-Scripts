module.exports = function(req, res) {
  res.write("</div>");
  res.write('<script src="https://static.eu1.mindsphere.io/osbar/v4/js/main.min.js"></script>')
  res.write('<script>_mdsp.init({title: "Token App", appId: "_mdspcontent"});</script>')
  res.write("</body></html>");
  res.end();
}