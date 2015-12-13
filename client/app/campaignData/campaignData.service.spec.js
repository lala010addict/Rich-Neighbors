'use strict';

describe('Service: campaignData', function () {

  // load the service's module
  beforeEach(module('bApp'));

  // instantiate service
  var campaignData;
  beforeEach(inject(function (_campaignData_) {
    campaignData = _campaignData_;
  }));

  it('should do something', function () {
    !!campaignData.should.be.true;
  });

});
