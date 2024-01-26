var jwt = require('jsonwebtoken');
var BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function(passport) {
  passport.use(new BearerStrategy(
    function (token, done) {
      jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) { return done(err); }
        const userRole = decoded.isAdmin ? 'admin' : 'student';
        return done(null, decoded, { scope: userRole });
      });
    }
  ));
};
