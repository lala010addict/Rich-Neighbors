'use strict';

describe('Controller: FollowingCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var FollowingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FollowingCtrl = $controller('FollowingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
