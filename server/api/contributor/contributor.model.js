'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ContributorSchema = new Schema({
  campaign_id: {
    type: Schema.ObjectId,
    ref: 'Campaign'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  payment_id: {
    type: Schema.ObjectId,
    ref: 'Payment'
  },
  type: {
    type: String
  },
  item_id: {
    type: Schema.ObjectId,
    ref: 'Item'
  },
  volunteer_id: {
    type: Schema.ObjectId,
    ref: 'Volunteer'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Contributor', ContributorSchema);
