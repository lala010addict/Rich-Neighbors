/**
 * Item model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Item = require('./item.model');
var ItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ItemEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Item.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ItemEvents.emit(event + ':' + doc._id, doc);
    ItemEvents.emit(event, doc);
  }
}

module.exports = ItemEvents;
