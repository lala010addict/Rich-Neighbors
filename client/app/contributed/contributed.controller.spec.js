'use strict';

describe('Controller: ContributedCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var ContributedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContributedCtrl = $controller('ContributedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
