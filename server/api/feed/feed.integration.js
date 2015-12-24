'use strict';

var app = require('../..');
import request from 'supertest';

var newFeed;

describe('Feed API:', function() {

  describe('GET /api/feeds', function() {
    var feeds;

    beforeEach(function(done) {
      request(app)
        .get('/api/feeds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          feeds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      feeds.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/feeds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/feeds')
        .send({
          name: 'New Feed',
          info: 'This is the brand new feed!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFeed = res.body;
          done();
        });
    });

    it('should respond with the newly created feed', function() {
      newFeed.name.should.equal('New Feed');
      newFeed.info.should.equal('This is the brand new feed!!!');
    });

  });

  describe('GET /api/feeds/:id', function() {
    var feed;

    beforeEach(function(done) {
      request(app)
        .get('/api/feeds/' + newFeed._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          feed = res.body;
          done();
        });
    });

    afterEach(function() {
      feed = {};
    });

    it('should respond with the requested feed', function() {
      feed.name.should.equal('New Feed');
      feed.info.should.equal('This is the brand new feed!!!');
    });

  });

  describe('PUT /api/feeds/:id', function() {
    var updatedFeed;

    beforeEach(function(done) {
      request(app)
        .put('/api/feeds/' + newFeed._id)
        .send({
          name: 'Updated Feed',
          info: 'This is the updated feed!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFeed = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFeed = {};
    });

    it('should respond with the updated feed', function() {
      updatedFeed.name.should.equal('Updated Feed');
      updatedFeed.info.should.equal('This is the updated feed!!!');
    });

  });

  describe('DELETE /api/feeds/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/feeds/' + newFeed._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when feed does not exist', function(done) {
      request(app)
        .delete('/api/feeds/' + newFeed._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
