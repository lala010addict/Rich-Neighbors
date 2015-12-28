'use strict';

var express = require('express');
var controller = require('./image.controller');
var multer = require('multer');
var AWS = require('aws-sdk');
var s3 = require('multer-s3')
var config = require('../../config/environment')
var auth = require('../../auth/auth.service');
var router = express.Router({mergeParams: true});

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

router.param('id', controller.showParam)

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.createImage);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
