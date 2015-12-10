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
import campaignJson from './seed.campaign.json'
var campaignSchema;


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


campaignSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.campaign.json')));


Campaign.find({}).removeAsync()
  .then(function() {
    Campaign.create(campaignSchema);
  })
  .then(function() {
    console.log('finished populating campaigns');
  });;
