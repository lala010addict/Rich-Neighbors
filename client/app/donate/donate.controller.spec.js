'use strict';

describe('Controller: DonateCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var DonateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DonateCtrl = $controller('DonateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
