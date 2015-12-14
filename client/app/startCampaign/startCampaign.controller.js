'use strict';


angular.module('bApp.StartCampaignController', [])
  .controller('StartCampaignController', ['$scope', '$http', '$state', '$rootScope', '$stateParams', function($scope, $http, $state, $rootScope, $stateParams) {
    $scope.formData = {};
    $scope.id = '';
    $scope.createCampaign = function() {
      $http.post('/api/campaigns', $scope.formData)
        .success(function(data) {
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
          console.log('Error: ' + data);
        });
    }

  }])
