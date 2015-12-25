'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  campaign_id: {
    type: Schema.ObjectId,
    ref: 'Campaign'
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);
