const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const option = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

passport.use(new jwtStrategy(option, async (jwt_payload, done) => {
    try {
        const user = await User.getUserById(jwt_payload.id); // Adjust for your query function
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
}
))

module.exports = passport;  