'use strict';

var app = require('../..');
var request = require('supertest');

var newFollower;

describe('Follower API:', function() {

  describe('GET /api/followers', function() {
    var followers;

    beforeEach(function(done) {
      request(app)
        .get('/api/followers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          followers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      followers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/followers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/followers')
        .send({
          name: 'New Follower',
          info: 'This is the brand new follower!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newFollower = res.body;
          done();
        });
    });

    it('should respond with the newly created follower', function() {
      newFollower.name.should.equal('New Follower');
      newFollower.info.should.equal('This is the brand new follower!!!');
    });

  });

  describe('GET /api/followers/:id', function() {
    var follower;

    beforeEach(function(done) {
      request(app)
        .get('/api/followers/' + newFollower._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          follower = res.body;
          done();
        });
    });

    afterEach(function() {
      follower = {};
    });

    it('should respond with the requested follower', function() {
      follower.name.should.equal('New Follower');
      follower.info.should.equal('This is the brand new follower!!!');
    });

  });

  describe('PUT /api/followers/:id', function() {
    var updatedFollower

    beforeEach(function(done) {
      request(app)
        .put('/api/followers/' + newFollower._id)
        .send({
          name: 'Updated Follower',
          info: 'This is the updated follower!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFollower = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFollower = {};
    });

    it('should respond with the updated follower', function() {
      updatedFollower.name.should.equal('Updated Follower');
      updatedFollower.info.should.equal('This is the updated follower!!!');
    });

  });

  describe('DELETE /api/followers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/followers/' + newFollower._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when follower does not exist', function(done) {
      request(app)
        .delete('/api/followers/' + newFollower._id)
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
