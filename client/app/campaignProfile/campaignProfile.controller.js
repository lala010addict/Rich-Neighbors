'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', [])
  .controller('CampaignProfileController', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
    $scope.campaign = {};
    //$scope.campaigns[$stateParams.id];

    $http.get('/api/campaigns/' + $stateParams.id )
        .success(function(data) {
          $scope.campaign = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });


    $scope.a = function  () {
    	console.log($scope.campaigns[$stateParams.id])
    }
    $scope.a()

  }]);
