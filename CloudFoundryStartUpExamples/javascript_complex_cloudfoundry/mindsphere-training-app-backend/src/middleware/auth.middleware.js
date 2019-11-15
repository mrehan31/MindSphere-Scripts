exports.middleware = (req, res, next) => {

  if (!req.user) {
    req.user = {};
  }


  try {
    console.log(req.headers.authorization);
    req.user.token = req.headers.authorization.split(' ')[1];
    next();
  } catch (error) {
    res.status(401).send('No valid token provided.');
  }
}
