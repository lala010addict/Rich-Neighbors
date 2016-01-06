'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
  file: String,
  link: String,
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);
