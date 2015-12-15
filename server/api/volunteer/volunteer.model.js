'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var VolunteerSchema = new Schema({
  campaign_id: {
    type: Schema.ObjectId,
    ref: 'Campaign'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  hours_pledged: {
    type: Number,
    //TODO: make required
    // required: true
  },
  hours_volunteered: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
