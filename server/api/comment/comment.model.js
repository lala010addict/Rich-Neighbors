'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  campaign: {},
  parent: {},
  slug: {},
  full_slug: {},
  auther: {},
  created_at: {},
  text: {},
});

module.exports = mongoose.model('Comment', CommentSchema);
