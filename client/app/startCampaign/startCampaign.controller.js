'use strict';


angular.module('bApp.StartCampaignController', [])
  .controller('StartCampaignController', ['$scope', '$http', 'Auth', '$state', '$rootScope', '$stateParams', function($scope, $http, Auth, $state, $rootScope, $stateParams) {




    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if (Auth.isLoggedIn() === false) {
      console.log("not logged in!");
      $state.go('login');
    }

    $scope.formData = {};
    $scope.id = '';
    $scope.formData.user_id = $scope.getCurrentUser()._id;
    $scope.createCampaign = function() {
      $http.post('/api/campaigns', $scope.formData)
        .success(function(data) {
          console.log($scope.getCurrentUser())
          $scope.id = data._id
          $scope.formData = {}; // clear the form so our user is ready to enter another
          //  $scope.campaigns = data;
          console.log(data);
          // $scope.id = data._id
          console.log($scope.id)
          $state.go('submitCampaignsSuccess', $stateParams)
            // $state.go('campaignProfile')
        })
        .error(function(data) {
          console.log($scope.getCurrentUser())
          console.log('Error: ' + data);
        });
    }

  }])
