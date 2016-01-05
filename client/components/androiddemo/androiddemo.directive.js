'use strict';

angular.module('bApp')
  .directive('androidDemo', function () {
    return {
      templateUrl: 'components/androiddemo/androiddemo.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
