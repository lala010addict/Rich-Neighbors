'use strict';

describe('Controller: UpdateCampaignsSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var UpdateCampaignsSuccessCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateCampaignsSuccessCtrl = $controller('UpdateCampaignsSuccessCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
