'use strict';

var app = require('../..');
var request = require('supertest');

var newContributor;

describe('Contributor API:', function() {

  describe('GET /api/contributors', function() {
    var contributors;

    beforeEach(function(done) {
      request(app)
        .get('/api/contributors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          contributors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contributors.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contributors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contributors')
        .send({
          name: 'New Contributor',
          info: 'This is the brand new contributor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newContributor = res.body;
          done();
        });
    });

    it('should respond with the newly created contributor', function() {
      newContributor.name.should.equal('New Contributor');
      newContributor.info.should.equal('This is the brand new contributor!!!');
    });

  });

  describe('GET /api/contributors/:id', function() {
    var contributor;

    beforeEach(function(done) {
      request(app)
        .get('/api/contributors/' + newContributor._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          contributor = res.body;
          done();
        });
    });

    afterEach(function() {
      contributor = {};
    });

    it('should respond with the requested contributor', function() {
      contributor.name.should.equal('New Contributor');
      contributor.info.should.equal('This is the brand new contributor!!!');
    });

  });

  describe('PUT /api/contributors/:id', function() {
    var updatedContributor

    beforeEach(function(done) {
      request(app)
        .put('/api/contributors/' + newContributor._id)
        .send({
          name: 'Updated Contributor',
          info: 'This is the updated contributor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContributor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContributor = {};
    });

    it('should respond with the updated contributor', function() {
      updatedContributor.name.should.equal('Updated Contributor');
      updatedContributor.info.should.equal('This is the updated contributor!!!');
    });

  });

  describe('DELETE /api/contributors/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contributors/' + newContributor._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contributor does not exist', function(done) {
      request(app)
        .delete('/api/contributors/' + newContributor._id)
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
