'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('lodash');

var CampaignSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [
    function(title){
      return title.trim().length >= 5;
    },
    'Title is too short']
  },
  description: {
    type: String,
   // required: true,
    validate: [
    function (name) {
      return name.trim().length >= 24
    },
    'Description is too short']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followers: [{
    type:  Schema.Types.ObjectId,
    ref: 'Follower',
  }],
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'Contributor'
  }],
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  volunteers: [{
    type: Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  address: {
    street: String,
    neighborhood: String,
    city: {
      type: String,
    //  required: true
    },
    zip: {
      type: String,
     // required: true
    },
    state: String,
    country: {
      type: String,
      default: 'United States'
    },
  },
  loc: {
    type: [Number],
    index: '2d'
  },
  goal: {
    type: String,
    //required: true,
    validate: [
    function (goal){
      return goal >= 1;
    },
    'Must be greater than 0']
  },
  active: {
    type: Boolean,
  //  required: true,
    default: true
  },
  url: {
    type: String,
  //  required: true,
  },
  picture_url: {
    type: String,
  //  required: true,
    default: 'https://pbs.twimg.com/media/BwsrTjGIcAAtjdu.png'  //TODO: Correct to basic png/jpg
  },
  // images: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Image'
  // }],
  images: [{
    link: String,
    file: String,
    created_at: { type: Date, default: Date.now }
  }],
  archived: Boolean,
  days: {
    type: Number,
    default: 30
  },
  expires: {
    type: Date
  },
  _links: Array
});




function linkify (data) {
  return [{href: '/api/campaigns/' + data._id, ref: 'self'},
          {href: '/api/campaigns/' + data._id + '/comments', ref: 'comments'},
          {href: '/api/campaigns/' + data._id + '/followers', ref: 'followers'},
          {href: '/api/campaigns/' + data._id + '/contributors', ref: 'contributors'},
          {href: '/api/campaigns/' + data._id + '/items', ref: 'items'},
          {href: '/api/campaigns/' + data._id + '/images', ref: 'images'},
          {href: '/api/campaigns/' + data._id + '/volunteers', ref: 'volunteers'}]
}

/**
 * Virtuals for non persistant data
 */

// reterns amount of money raised
CampaignSchema
  .virtual( 'goal_raised' )
  .get(function () {
    return  _.reduce(this.contributors, function (value, memo) {
      memo = memo + value.amount;
    }, 0)
  })

// TODO: needs to be altered and tested
CampaignSchema
  .virtual( 'address.full' )
  .set(function (address) {
    addressValidator.validate( address, addressValidator.match.streetAddress, function (err, exact, inexact) {
      console.log('input: ', address.toString())
      console.log('match: ', _.map(exact, function(a) {
        return a.toString();
      }));
      console.log('did you mean: ', _.map(inexact, function(a) {
        return a.toString();
      }));

      //access some props on the exact match
      var first = exact[0];
      console.log(first.streetNumber + ' '+ first.street);
    });

  })



/**
 * Validations
 */


/*
* Pre-functions
*/

CampaignSchema
  .pre('save', function (next) {
    var _this = this;
    _this._links = linkify(_this);
    next();
  });

CampaignSchema.pre('remove', function(next){
  this.model('Follower').update(
    {followers: this._id},
    {$pull: {followers: this._id}},
    {multi: true},
    next
  );
  this.model('Volunteer').update(
    {volunteers: this._id},
    {$pull: {volunteers: this._id}},
    {multi: true},
    next
  );
  this.model('Contributor').update(
    {contributors: this._id},
    {$pull: {contributors: this._id}},
    {multi: true},
    next
  );
  this.model('Follower').update(
    {followers: this._id},
    {$pull: {followers: this._id}},
    {multi: true},
    next
  );
  this.model('Item').update(
    {items: this._id},
    {$pull: {items: this._id}},
    {multi: true},
    next
  );
  this.model('Comment').update(
    {comment: this._id},
    {$pull: {comment: this._id}},
    {multi: true},
    next
  );
});

/*
* Methods
 */

CampaignSchema.methods = {
  isOwner: function (user) {
    return user === this.owner;
  }
}


module.exports = mongoose.model('Campaign', CampaignSchema);

