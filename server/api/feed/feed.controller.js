/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/feeds              ->  index
 * POST    /api/feeds              ->  create
 * GET     /api/feeds/:id          ->  show
 * PUT     /api/feeds/:id          ->  update
 * DELETE  /api/feeds/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Feed = require('./feed.model');

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

// Gets a list of Items
exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/feeds') { // TODO: needs work to work properly
    Feed.find({user_id: req.user_id})
      .populate('campaign_id', 'title')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Feed.find(req.params)
      .populate('campaign_id', 'title')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Feed from the DB
exports.show = function(req, res) {
  Feed.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// pass a single campaign as a param
exports.showParam = function(req, res, next) {
  Feed.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};


// Creates a new Feed in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params);
  Feed.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Feed in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Feed.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Feed from the DB
exports.destroy = function(req, res) {
  Feed.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
