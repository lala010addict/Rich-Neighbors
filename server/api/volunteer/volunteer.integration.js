'use strict';

var app = require('../..');
var request = require('supertest');

var newVolunteer;

describe('Volunteer API:', function() {

  describe('GET /api/volunteers', function() {
    var volunteers;

    beforeEach(function(done) {
      request(app)
        .get('/api/volunteers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          volunteers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      volunteers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/volunteers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/volunteers')
        .send({
          name: 'New Volunteer',
          info: 'This is the brand new volunteer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newVolunteer = res.body;
          done();
        });
    });

    it('should respond with the newly created volunteer', function() {
      newVolunteer.name.should.equal('New Volunteer');
      newVolunteer.info.should.equal('This is the brand new volunteer!!!');
    });

  });

  describe('GET /api/volunteers/:id', function() {
    var volunteer;

    beforeEach(function(done) {
      request(app)
        .get('/api/volunteers/' + newVolunteer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          volunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      volunteer = {};
    });

    it('should respond with the requested volunteer', function() {
      volunteer.name.should.equal('New Volunteer');
      volunteer.info.should.equal('This is the brand new volunteer!!!');
    });

  });

  describe('PUT /api/volunteers/:id', function() {
    var updatedVolunteer

    beforeEach(function(done) {
      request(app)
        .put('/api/volunteers/' + newVolunteer._id)
        .send({
          name: 'Updated Volunteer',
          info: 'This is the updated volunteer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVolunteer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVolunteer = {};
    });

    it('should respond with the updated volunteer', function() {
      updatedVolunteer.name.should.equal('Updated Volunteer');
      updatedVolunteer.info.should.equal('This is the updated volunteer!!!');
    });

  });

  describe('DELETE /api/volunteers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/volunteers/' + newVolunteer._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when volunteer does not exist', function(done) {
      request(app)
        .delete('/api/volunteers/' + newVolunteer._id)
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
