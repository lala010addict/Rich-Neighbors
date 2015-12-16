'use strict';

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();
router.get("/client_token", controller.getClientToken);

router.post("/checkout", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  // Use payment method nonce here
  res.send(nonce)
});

// app.post('/api/v1/process', jsonParser, function (request, response) {
//   var transaction = request.body;
//   gateway.transaction.sale({
//     amount: '100',
//     paymentMethodNonce: transaction.payment_method_nonce
//   }, function (err, result) {
//     if (err) throw err;
//     console.log(util.inspect(result));
//     response.json(result);
//   });
// });
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);



module.exports = router;
