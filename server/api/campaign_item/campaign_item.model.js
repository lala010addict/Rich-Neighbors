'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CampaignItemSchema = new Schema({
  campaign_id: {
    type: Schema.ObjectId,
    ref: 'Campaign'
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0
  },

});

module.exports = mongoose.model('CampaignItem', CampaignItemSchema);