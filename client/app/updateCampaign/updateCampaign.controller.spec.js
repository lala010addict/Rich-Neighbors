'use strict';

describe('Controller: UpdateCampaignCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var UpdateCampaignCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateCampaignCtrl = $controller('UpdateCampaignCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
