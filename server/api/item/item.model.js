'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'Contributor',
  }],
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Item = mongoose.model('Item', ItemSchema);

/* Validations  */

// Item.schema.path('users').validate(function (val) {
//   return val <= Item.quantity
// }, 'Must not exceed quantity');

module.exports = Item;
