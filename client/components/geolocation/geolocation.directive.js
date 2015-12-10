'use strict';

angular.module('bApp')
  .directive('geolocation', function () {
    return {
      templateUrl: 'components/geolocation/geolocation.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('geolocation');
      }
    };
  });
