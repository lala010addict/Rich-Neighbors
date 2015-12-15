/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import fs from 'fs';
import path from 'path';
import jsf from 'json-schema-faker';
import User from '../api/user/user.model';
import Campaign from '../api/campaign/campaign.model';
import Comment from '../api/comment/comment.model';
import campaignJson from './seed.campaign.js'
var campaignSchema = campaignJson.data


User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });


Campaign.find({}).removeAsync()
  .then(function() {
    Campaign.createAsync(campaignSchema);
  })
  .then(function() {
    console.log('finished populating campaigns');
  });

Comment.find({}).removeAsync()
  .then(function() {
    Comment.createAsync({
      campaign_id : '566f0b51a3e405f750b6c1e5',
      text : 'this is a sample comment'
    });
  })
  .then(function() {
    console.log('finished populating comments');
  });
