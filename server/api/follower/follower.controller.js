/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/followers              ->  index
 * POST    /api/followers              ->  create
 * GET     /api/followers/:id          ->  show
 * PUT     /api/followers/:id          ->  update
 * DELETE  /api/followers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Follower = require('./follower.model');
var Campaign = require('../campaign/campaign.model');

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

// Gets a list of Followers
exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/followers') {
    Follower.find({user_id: req.user_id})
      .populate({path: 'campaign_id', model: Campaign})
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Follower.find(req.params)
      .populate({path: 'campaign_id', model: Campaign})
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Follower from the DB
exports.show = function(req, res) {
  Follower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.showParam = function(req, res, next) {
  Follower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};

// Creates a new Follower in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params, {user_id: req.user._id});
  Follower.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Follower in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Follower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Follower from the DB
exports.destroy = function(req, res) {
  Follower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
