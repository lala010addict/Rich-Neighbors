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
var config = require('../../config/environment');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function checkUserId(req, res) {
  var userid = req.user._id
  return function (entity) {
    if (userid.equals(entity.user_id) ||
      config.userRoles.indexOf(req.user.role) >=
      config.userRoles.indexOf('admin')) {
      return entity;
    }
    res.status(403).end();
    return null;
  }
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
      return entity.removeAsync( function() {
          res.status(204).end()
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
      .populate('images','link')
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
      Campaign.find(data)
      .populate('images','link')
      .limit(limit)
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Campaign from the DB
exports.show = function(req, res) {
  Campaign.findById(req.params.id)
    .populate('user_id', 'name')
    .populate('images','link')
    .populate('volunteers','name')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));

};

// pass a single campaign as a param
exports.showParam = function(req, res, next) {
  Campaign.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
};



// Creates a new Campaign in the DB
exports.create = function(req, res) {
  var data = _.extend(req.body, req.params, {
    user_id: req.user._id
  });
  console.log(data);
  Campaign.createAsync(data)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Campaign in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Campaign.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(checkUserId(req, res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Campaign from the DB
exports.destroy = function(req, res) {
  Campaign.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(checkUserId(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
