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
    Campaign.findAsync({user_id: req.user_id})
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    console.log('main: ', req)
    Campaign.findAsync(req.params)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};


// exports.param = function(req, res, next, campaign) {
//   Campaign.findById(campaign)
//     .then(handleEntityNotFound(res))
//     .then(respondParam(campaign))
//     .then(next())
//     .catch(handleError(res))
//   };

// Gets a single Campaign from the DB
exports.show = function(req, res) {
  Campaign.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Campaign in the DB
exports.create = function(req, res) {
  Campaign.createAsync(req.body)
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

// Deletes a Campaign from the DB
exports.destroy = function(req, res) {
  Campaign.findByIdAsync(req.params.id)
    .then(function (data) {
      if (data.isOwner(req.user._id)) {
        return handleEntityNotFound(res)
          .then(removeEntity(res))
          .catch(handleError(res));
      } else {
        return res.status(403).end();
      }
    });
};
