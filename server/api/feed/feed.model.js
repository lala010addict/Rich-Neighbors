'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var FeedSchema = new mongoose.Schema({
  title: String,
  text: String,
  created_at: { type: Date, default: Date.now },
  campaign_id: { type: Schema.ObjectId, ref: 'Campaign'}
});

export default mongoose.model('Feed', FeedSchema);
