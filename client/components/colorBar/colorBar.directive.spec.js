'use strict';

describe('Directive: colorBar', function () {

  // load the directive's module and view
  beforeEach(module('bApp'));
  beforeEach(module('app/colorBar/colorBar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<color-bar></color-bar>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the colorBar directive');
  }));
});
