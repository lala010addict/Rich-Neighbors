'use strict';

var app = require('../..');
var request = require('supertest');

var newCloudinaryimages;

describe('Cloudinaryimages API:', function() {

  describe('GET /api/cloudinaryimagess', function() {
    var cloudinaryimagess;

    beforeEach(function(done) {
      request(app)
        .get('/api/cloudinaryimagess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          cloudinaryimagess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      cloudinaryimagess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/cloudinaryimagess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cloudinaryimagess')
        .send({
          name: 'New Cloudinaryimages',
          info: 'This is the brand new cloudinaryimages!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCloudinaryimages = res.body;
          done();
        });
    });

    it('should respond with the newly created cloudinaryimages', function() {
      newCloudinaryimages.name.should.equal('New Cloudinaryimages');
      newCloudinaryimages.info.should.equal('This is the brand new cloudinaryimages!!!');
    });

  });

  describe('GET /api/cloudinaryimagess/:id', function() {
    var cloudinaryimages;

    beforeEach(function(done) {
      request(app)
        .get('/api/cloudinaryimagess/' + newCloudinaryimages._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          cloudinaryimages = res.body;
          done();
        });
    });

    afterEach(function() {
      cloudinaryimages = {};
    });

    it('should respond with the requested cloudinaryimages', function() {
      cloudinaryimages.name.should.equal('New Cloudinaryimages');
      cloudinaryimages.info.should.equal('This is the brand new cloudinaryimages!!!');
    });

  });

  describe('PUT /api/cloudinaryimagess/:id', function() {
    var updatedCloudinaryimages

    beforeEach(function(done) {
      request(app)
        .put('/api/cloudinaryimagess/' + newCloudinaryimages._id)
        .send({
          name: 'Updated Cloudinaryimages',
          info: 'This is the updated cloudinaryimages!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCloudinaryimages = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCloudinaryimages = {};
    });

    it('should respond with the updated cloudinaryimages', function() {
      updatedCloudinaryimages.name.should.equal('Updated Cloudinaryimages');
      updatedCloudinaryimages.info.should.equal('This is the updated cloudinaryimages!!!');
    });

  });

  describe('DELETE /api/cloudinaryimagess/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cloudinaryimagess/' + newCloudinaryimages._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cloudinaryimages does not exist', function(done) {
      request(app)
        .delete('/api/cloudinaryimagess/' + newCloudinaryimages._id)
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
