'use strict';

angular.module('bApp')
  .controller('MyaccountCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.click = function() {
      console.log($scope.getCurrentUser()._id);
    };

 $scope.filters = [
            {
                'filterId': 1,
                'time': 'Followed',
                'url': '/following'
            },
            {
                'filterId': 2,
                'time': 'Started',
                'url': '/myaccount'
            },
            {
                'filterId': 3,
                'time': 'Contributed',
                'url': '/contributed'
            }
        
        ];
    $scope.selected = 1;

    $scope.select= function(index) {
    	console.log(index);
       $scope.selected = index; 
    };

  }]);


