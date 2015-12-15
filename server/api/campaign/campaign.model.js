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
  //  required: true,
    default: Date.now
  },
  // TODO: Remove if comment api works4 null
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  followers: [{
    type:  Schema.ObjectId,
    ref: 'User',
  }],
  contributors: [{
    _id: {
      type:  Schema.ObjectId,
      ref: 'User'
    },
    private: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
       default: 0,
      validate: [
      function (number) {
        return number >=1;
      },
      'Amount must be $1 or more']
    }
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
    longitude: {
      type: String
    },
    latitude: {
      type: String
    }
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
  }
});

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
// CampaignSchema
//   .path('address.zip')
//   .validate(function (zip) {
//     return zip === 5;
//   })


/*
* Methods
 */

CampaignSchema.methods = {
  isOwner: function (user) {
    return user === this.owner;
  }
}


module.exports = mongoose.model('Campaign', CampaignSchema);

