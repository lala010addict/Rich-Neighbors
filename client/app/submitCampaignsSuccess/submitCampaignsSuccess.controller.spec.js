'use strict';

describe('Controller: SubmitCampaignsSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var SubmitCampaignsSuccessCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitCampaignsSuccessCtrl = $controller('SubmitCampaignsSuccessCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
