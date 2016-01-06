'use strict';

var express = require('express');
var controller = require('./payment.controller');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router({mergeParams: true});

router.post("/client_token", controller.getClientToken);
router.post("/checkout", jsonParser, controller.makePayment);

router.param('id', controller.showParam);
router.get('/', /*auth.isAuthenticated(),*/ controller.index);
router.get('/:id', /*auth.isAuthenticated(),*/ controller.show);
router.post('/', /*auth.isAuthenticated(),*/ controller.create);
router.put('/:id', /*auth.isAuthenticated(),*/ controller.update);
router.patch('/:id', /*auth.isAuthenticated(),*/ controller.update);
router.delete('/:id', /*auth.isAuthenticated(),*/ controller.destroy);


module.exports = router;
