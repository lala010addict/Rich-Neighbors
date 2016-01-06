
'use strict';

angular.module('bApp')
  .directive('heroCard', function () {
    return {
      templateUrl: 'components/herocard/herocard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  })
