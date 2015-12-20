/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/campaigns              ->  index
 * POST    /api/campaigns              ->  create
 * GET     /api/campaigns/:id          ->  show
 * PUT     /api/campaigns/:id          ->  update
 * DELETE  /api/campaigns/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Campaign = require('./campaign.model');
var User = require('../user/user.model')

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

function respondParam(res, campaign) {
  if (campaign) {
    res.campaign = campaign;
    return res.campaign;
  }
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


// Gets a list of Campaigns
// exports.index = function(req, res) {
//   console.log("This was called", req);
//   Campaign.findAsync({user_id: req.user_id})
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/campaigns') {
    Campaign.find({
        user_id: req.user_id
      })
      .populate('user_id', 'name')
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
      var limit = req.query.limit || 20;
      // get the max distance or set it to 8 kilometers
      var maxDistance = req.q
      // we need to convert the distance to radians
      // the raduis of Earth is approximately 6371 kilometers
      maxDistance /= 6371;
      // get coordinates [ <longitude> , <latitude> ]
      var coords = [];
      coords[0] = req.query.longitude || 0;
      coords[1] = req.query.latitude || 0;
      var data = req.params || {
        loc: {
          $near: coords,
          $maxDistance: maxDistance
        }
      };
      Campaign.find(data).limit(limit)
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Campaign from the DB
exports.show = function(req, res) {
  Campaign.findById(req.params.id)
    .populate('user_id', 'name')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Campaign in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params, {
    user_id: req.user
  });
  Campaign.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// TODO: Must be tested
// Updates an existing Campaign in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Campaign.findByIdAsync(req.params.id)
    .then(function(data) {
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

// Deletes a Campaign from the DB
exports.destroy = function(req, res) {
  Campaign.findByIdAsync(req.params.id)
    .then(function(data) {
      if (data.isOwner(req.user._id)) {
        return handleEntityNotFound(res)
          .then(removeEntity(res))
          .catch(handleError(res));
      } else {
        return res.status(403).end();
      }
    });
};
