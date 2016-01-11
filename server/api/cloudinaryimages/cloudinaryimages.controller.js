/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cloudinaryimagess              ->  index
 * POST    /api/cloudinaryimagess              ->  create
 * GET     /api/cloudinaryimagess/:id          ->  show
 * PUT     /api/cloudinaryimagess/:id          ->  update
 * DELETE  /api/cloudinaryimagess/:id          ->  destroy
 */

'use strict';

var cloudinary = require('cloudinary');
var _ = require('lodash');
var Cloudinaryimages = require('./cloudinaryimages.model');
var config = require('../../config/environment');
var Campaign = require('../campaign/campaign.model');

var accessKeyId = config.cloudinary_accessKeyId;
var secretAccessKey = config.cloudinary_accessSecretKey;


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Cloudinaryimagess
exports.index = function(req, res) {
  Cloudinaryimages.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Cloudinaryimages from the DB
exports.show = function(req, res) {
  Cloudinaryimages.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Cloudinaryimages in the DB
exports.create = function(req, res) {
  Cloudinaryimages.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Cloudinaryimages in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Cloudinaryimages.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Cloudinaryimages from the DB
exports.destroy = function(req, res) {
  Cloudinaryimages.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
