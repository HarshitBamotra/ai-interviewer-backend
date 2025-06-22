const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/user.model');
const {JWT_SECRET} = require("../config/server.config");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    
    if (!user) {
      return done(null, false);
    }
    
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = authenticate ;