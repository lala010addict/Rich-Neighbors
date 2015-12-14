'use strict';

var express = require('express');
var controller = require('./campaign.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// for production
if (process.env.NODE_ENV === 'production') {
  router.get('/', controller.index);
  router.get('/:id', controller.show);
  router.post('/', auth.isAuthenticated(), controller.create);
  router.put('/:id', auth.isAuthenticated(), controller.update);
  router.patch('/:id', auth.isAuthenticated(), controller.update);
  router.delete('/:id', auth.isAuthenticated(), controller.destroy);
}

//for development
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development' ) {
  router.get('/', controller.index);
  router.get('/:id', controller.show);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.patch('/:id', controller.update);
  router.delete('/:id', controller.destroy);
}

module.exports = router;
