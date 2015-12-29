import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';

exports.setup = function(User, config) {
  passport.use(new TwitterStrategy({
    consumerKey: config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOneAsync({
      'twitter.id_str': profile.id
    })
      .then(function(user) {
            console.log('hihihihihihihihihihi',profile);
        if (!user) {
          user = new User({
            name: profile.displayName,
            username: profile.username,
            role: 'user',
            provider: 'twitter',
            profile_pic: profile._json.profile_image_url_https,
            twitter: profile._json
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
