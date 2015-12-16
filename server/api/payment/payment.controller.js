/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/payments              ->  index
 * POST    /api/payments              ->  create
 * GET     /api/payments/:id          ->  show
 * PUT     /api/payments/:id          ->  update
 * DELETE  /api/payments/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');
var request = require('superagent');
var braintree = require('braintree');
// braintree code:
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "nnrrqytcz9gz9ktn",
  publicKey: "qggbpv7swvtbnshb",
  privateKey: "213f541c2f1a85784be7f44b91685733"
});


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

exports.getClientToken = function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
}

exports.makePayment = function(req, res) {
    gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: 'fake-valid-nonce',
    }, function(err, result) {
      res.send(result);
    });
}

// Gets a list of Payments
exports.index = function(req, res) {
  Payment.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// exports.generateToken = function(req, res) {
//   getClientToken()
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };
// Gets a single Payment from the DB
exports.show = function(req, res) {
  Payment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Payment in the DB
exports.create = function(req, res) {
  Payment.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Payment in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Payment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Payment from the DB
exports.destroy = function(req, res) {
  Payment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
