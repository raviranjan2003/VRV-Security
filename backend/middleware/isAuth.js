const jwt = require('jsonwebtoken');

// Middleware to verify JWT from cookies
module.exports.isAuth = (req, res, next) => {
  // Retrieve the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message : "Unauthorized !"}); // Unauthorized if no token is found
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    //if token is not valid or expired the return
    if (err) {
      return res.status(401).json({ message : "Token is invalid or expired !"}); 
    }

    // Attach user information to the request object
    req.user = user.user;

    // Proceed to the next middleware or route handler
    next(); 
  });
};