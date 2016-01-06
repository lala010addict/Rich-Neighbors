import passport from 'passport';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

exports.setup = function(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'google.id': profile.id
    })
      .then(function(user) {
        console.log('goooooooglllllleeee', profile)
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.emails[0].value.split('@')[0],
            provider: 'google',
            profile_pic: profile._json.image.url,
            google: profile._json
          });
          user.saveAsync()
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
