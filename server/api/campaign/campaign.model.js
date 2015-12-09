'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
  name: {
    name: String,
    required: true,
    validate: [
    function(name){
      return name.trim().length >= 5;
    },
    'Name is too short']
  },
  description: {
    type: String,
    required: true,
    validate: [
    function(name){
      return name.trim().length >= 24
    },
    'Description is too short']
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  followers: [{
    type:  Schema.ObjectId,
    ref: 'User'
  }],
  active: Boolean
});

module.exports = mongoose.model('Campaign', CampaignSchema);
