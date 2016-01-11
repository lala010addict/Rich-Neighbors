/**
 * Cloudinaryimages model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Cloudinaryimages = require('./cloudinaryimages.model');
var CloudinaryimagesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CloudinaryimagesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cloudinaryimages.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CloudinaryimagesEvents.emit(event + ':' + doc._id, doc);
    CloudinaryimagesEvents.emit(event, doc);
  }
}

module.exports = CloudinaryimagesEvents;
