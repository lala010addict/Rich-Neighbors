var jwt = require('jwt-simple');


var util = {

  decode: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;
    if (!token) {
      if (process.env.NODE_ENV !== "test") return res.send(403); // send forbidden if a token is not provided

      token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsInVzZXJuYW1lIjoibnVzZXIiLCJwYXNzd29yZCI6IiQyYSQxMCQ2aC81aUZ0bDVhQmxqc0pZNDZCZEx1b1VJbUV6OUN3c1NWcTQuUzcxaldHOFhpTnBITENqSyIsIl9pZCI6IjU2NGQyN2UyZjFmMWFlNDQzNzQ0MjYwMiIsInRhc2tzIjpbXX0.fdpdX10WOiM_31DWiBcaMYXae86XxQh7kfsQrg5x2qE";
    }

    try {
      // decode token and attach user to request
      // for use inside controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch(error) {
      console.log('Error: ' + error);
      return next(error);
    }
  }
};


module.exports = util;
