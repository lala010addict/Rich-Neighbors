/**
 * Volunteer model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Volunteer = require('./volunteer.model');
var VolunteerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VolunteerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Volunteer.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VolunteerEvents.emit(event + ':' + doc._id, doc);
    VolunteerEvents.emit(event, doc);
  }
}

module.exports = VolunteerEvents;
