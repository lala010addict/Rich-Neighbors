/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contributors              ->  index
 * POST    /api/contributors              ->  create
 * GET     /api/contributors/:id          ->  show
 * PUT     /api/contributors/:id          ->  update
 * DELETE  /api/contributors/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Contributor = require('./contributor.model');
var Volunteer = require('../volunteer/volunteer.model')
var Item = require('../item/item.model')
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

// Gets a list of Contributors
exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/contributors') {
    Contributor.find({user_id: req.user_id})
      .populate('user_id', 'name')
      .populate({path: 'campaign_id', model: Campaign})
      .populate({path: 'item_id', model: Item})
      .populate({path: 'volunteer_id', model: Volunteer})
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Contributor.find(req.params)
      .populate('user_id', 'name')
      .populate({path: 'campaign_id', model: Campaign})
      .populate({path: 'item_id', model: Item})
      .populate({path: 'volunteer_id', model: Volunteer})
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Contributor from the DB
exports.show = function(req, res) {
  Contributor.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.showParam = function(req, res, next) {
  Contributor.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};

// Creates a new Contributor in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params, {user_id: req.user._id});
  Contributor.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Contributor in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Contributor.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Contributor from the DB
exports.destroy = function(req, res) {
  Contributor.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
