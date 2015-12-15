'use strict';

var express = require('express');
var controller = require('./comment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router({mergeParams: true});

router.get('/', controller.index);
router.get('/:commentId', controller.showByCampaign);
// router.post('/', auth.isAuthenticated(), controller.create);
router.post('/', controller.create);
router.put('/:commentId', auth.isAuthenticated(), controller.update);
router.patch('/:commentId', auth.isAuthenticated(), controller.update);
router.delete('/:commentId', auth.isAuthenticated(), controller.destroy);

module.exports = router;
