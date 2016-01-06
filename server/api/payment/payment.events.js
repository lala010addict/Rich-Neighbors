/**
 * Payment model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Payment = require('./payment.model');
var PaymentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PaymentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Payment.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PaymentEvents.emit(event + ':' + doc._id, doc);
    PaymentEvents.emit(event, doc);
  }
}

module.exports = PaymentEvents;
