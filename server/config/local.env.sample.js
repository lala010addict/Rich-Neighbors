'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'b-secret',

  FACEBOOK_ID:      '441658839352569',
  FACEBOOK_SECRET:  '662cc73d62b77e0491c1d46fa9016511',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  AWS_ACCESS_ID:    'ID',
  AWS_SECRET_KEY:   'SECRET',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
