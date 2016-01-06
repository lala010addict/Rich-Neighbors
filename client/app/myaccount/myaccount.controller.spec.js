'use strict';

describe('Controller: MyaccountCtrl', function () {

  // load the controller's module
  beforeEach(module('bApp'));

  var MyaccountCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccountCtrl = $controller('MyaccountCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
