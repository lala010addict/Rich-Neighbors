/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/images              ->  index
 * POST    /api/images              ->  create
 * GET     /api/images/:id          ->  show
 * PUT     /api/images/:id          ->  update
 * DELETE  /api/images/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import multer from 'multer';
import s3 from 'multer-s3';
var Image = require('./image.model');
var config = require('../../config/environment');
var Campaign = require('../campaign/campaign.model');

var accessKeyId = config.amazon.accessKeyId;
var secretAccessKey = config.amazon.accessSecretKey;

var upload = multer({
  storage: s3({
    dirname: 'Campaigns',
    bucket: 'richneighbors-dev',
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region: 'us-east-1',
    filename: function (req, file, cb) {
      cb(null, Date.now())
    }
  })
}).single('file');

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
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

export function awzUpload(req, res) {
    if(req.files.image !== undefined){ // `image` is the field name from your form
        res.redirect("/uploads"); // success
    }else{
        res.send("error, no file chosen");
    }
}
// Gets a list of Images
export function index(req, res) {
  Image.findAsync(req.params)
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Image from the DB
export function show(req, res) {
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// pass a single campaign as a param
export function showParam(req, res, next) {
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function () {
      next()
    })
    .catch(handleError(res));
}


// Creates a new image link

// TODO: Add image to campaign
export function createImage (req, res, next) {
  upload(req, res, function (err) {
      if (err) {
        console.log(err);
        handleError(res);
      } else {
        req.tempImage = {
          campaign: res.req.body.campaign_id,
          image: {
            file:  res.req.file.originalname,
            link: 'https://s3-us-west-1.amazonaws.com/richneighbors-dev/' + res.req.file.key
          }
        }
        next();
      }
    })

}

// Creates a new Image in the DB

export function create(req, res) {
  Campaign.findByIdAndUpdate(req.tempImage.campaign,
    {$push: {'images': req.tempImage.image}},
    {safe: true, upsert: true, new: true})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    //.catch(handleError(res));  //TODO: Strangely giving type error not a function.
}

// Updates an existing Image in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Image from the DB
export function destroy(req, res) {
  Image.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
