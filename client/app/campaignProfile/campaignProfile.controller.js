'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);



angular.module('bApp.CampaignProfileController', [])
.controller('CampaignProfileController', ['$scope', '$http', 'campaignData', function($scope, $http, campaignData) {

  $scope.data = campaignData;
  

}]);