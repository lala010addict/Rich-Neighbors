'use strict';

var app = require('../..');
var request = require('supertest');

var newItem;

describe('Item API:', function() {

  describe('GET /api/items', function() {
    var items;

    beforeEach(function(done) {
      request(app)
        .get('/api/items')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          items = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      items.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/items', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/items')
        .send({
          name: 'New Item',
          info: 'This is the brand new item!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newItem = res.body;
          done();
        });
    });

    it('should respond with the newly created item', function() {
      newItem.name.should.equal('New Item');
      newItem.info.should.equal('This is the brand new item!!!');
    });

  });

  describe('GET /api/items/:id', function() {
    var item;

    beforeEach(function(done) {
      request(app)
        .get('/api/items/' + newItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          item = res.body;
          done();
        });
    });

    afterEach(function() {
      item = {};
    });

    it('should respond with the requested item', function() {
      item.name.should.equal('New Item');
      item.info.should.equal('This is the brand new item!!!');
    });

  });

  describe('PUT /api/items/:id', function() {
    var updatedItem

    beforeEach(function(done) {
      request(app)
        .put('/api/items/' + newItem._id)
        .send({
          name: 'Updated Item',
          info: 'This is the updated item!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedItem = {};
    });

    it('should respond with the updated item', function() {
      updatedItem.name.should.equal('Updated Item');
      updatedItem.info.should.equal('This is the updated item!!!');
    });

  });

  describe('DELETE /api/items/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/items/' + newItem._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when item does not exist', function(done) {
      request(app)
        .delete('/api/items/' + newItem._id)
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
