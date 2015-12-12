'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var xssFilter = require('xss-filter');

var CommentSchema = new Schema({
  campaign: {
    type: Schema.ObjectId,
    ref: 'Campaign',
    required: true
  },
  parent: {
    type: Schema.ObjectId,
    ref: 'Comment'
  },
  replies: [{
    type: Schema.ObjectId,
    ref: 'Comment',
  }],
  auther: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  text: {
    type: String,
    required: true,
    default: ''
  },
  up_vote: {
    type: Number,
    default: 0
  },
  down_vote: {
    type: Number,
    default: 0
  },
});


/*
* Validations
*/

CommentSchema
  .path('text')
  .validate(function(text){
    return text.length > 0;
  }, 'You must include a comment')


/*
* Pre-save hooks
*/

CommentSchema
  .pre('save', function (next) {
    var _this = this;
    _this.text = _this.filter();
    next();
  });


/*
* Schema Methods
*/


CommentSchema.methods = {
  filter: function (text) {
    return xssFilter.inHTMLData(text);
  },
  isOwner: function (user) {
    return user === this.author;
  }
}

module.exports = mongoose.model('Comment', CommentSchema);
