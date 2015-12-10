/**
 * Campaign model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Campaign = require('./campaign.model');
var CampaignEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CampaignEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Campaign.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CampaignEvents.emit(event + ':' + doc._id, doc);
    CampaignEvents.emit(event, doc);
  }
}

module.exports = CampaignEvents;
