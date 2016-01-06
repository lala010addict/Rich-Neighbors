'use strict';

angular.module('bApp')
.directive('campaignCard', function () {
    return {
      templateUrl: 'components/campaigncard/temp.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
