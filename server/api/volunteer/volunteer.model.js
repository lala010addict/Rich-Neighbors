'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var VolunteerSchema = new Schema({
  campaign_id: {
    type: Schema.ObjectId,
    ref: 'Campaign'
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  job: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
   name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
