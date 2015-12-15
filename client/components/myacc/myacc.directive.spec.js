'use strict';

describe('Directive: myacc', function () {

  // load the directive's module and view
  beforeEach(module('bApp'));
  beforeEach(module('components/myacc/myacc.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<myacc></myacc>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the myacc directive');
  }));
});
