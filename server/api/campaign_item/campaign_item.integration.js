'use strict';

var app = require('../..');
var request = require('supertest');

var newCampaignItem;

describe('CampaignItem API:', function() {

  describe('GET /api/campaign_items', function() {
    var campaignItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/campaign_items')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          campaignItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      campaignItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/campaign_items', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/campaign_items')
        .send({
          name: 'New CampaignItem',
          info: 'This is the brand new campaignItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCampaignItem = res.body;
          done();
        });
    });

    it('should respond with the newly created campaignItem', function() {
      newCampaignItem.name.should.equal('New CampaignItem');
      newCampaignItem.info.should.equal('This is the brand new campaignItem!!!');
    });

  });

  describe('GET /api/campaign_items/:id', function() {
    var campaignItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/campaign_items/' + newCampaignItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          campaignItem = res.body;
          done();
        });
    });

    afterEach(function() {
      campaignItem = {};
    });

    it('should respond with the requested campaignItem', function() {
      campaignItem.name.should.equal('New CampaignItem');
      campaignItem.info.should.equal('This is the brand new campaignItem!!!');
    });

  });

  describe('PUT /api/campaign_items/:id', function() {
    var updatedCampaignItem

    beforeEach(function(done) {
      request(app)
        .put('/api/campaign_items/' + newCampaignItem._id)
        .send({
          name: 'Updated CampaignItem',
          info: 'This is the updated campaignItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCampaignItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCampaignItem = {};
    });

    it('should respond with the updated campaignItem', function() {
      updatedCampaignItem.name.should.equal('Updated CampaignItem');
      updatedCampaignItem.info.should.equal('This is the updated campaignItem!!!');
    });

  });

  describe('DELETE /api/campaign_items/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/campaign_items/' + newCampaignItem._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when campaignItem does not exist', function(done) {
      request(app)
        .delete('/api/campaign_items/' + newCampaignItem._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
