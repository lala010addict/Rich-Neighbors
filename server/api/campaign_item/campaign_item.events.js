/**
 * CampaignItem model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var CampaignItem = require('./campaign_item.model');
var CampaignItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CampaignItemEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CampaignItem.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CampaignItemEvents.emit(event + ':' + doc._id, doc);
    CampaignItemEvents.emit(event, doc);
  }
}

module.exports = CampaignItemEvents;
