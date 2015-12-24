/**
 * Feed model events
 */

'use strict';

import {EventEmitter} from 'events';
var Feed = require('./feed.model');
var FeedEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FeedEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Feed.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FeedEvents.emit(event + ':' + doc._id, doc);
    FeedEvents.emit(event, doc);
  }
}

export default FeedEvents;
