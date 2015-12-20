/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import jsf from 'json-schema-faker';
import User from '../api/user/user.model';
import Campaign from '../api/campaign/campaign.model';
import Comment from '../api/comment/comment.model';
import campaignJson from './seed.campaign.js'


var campaignSchema = campaignJson.campaigns;
var commentSchema = campaignJson.comments;

var users;
var camp1, camp2;

User.find({}).then(function (data, err) { users = data; })
// console.log(users);

// User.find({}).removeAsync()
//   .then(function() {
//     User.createAsync({
//       provider: 'local',
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'test'
//     }, {
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     })
//     .then(function(user1, user2) {
//       console.log(user1._id);
//       users.push(user1._id);
//       users.push(user1._id);
//       console.log('finished populating users');
//     })
//     .then(function () {
      Campaign.find({}).removeAsync()
        .then(function() {
          Campaign.createAsync(campaignSchema);
        })
        .then(function(err, data) {
          // console.log(data);
          console.log('finished populating campaigns');
        })
      .then(function () {
      Comment.find({}).removeAsync()
        .then(function() {

          Campaign.find({'title':'Comment title with comments.'}).then( function (data) { camp1 = data[0] });
          Campaign.find({'title':'Mauris lacinia sapien quis libero.'}).then( function (data) { camp2 = data[0]; });
          console.log(camp1);
        })
        .then(function () {
          _.extend(commentSchema[0], {campaign_id: camp1._id}, {user_id: users[0]._id});
          _.extend(commentSchema[1], {campaign_id: camp1._id}, {user_id: users[1]._id});
          _.extend(commentSchema[3], {campaign_id: camp2._id}, {user_id: users[0]._id});
          Comment.createAsync(commentSchema);
        })
        .then(function() {
          // console.log(Comment.find());
          console.log('finished populating comments');
        })

      })
      .catch(function (err) {
          console.log(err);
      });

console.log(users);

// _.each(campaignSchema, function (val, i) {
//   val.user_id = users[i % 2]['_id'];
// });

// Campaign.find({}).removeAsync()
//   .then(function() {
//     Campaign.createAsync(campaignSchema);
//   })
//   .then(function(err, data) {
//     console.log(data);
//     console.log('finished populating campaigns');
//   });

// var camp1 = Campaign.find({'title':'Comment title with comments.'});
// var camp2 = Campaign.find({'title':'Mauris lacinia sapien quis libero.'});

// _.extend(commentSchema[0], {campaign_id: camp1._id}, {user_id: users[0]._id});
// _.extend(commentSchema[1], {campaign_id: camp1._id}, {user_id: users[1]._id});
// _.extend(commentSchema[3], {campaign_id: camp2._id}, {user_id: users[0]._id});


