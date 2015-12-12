'use strict';

angular.module('bApp')
  .directive('colorBar', function () {
    return {
      templateUrl: 'components/colorBar/colorBar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
