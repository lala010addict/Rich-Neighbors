'use strict';

describe('Service: geolocationFactory', function () {

  // load the service's module
  beforeEach(module('bApp'));

  // instantiate service
  var geolocationFactory;
  beforeEach(inject(function (_geolocationFactory_) {
    geolocationFactory = _geolocationFactory_;
  }));

  it('should do something', function () {
    !!geolocationFactory.should.be.true;
  });

});
