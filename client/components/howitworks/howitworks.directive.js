'use strict';

angular.module('bApp')
  .directive('howCard', function () {
    return {
      templateUrl: 'components/howitworks/howitworks.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  })
