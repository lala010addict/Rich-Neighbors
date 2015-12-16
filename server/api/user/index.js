'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

// router.param('id', auth.hasRole('admin'), controller.show);

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.use('/me/campaigns', auth.isAuthenticated(), controller.meParams, require('../campaign'));
router.use('/me/comments', auth.isAuthenticated(), controller.me, require('../comment'));
router.use('/me/followers', auth.isAuthenticated(), controller.me, require('../follower'));
router.use('/me/volunteers', auth.isAuthenticated(), controller.me, require('../volunteer'));
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/profile_pic', auth.isAuthenticated(), controller.changeProfilePic);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
