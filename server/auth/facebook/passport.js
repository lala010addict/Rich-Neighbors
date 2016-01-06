import passport from 'passport';
import {
  Strategy as FacebookStrategy
}
from 'passport-facebook';

exports.setup = function(User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: [
        'displayName',
        'emails'
      ]
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOneAsync({
          'facebook.id': profile.id
        })
        .then(function(user) {
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              provider: 'facebook',
              profile_pic: 'http://graph.facebook.com/' + profile.id + '/picture?type=large',
              facebook: profile._json
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
