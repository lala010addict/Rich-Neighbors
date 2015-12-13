'use strict';


angular.module('bApp.StartCampaignController', [])
  .controller('StartCampaignController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.createCampaign= function() {
      $http.post('/api/campaigns', $scope.formData)
        .success(function(data) {
          $scope.formData = {}; // clear the form so our user is ready to enter another
          //	$scope.campaigns = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }
  }])
