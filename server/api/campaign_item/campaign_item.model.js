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
  type: {},
  quantity: {},

});

module.exports = mongoose.model('CampaignItem', CampaignItemSchema);
