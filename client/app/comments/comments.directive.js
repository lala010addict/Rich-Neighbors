'use strict';

angular.module('bApp')
  .directive('comments', function () {
    return {
      templateUrl: 'app/comments/comments.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
