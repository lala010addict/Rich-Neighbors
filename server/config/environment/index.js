'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'b-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '441658839352569',
    clientSecret: process.env.FACEBOOK_SECRET || '662cc73d62b77e0491c1d46fa9016511',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || '7wzMlXeBZCXWAkeTLTCP8Hsze',
    clientSecret: process.env.TWITTER_SECRET || 'v4Oqs9YzY0HzGH4VvlzDuVSqXR4jJ7rZEkk1PbLvWkGzPucUj8',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || '36266310-54oi2hbe6hq08vsd2apm436feddghjn0.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'RTqAG_A7P8cWKKxcbZ1MccBZ',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },
  amazon: {
    accessKeyId: process.env.AWS_ACCESS_ID || 'id',
    accessSecretKey: process.env.AWS_SECRET_KEY || 'secret'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
