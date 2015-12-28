'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
  file: String,
  link: String,
  campaign_id: {
    type: Schema.ObjectId,
    ref: "Campaign"
  }
});

export default mongoose.model('Image', ImageSchema);
