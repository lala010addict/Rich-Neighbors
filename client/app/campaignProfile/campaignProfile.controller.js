'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);



angular.module('bApp.CampaignProfileController', ['ui.router'])
  .controller('CampaignProfileController', ['$scope', '$http','$stateParams', function($scope, $http, $stateParams) {

    $scope.campaign = $scope.campaigns[$stateParams.id];


  }]);
