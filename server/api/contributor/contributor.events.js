/**
 * Contributor model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Contributor = require('./contributor.model');
var ContributorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContributorEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contributor.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ContributorEvents.emit(event + ':' + doc._id, doc);
    ContributorEvents.emit(event, doc);
  }
}

module.exports = ContributorEvents;
