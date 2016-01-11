/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  create
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  update
 * DELETE  /api/comments/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var auth = require('../../auth/auth.service');
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

// Gets a list of Comments
exports.index = function(req, res) {
 if (req.baseUrl === '/api/users/me/comments') {
    Comment.find({user_id: req.user_id})
      .populate( 'campaign_id', 'title', 'description')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Comment.find(req.params)
      .populate('user_id', 'name')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Comment from the DB
exports.show = function(req, res) {
  Comment.findById(req.params.id)
    .populate('user_id', 'name')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.showParam = function(req, res, next) {
  Comment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};

// Gets a all Comments for a single Campaign from the DB
exports.showByCampaign = function(req, res) {
  Comment.findAsync({campaign_id: req.params.id})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Comment in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params, {user_id: req.user._id});
  console.log(data);
  Comment.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Comment in the DB
// TODO: Must be tested
// Updates an existing Comment in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Comment.findByIdAsync(req.params.id)
    .then(function (data) {
      if (data.isOwner(req.user._id)) {
        return handleEntityNotFound(res)
          .then(saveUpdates(req.body))
          .then(responseWithResult(res))
          .catch(handleError(res));
      } else {
        return res.status(403).end();
      }
    })
};

// Deletes a Comment from the DB
exports.destroy = function(req, res) {
  Comment.findByIdAsync(req.params.id)
    .then(function (data) {
      if (data.isOwner(req.user._id) || auth.hasRole('admin')) {
        return handleEntityNotFound(res)
          .then(removeEntity(res))
          .catch(handleError(res));
      } else {
        return res.status(403).end();
      }
    });
};
