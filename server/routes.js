/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // cors
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  // Insert routes below
  app.use('/api/payments', require('./api/payment'));
  app.use('/api/contributors', require('./api/contributor'));
  app.use('/api/followers', require('./api/follower'));
  app.use('/api/volunteers', require('./api/volunteer'));
  app.use('/api/items', require('./api/item'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/campaign_items', require('./api/campaign_item'));
  app.use('/api/campaigns', require('./api/campaign'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // nested routes
  app.use('/api/campaigns/:campaign_id/comments', require('./api/comment'));
  app.use('/api/campaigns/:campaign_id/contributors', require('./api/contributor'));
  app.use('/api/campaigns/:campaign_id/items', require('./api/item'));
  app.use('/api/campaigns/:campaign_id/followers', require('./api/follower'));
  app.use('/api/campaigns/:campaign_id/volunteers', require('./api/volunteer'));
  //app.use('/api/users/me/campaigns', require('./auth').isAuthorized, require('./api/user'), require('./api/campaign'));
  // app.use('/api/users/me/comments', require('./api/user'), require('./api/comment'));
  // app.use('/api/users/me/followers', require('./api/user'), require('./api/comment'));
  // app.use('/api/users/me/volunteers', require('./api/user'), require('./api/comment'));

  // routes for admins only
  app.use('/api/users/:user_id/campaigns', require('./api/campaign'));
  app.use('/api/users/:user_id/comments', require('./api/comment'));
  app.use('/api/users/:user_id/followers', require('./api/comment'));
  app.use('/api/users/:user_id/volunteers', require('./api/comment'));



  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
