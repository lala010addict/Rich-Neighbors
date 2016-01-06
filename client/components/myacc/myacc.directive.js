'use strict';

angular.module('bApp')
  .directive('myacc', function () {
    return {
      templateUrl: 'components/myacc/myacc.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
