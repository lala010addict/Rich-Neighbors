'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
  campaign_id: {type: Schema.ObjectId, ref: 'Campaign'},
  alt_text: String,
  filename: String,
  src: String
});

export default mongoose.model('Image', ImageSchema);
