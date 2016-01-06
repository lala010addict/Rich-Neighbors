'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ContributorSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  payment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  },
  type: {
    type: String
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  },
  volunteer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Volunteer'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    default: 0
  },
});

// ContributorSchema.post('save', function(doc) {
//   // if (doc.type === 'donation') {
//     this.model('Campaign').findById(doc.campaign_id)
//       .then(function (data) {
//         data.donated += doc.amount;
//         return data;
//       })
//       .then(function (data) {
//         this.model('Campaign').findByIdAndUpdate(
//         data._id,
//         {$set: {donated: data.donated}})
//         console.log(data);
//       })
//   // }
// });

module.exports = mongoose.model('Contributor', ContributorSchema);
