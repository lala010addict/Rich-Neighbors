/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/volunteers              ->  index
 * POST    /api/volunteers              ->  create
 * GET     /api/volunteers/:id          ->  show
 * PUT     /api/volunteers/:id          ->  update
 * DELETE  /api/volunteers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Volunteer = require('./volunteer.model');
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

function pushToCampaign (data) {
  Campaign.findByIdAsync(data.campaign_id)
    .then(function (entity) {
      entity.volunteers.push(data._id)
      return function() {
        var updated = entity;
        return updated.saveAsync()
          .spread(function(updated) {
            return updated;
        });
      };
    });
}

// Gets a list of Volunteers
exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/volunteers') {
    Volunteer.find({user_id: req.user_id})
      .populate('campaign_id', 'title')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Volunteer.find(req.params)
      .populate('campaign_id', 'title')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Volunteer from the DB
exports.show = function(req, res) {
  Volunteer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// pass a single campaign as a param
exports.showParam = function(req, res, next) {
  Volunteer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};

// Creates a new Volunteer in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params);
  Volunteer.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Volunteer in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Volunteer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Volunteer from the DB
exports.destroy = function(req, res) {
  Volunteer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
