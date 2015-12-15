/**
 * Follower model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Follower = require('./follower.model');
var FollowerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FollowerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Follower.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FollowerEvents.emit(event + ':' + doc._id, doc);
    FollowerEvents.emit(event, doc);
  }
}

module.exports = FollowerEvents;
