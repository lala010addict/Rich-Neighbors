'use strict';

var express = require('express');
var controller = require('./payment.controller');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();

router.post("/client_token", controller.getClientToken);
router.post("/checkout", jsonParser, controller.makePayment);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;
