'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var xssFilter = require('xss-filters');

var CommentSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
   username: {
    type: String,
    ref: 'User',
    //required: true
  },
   profile_pic: {
    type: String,
    ref: 'User',
    //required: true
  },
  level: {
    type: Number,
    default: 1
  },
  created_at: {
    type: Date,
    default: Date.now,
    //required: true
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


function linkify (data) {
  return [{href: '/api/comments/' + data._id, ref: 'self'},
          {href: '/api/campaigns/' + data.campaign_id, ref: 'campaign'},
          {href: '/api/user/' + data.user_id, ref: 'author'}]
}

/*
* Validations
*/

CommentSchema
  .path('text')
  .validate(function(text){
    return text.length > 0;
  }, 'You must include a comment')


/*
* hooks
*/

CommentSchema
  .pre('save', function (next) {
    var _this = this;
    _this.text = _this.filter(_this.text);
    _this._links = linkify(_this);
    next();
  });

var autoPopulateReplies = function(next) {
    this.populate('replies');
    next();
};

CommentSchema
.pre('findOne', autoPopulateReplies)
.pre('find', autoPopulateReplies)

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
