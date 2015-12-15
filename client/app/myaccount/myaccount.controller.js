'use strict';

angular.module('bApp')
  .controller('MyaccountCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
       $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.click = function() {
      console.log($scope.getCurrentUser()._id);
    };

  }]);
