'use strict';

describe('Service: startCampaignService', function () {

  // load the service's module
  beforeEach(module('bApp'));

  // instantiate service
  var startCampaignService;
  beforeEach(inject(function (_startCampaignService_) {
    startCampaignService = _startCampaignService_;
  }));

  it('should do something', function () {
    !!startCampaignService.should.be.true;
  });

});
