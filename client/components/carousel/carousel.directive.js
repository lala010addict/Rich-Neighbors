'use strict';

angular.module('bApp')
  .directive('carousel', function () {
    return {
      templateUrl: 'components/carousel/carousel.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('carousel');
      }
    };
  });
