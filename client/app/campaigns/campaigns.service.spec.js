'use strict';

describe('Service: campaigns', function () {

  // load the service's module
  beforeEach(module('bApp'));

  // instantiate service
  var campaigns;
  beforeEach(inject(function (_campaigns_) {
    campaigns = _campaigns_;
  }));

  it('should do something', function () {
    !!campaigns.should.be.true;
  });

});
