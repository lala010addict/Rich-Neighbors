'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var FollowerSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Follower', FollowerSchema);
