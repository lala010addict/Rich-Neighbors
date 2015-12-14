'use strict';


angular.module('bApp.StartCampaignController', [])
  .controller('StartCampaignController', ['$scope', '$http', '$state', '$stateParams', 'startCampaignService', function($scope, $http, $state, $stateParams, startCampaignService) {
   
    $scope.formData = {};
    $scope.id = startCampaignService;
    $scope.createCampaign= function() {
      $http.post('/api/campaigns', $scope.formData)
        .success(function(data) {
          $scope.formData = {}; // clear the form so our user is ready to enter another
          //	$scope.campaigns = data;
          console.log(data);
          $scope.id = data._id
          console.log($scope.id)
      $state.go('submitCampaignsSuccess')
     // $state.go('campaignProfile')
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }
  }])
