'use strict';

angular.module('bApp.SubmitCampaignsSuccessCtrl', [])
  .controller('SubmitCampaignsSuccessCtrl', ['$scope','startCampaignService', function ($scope, startCampaignService) {
    $scope.startCampaignService = startCampaignService;
  }]);
